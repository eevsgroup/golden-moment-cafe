import { createHash, randomUUID } from "node:crypto";
import { Router, type Request } from "express";
import rateLimit from "express-rate-limit";
import Stripe from "stripe";
import { Prisma, type Order as PrismaOrder, type MenuItem as PrismaMenuItem } from "@prisma/client";
import { z } from "zod";
import type { CheckoutSessionRequest, OrderType } from "@golden-moment/contracts";
import { prisma } from "../lib/prisma";
import { DEFAULT_MENU_SEED } from "../services/posSync";

const router: Router = Router();
const isProduction = process.env.NODE_ENV === "production";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY?.trim();
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET?.trim();
const isMockStripe =
  !isProduction &&
  (process.env.STRIPE_MODE === "mock" ||
    !STRIPE_SECRET_KEY ||
    STRIPE_SECRET_KEY === "sk_test_mock" ||
    STRIPE_SECRET_KEY === "sk_test_placeholder" ||
    STRIPE_SECRET_KEY.startsWith("sk_test_mock"));
const MAX_POSTGRES_INT = 2_147_483_647;

if (isProduction && process.env.STRIPE_MODE === "mock") {
  throw new Error("Mock Stripe mode cannot be enabled in production.");
}

if (isProduction && (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.startsWith("sk_test_mock"))) {
  throw new Error("A valid, live or test STRIPE_SECRET_KEY is required in production.");
}

if (isProduction && (!STRIPE_WEBHOOK_SECRET || STRIPE_WEBHOOK_SECRET === "whsec_mock")) {
  throw new Error("A valid STRIPE_WEBHOOK_SECRET is required in production.");
}

const stripe = new Stripe(isMockStripe ? "sk_test_placeholder" : STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const rawClientUrl = process.env.CLIENT_URL ?? (isProduction ? "" : "http://localhost:3000");
if (!rawClientUrl) {
  throw new Error("CLIENT_URL must be configured in production.");
}

let CLIENT_ORIGIN: string;
try {
  const parsedClientUrl = new URL(rawClientUrl);
  if (parsedClientUrl.protocol !== "https:" && (isProduction || parsedClientUrl.protocol !== "http:")) {
    throw new Error("CLIENT_URL must use HTTP in development and HTTPS in production.");
  }
  if (isProduction && parsedClientUrl.protocol !== "https:") {
    throw new Error("CLIENT_URL must use HTTPS in production.");
  }
  CLIENT_ORIGIN = parsedClientUrl.origin;
} catch (error) {
  throw new Error(`Invalid CLIENT_URL: ${error instanceof Error ? error.message : "invalid URL"}`);
}

/* -------------------------------------------------------------------------- */
/* Rate limits                                                                */
/* -------------------------------------------------------------------------- */

const checkoutLimiter = rateLimit({
  windowMs: 60_000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many checkout attempts. Please wait and try again." },
});

const orderLookupLimiter = rateLimit({
  windowMs: 60_000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many order lookups. Please try again shortly." },
});

/* -------------------------------------------------------------------------- */
/* Checkout request validation                                                */
/* -------------------------------------------------------------------------- */

const checkoutItemSchema = z
  .object({
    menuItemId: z.string().trim().min(1).optional(),
    id: z.string().trim().min(1).optional(),
    quantity: z.number().int().min(1).max(99).default(1),
    notes: z.string().trim().max(250).optional().default(""),
  })
  .superRefine((item: { menuItemId?: string; id?: string }, ctx: z.RefinementCtx) => {
    if (!item.menuItemId && !item.id) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Menu item ID is required." });
    }

    if (item.menuItemId && item.id && item.menuItemId !== item.id) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Conflicting menu item IDs." });
    }
  });

const checkoutSchema = z
  .object({
    items: z.array(checkoutItemSchema).min(1, "Cart cannot be empty.").max(50, "Too many items in one order."),
    orderType: z.enum(["DINE_IN", "PICKUP", "DELIVERY"]).default("PICKUP"),
    customerInfo: z.object({
      name: z.string().trim().min(1, "Customer name is required.").max(100),
      phone: z
        .string()
        .trim()
        .min(1, "Phone number is required.")
        .max(30)
        .refine((value) => value.replace(/\D/g, "").length >= 8, "Please enter a valid phone number."),
      tableNumber: z.string().trim().max(20).optional().default(""),
      deliveryAddress: z.string().trim().max(300).optional().default(""),
      userId: z.string().trim().max(100).optional(),
    }),
  })
  .superRefine(
    (
      data: {
        orderType: string;
        customerInfo: { tableNumber?: string; deliveryAddress?: string };
        items: Array<{ menuItemId?: string; id?: string }>;
      },
      ctx: z.RefinementCtx
    ) => {
      if (data.orderType === "DINE_IN" && !data.customerInfo.tableNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customerInfo", "tableNumber"],
          message: "Table number is required for dine-in orders.",
        });
      }

      if (data.orderType === "DELIVERY" && !data.customerInfo.deliveryAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customerInfo", "deliveryAddress"],
          message: "Delivery address is required for delivery orders.",
        });
      }

      const ids = data.items.map((item) => item.menuItemId ?? item.id ?? "");
      if (new Set(ids).size !== ids.length) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Duplicate menu items are not allowed." });
      }
    }
  );

const storedOrderItemSchema = z.object({
  id: z.string().min(1),
  posId: z.string().optional(),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(99),
  notes: z.string().max(250).optional().default(""),
});

const storedOrderItemsSchema = z.array(storedOrderItemSchema);

type StoredOrderItem = z.infer<typeof storedOrderItemSchema>;

function parseStoredOrderItems(value: Prisma.JsonValue | null): StoredOrderItem[] {
  const parsed = storedOrderItemsSchema.safeParse(value);
  if (!parsed.success) {
    throw new Error("Stored order item snapshot is invalid.");
  }
  return parsed.data;
}

function calculateTotal(items: StoredOrderItem[]): number {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!Number.isSafeInteger(total) || total <= 0 || total > MAX_POSTGRES_INT) {
    throw new Error("Order total is outside the supported range.");
  }
  return total;
}

function getCanonicalPayload(payload: CheckoutSessionRequest): CheckoutSessionRequest {
  return {
    items: [...payload.items].sort((a, b) => a.menuItemId.localeCompare(b.menuItemId)),
    orderType: payload.orderType,
    customerInfo: {
      name: payload.customerInfo.name.trim(),
      phone: payload.customerInfo.phone.trim(),
      tableNumber: payload.customerInfo.tableNumber.trim(),
      deliveryAddress: payload.customerInfo.deliveryAddress.trim(),
      userId: payload.customerInfo.userId?.trim() || undefined,
    },
  };
}

function fingerprintPayload(payload: CheckoutSessionRequest): string {
  return createHash("sha256").update(JSON.stringify(getCanonicalPayload(payload))).digest("hex");
}

function isPrismaUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function confirmationUrl(sessionId: string): string {
  return `${CLIENT_ORIGIN}/order-confirmation?session_id=${encodeURIComponent(sessionId)}`;
}

type ExistingSessionResult =
  | { kind: "url"; url: string }
  | { kind: "expired" }
  | { kind: "pending" };

async function resolveExistingSession(order: PrismaOrder): Promise<ExistingSessionResult | null> {
  if (!order.stripeSession) return null;

  if (isMockStripe && order.stripeSession.startsWith("mock_session_")) {
    return { kind: "url", url: confirmationUrl(order.stripeSession) };
  }

  if (order.stripeSession.startsWith("mock_session_")) {
    return { kind: "expired" };
  }

  const session = await stripe.checkout.sessions.retrieve(order.stripeSession);

  if (session.payment_status === "paid" || session.status === "complete") {
    return { kind: "url", url: confirmationUrl(session.id) };
  }

  if (session.status === "open" && session.url) {
    return { kind: "url", url: session.url };
  }

  if (session.status === "expired") {
    return { kind: "expired" };
  }

  return { kind: "pending" };
}

function responseForExistingOrder(result: ExistingSessionResult): { status: number; body: { url?: string; error?: string } } {
  if (result.kind === "url") return { status: 200, body: { url: result.url } };
  if (result.kind === "expired") {
    return {
      status: 409,
      body: { error: "This checkout session expired. Start a new checkout attempt." },
    };
  }
  return {
    status: 409,
    body: { error: "This checkout is still processing. Please refresh the order status shortly." },
  };
}

/* -------------------------------------------------------------------------- */
/* Price snapshots                                                            */
/* -------------------------------------------------------------------------- */

async function buildOrderSnapshot(
  payload: CheckoutSessionRequest
): Promise<StoredOrderItem[]> {
  const ids = payload.items.map((item) => item.menuItemId);
  const menuItems: PrismaMenuItem[] = await prisma.menuItem.findMany({
    where: { id: { in: ids } },
  });
  const menuById = new Map(menuItems.map((item) => [item.id, item]));
  const snapshot: StoredOrderItem[] = [];

  for (const requested of payload.items) {
    let menuItem = menuById.get(requested.menuItemId);

    // Resilient fallback to canonical seed menu if DB hasn't finished seeding yet
    if (!menuItem) {
      const seed = DEFAULT_MENU_SEED.items.find((s) => s.id === requested.menuItemId);
      if (seed) {
        menuItem = seed as unknown as PrismaMenuItem;
      }
    }

    if (!menuItem) {
      throw Object.assign(new Error("One or more menu items are unavailable."), { httpStatus: 400 });
    }

    if (!menuItem.active) {
      throw Object.assign(new Error(`${menuItem.name} is currently unavailable.`), { httpStatus: 409 });
    }

    if (!Number.isSafeInteger(menuItem.price) || menuItem.price < 0) {
      throw new Error(`Invalid stored price for menu item ${menuItem.id}.`);
    }

    snapshot.push({
      id: menuItem.id,
      posId: menuItem.posId || menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: requested.quantity,
      notes: requested.notes,
    });
  }

  calculateTotal(snapshot);
  return snapshot;
}

function toStripeLineItems(items: StoredOrderItem[]): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return items.map((item) => ({
    price_data: {
      currency: "aud",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));
}

/* -------------------------------------------------------------------------- */
/* Checkout create-session                                                    */
/* -------------------------------------------------------------------------- */

router.post("/create-session", checkoutLimiter, async (req, res) => {
  try {
    const parsed = checkoutSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues.map((issue) => issue.message).join(", "),
      });
    }

    if (isProduction && isMockStripe) {
      return res.status(503).json({ error: "Online payments are unavailable." });
    }

    const suppliedKey = req.get("Idempotency-Key");
    if (isProduction && !suppliedKey) {
      return res.status(400).json({ error: "Idempotency-Key header is required." });
    }

    const key = z.string().uuid().safeParse(suppliedKey ?? randomUUID());
    if (!key.success) {
      return res.status(400).json({ error: "Idempotency-Key must be a valid UUID." });
    }
    const checkoutRequestId = key.data;

    const payload: CheckoutSessionRequest = {
      items: parsed.data.items.map((item) => ({
        menuItemId: item.menuItemId ?? item.id!,
        quantity: item.quantity,
        notes: item.notes,
      })),
      orderType: parsed.data.orderType as OrderType,
      customerInfo: {
        name: parsed.data.customerInfo.name,
        phone: parsed.data.customerInfo.phone,
        tableNumber: parsed.data.customerInfo.tableNumber,
        deliveryAddress: parsed.data.customerInfo.deliveryAddress,
        userId: parsed.data.customerInfo.userId,
      },
    };

    const fingerprint = fingerprintPayload(payload);
    let order = await prisma.order.findUnique({ where: { checkoutRequestId } });

    if (order && order.checkoutRequestHash !== fingerprint) {
      return res.status(409).json({
        error: "This Idempotency-Key was already used for a different checkout request.",
      });
    }

    if (order && (order.status === "CANCELLED" || order.status === "FAILED")) {
      return res.status(409).json({
        error: "This checkout attempt is no longer active. Start a new attempt with a new key.",
      });
    }

    if (order?.stripeSession) {
      const existing = await resolveExistingSession(order);
      if (existing) {
        if (existing.kind === "expired") {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "CANCELLED" },
          });
        }
        const response = responseForExistingOrder(existing);
        return res.status(response.status).json(response.body);
      }
    }

    let snapshot: StoredOrderItem[];

    if (order) {
      snapshot = parseStoredOrderItems(order.items);
      if (calculateTotal(snapshot) !== order.totalAmount) {
        return res.status(409).json({ error: "Saved order total could not be verified." });
      }
    } else {
      snapshot = await buildOrderSnapshot(payload);
      const totalAmount = calculateTotal(snapshot);

      try {
        order = await prisma.order.create({
          data: {
            checkoutRequestId,
            checkoutRequestHash: fingerprint,
            orderType: payload.orderType,
            status: isMockStripe ? "PAID" : "PENDING",
            totalAmount,
            customerName: payload.customerInfo.name,
            customerPhone: payload.customerInfo.phone,
            tableNumber: payload.customerInfo.tableNumber || null,
            deliveryAddress: payload.customerInfo.deliveryAddress || null,
            userId: payload.customerInfo.userId || null,
            items: snapshot as any,
          },
        });
      } catch (error) {
        if (!isPrismaUniqueViolation(error)) throw error;

        // Two concurrent attempts can race on the unique checkout key.
        order = await prisma.order.findUnique({ where: { checkoutRequestId } });
        if (!order || order.checkoutRequestHash !== fingerprint) {
          return res.status(409).json({ error: "Checkout request conflict. Please retry." });
        }
        snapshot = parseStoredOrderItems(order.items);
      }
    }

    if (!order) throw new Error("Checkout order could not be created.");

    if (isMockStripe) {
      const mockSessionId = `mock_session_${order.id}`;
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID", stripeSession: mockSessionId },
      });

      if (process.env.MOCK_FORWARD_TO_POS === "true") {
        await forwardOrderToPos(order, snapshot, mockSessionId);
      }

      return res.json({ url: confirmationUrl(mockSessionId) });
    }

    const expectedTotal = calculateTotal(snapshot);
    if (expectedTotal !== order.totalAmount) {
      return res.status(409).json({ error: "Order total changed unexpectedly." });
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: toStripeLineItems(snapshot),
        client_reference_id: order.id,
        success_url: `${CLIENT_ORIGIN}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_ORIGIN}/?cancelled=true#menu`,
        metadata: {
          orderId: order.id,
          checkoutRequestId,
          orderType: order.orderType,
        },
      },
      { idempotencyKey: `gm_checkout_${checkoutRequestId}` }
    );

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSession: session.id },
    });

    return res.json({ url: session.url });
  } catch (error: unknown) {
    const httpStatus =
      typeof error === "object" && error !== null && "httpStatus" in error
        ? Number((error as { httpStatus: unknown }).httpStatus)
        : 0;

    if (httpStatus === 400 || httpStatus === 409) {
      return res.status(httpStatus).json({
        error: error instanceof Error ? error.message : "Checkout request failed.",
      });
    }

    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe checkout error:", error.type, error.code, error.message);
      return res.status(502).json({ error: "Payment provider is temporarily unavailable." });
    }

    console.error("Checkout session creation failed:", error);
    return res.status(500).json({ error: "Unable to create checkout session. Please try again." });
  }
});

/* -------------------------------------------------------------------------- */
/* Order lookup                                                               */
/* -------------------------------------------------------------------------- */

router.get("/order/:sessionId", orderLookupLimiter, async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    if (!sessionId || sessionId.length > 255 || sessionId.includes("/")) {
      return res.status(400).json({ error: "Invalid session ID." });
    }

    // Only the Stripe session identifier is accepted; never expose orders by internal DB ID.
    let order = await prisma.order.findUnique({
      where: { stripeSession: sessionId },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Synchronous reconciliation: if status is PENDING and user lands on receipt, check Stripe live
    if (order.status === "PENDING" && !isMockStripe && order.stripeSession) {
      try {
        const liveSession = await stripe.checkout.sessions.retrieve(order.stripeSession);
        if (liveSession.payment_status === "paid" && liveSession.amount_total === order.totalAmount) {
          order = await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "PAID",
              totalAmount: liveSession.amount_total,
            },
          });
          const items = parseStoredOrderItems(order.items);
          forwardOrderToPos(order, items, liveSession.id).catch((posErr) => {
            console.error("Async POS forward error during session reconciliation:", posErr);
          });
        }
      } catch (reconcileErr) {
        console.warn("Could not reconcile Stripe session on order lookup:", reconcileErr);
      }
    }

    return res.json({
      id: order.id,
      orderType: order.orderType,
      status: order.status,
      totalAmount: order.totalAmount,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      tableNumber: order.tableNumber,
      deliveryAddress: order.deliveryAddress,
      items: order.items,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  } catch (error) {
    console.error("Order lookup failed:", error);
    return res.status(500).json({ error: "Unable to retrieve order." });
  }
});

/* -------------------------------------------------------------------------- */
/* POS forwarding                                                             */
/* -------------------------------------------------------------------------- */

async function forwardOrderToPos(
  order: PrismaOrder,
  items: StoredOrderItem[],
  idempotencyKey: string
): Promise<void> {
  if (order.posId) return;

  const posApiUrl = process.env.POS_API_URL || process.env.RESTROOPS_API_URL;
  const merchantId =
    process.env.POS_MERCHANT_ID ||
    process.env.POS_RESTAURANT_ID ||
    process.env.RESTROOPS_RESTAURANT_ID;
  const posRequired = process.env.POS_REQUIRED === "true";

  if (!posApiUrl || !merchantId || merchantId.startsWith("mock_")) {
    if (posRequired) {
      throw new Error("POS configuration is required but missing or invalid.");
    }
    console.warn("POS is not configured; paid order remains in the local database.");
    return;
  }

  const baseUrl = new URL(posApiUrl);
  if (isProduction && baseUrl.protocol !== "https:") {
    throw new Error("POS_API_URL must use HTTPS in production.");
  }

  const type =
    order.orderType === "DELIVERY"
      ? "DELIVERY_DIRECT"
      : order.orderType === "PICKUP"
        ? "TAKEAWAY"
        : "DINE_IN";

  const response = await fetch(new URL("/api/v1/orders", baseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-restaurant-id": merchantId,
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      type,
      items: items.map((item) => ({
        menuItemId: item.posId || item.id,
        name: item.name,
        price: item.price / 100,
        quantity: item.quantity,
        notes: item.notes || undefined,
      })),
      customerName: order.customerName || undefined,
      customerPhone: order.customerPhone || undefined,
      tableId: order.tableNumber || undefined,
      deliveryAddress: order.deliveryAddress || undefined,
      idempotencyKey,
    }),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`POS returned HTTP ${response.status}.`);
  }

  const responseBody = (await response.json().catch(() => null)) as
    | { data?: { trackingId?: unknown; id?: unknown } }
    | null;
  const trackingId =
    typeof responseBody?.data?.trackingId === "string"
      ? responseBody.data.trackingId
      : typeof responseBody?.data?.id === "string"
        ? responseBody.data.id
        : null;

  if (!trackingId) {
    throw new Error("POS accepted the request but returned no tracking ID.");
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { posId: trackingId },
  });
}

/* -------------------------------------------------------------------------- */
/* Stripe webhook idempotency                                                 */
/* -------------------------------------------------------------------------- */

type WebhookClaim = "CLAIMED" | "PROCESSED" | "BUSY";

async function claimWebhookEvent(event: Stripe.Event): Promise<WebhookClaim> {
  await prisma.stripeWebhookEvent.upsert({
    where: { eventId: event.id },
    create: { eventId: event.id, type: event.type, status: "RECEIVED" },
    update: {},
  });

  const staleBefore = new Date(Date.now() - 60_000);
  const claimed = await prisma.stripeWebhookEvent.updateMany({
    where: {
      eventId: event.id,
      processedAt: null,
      OR: [
        { status: "RECEIVED" },
        { status: "RETRY" },
        { status: "PROCESSING", lockedAt: null },
        { status: "PROCESSING", lockedAt: { lt: staleBefore } },
      ],
    },
    data: {
      status: "PROCESSING",
      lockedAt: new Date(),
      attempts: { increment: 1 },
      lastError: null,
    },
  });

  if (claimed.count > 0) return "CLAIMED";

  const current = await prisma.stripeWebhookEvent.findUnique({
    where: { eventId: event.id },
  });

  return current?.processedAt ? "PROCESSED" : "BUSY";
}

async function finishWebhookEvent(eventId: string, error?: unknown): Promise<void> {
  const message = error instanceof Error ? error.message.slice(0, 1000) : error ? "Unknown error" : null;
  await prisma.stripeWebhookEvent.update({
    where: { eventId },
    data: error
      ? { status: "RETRY", lockedAt: null, processedAt: null, lastError: message }
      : { status: "PROCESSED", lockedAt: null, processedAt: new Date(), lastError: null },
  });
}

/* -------------------------------------------------------------------------- */
/* Stripe webhook                                                             */
/* -------------------------------------------------------------------------- */

router.post("/webhook", async (req, res) => {
  if (isMockStripe) {
    return res.status(503).json({ error: "Stripe webhooks are disabled in mock mode." });
  }

  if (!STRIPE_WEBHOOK_SECRET || STRIPE_WEBHOOK_SECRET === "whsec_mock") {
    return res.status(503).json({ error: "Stripe webhook is not configured." });
  }

  const signature = req.get("stripe-signature");
  const rawBody = (req as Request & { rawBody?: Buffer }).rawBody;

  if (!signature || !Buffer.isBuffer(rawBody)) {
    return res.status(400).json({ error: "Missing Stripe signature or raw request body." });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.warn(
      "Stripe webhook signature verification failed:",
      error instanceof Error ? error.message : error
    );
    return res.status(400).send("Invalid Stripe webhook signature.");
  }

  let claim: WebhookClaim;
  try {
    claim = await claimWebhookEvent(event);
  } catch (error) {
    console.error("Unable to claim Stripe webhook event:", error);
    return res.status(500).json({ error: "Unable to process webhook." });
  }

  if (claim === "PROCESSED") {
    return res.json({ received: true, duplicate: true });
  }
  if (claim === "BUSY") {
    return res.status(409).json({ error: "Webhook event is already being processed." });
  }

  try {
    const supportedEvents = new Set([
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
      "checkout.session.async_payment_failed",
    ]);

    if (!supportedEvents.has(event.type)) {
      await finishWebhookEvent(event.id);
      return res.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    let order = orderId
      ? await prisma.order.findUnique({ where: { id: orderId } })
      : null;

    if (!order) {
      order = await prisma.order.findUnique({
        where: { stripeSession: session.id },
      });
    }

    if (!order) {
      throw new Error(`No local order found for Stripe session ${session.id}.`);
    }

    const metadataRequestId = session.metadata?.checkoutRequestId;
    if (metadataRequestId && order.checkoutRequestId !== metadataRequestId) {
      throw new Error(`Checkout request key mismatch for order ${order.id}.`);
    }

    if (order.stripeSession && order.stripeSession !== session.id) {
      throw new Error(`Stripe session does not match order ${order.id}.`);
    }

    if (event.type === "checkout.session.async_payment_failed") {
      if (order.status === "PENDING") {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "FAILED", stripeSession: session.id },
        });
      }
      await finishWebhookEvent(event.id);
      return res.json({ received: true });
    }

    // checkout.session.completed can occur before a delayed payment succeeds.
    if (session.payment_status !== "paid") {
      await finishWebhookEvent(event.id);
      return res.json({ received: true, paymentPending: true });
    }

    if (
      session.mode !== "payment" ||
      session.currency?.toLowerCase() !== "aud" ||
      session.amount_total === null
    ) {
      throw new Error(`Unexpected payment mode, currency or amount for session ${session.id}.`);
    }

    if (session.amount_total !== order.totalAmount) {
      throw new Error(
        `Payment total mismatch for order ${order.id}: expected ${order.totalAmount}, received ${session.amount_total}.`
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        stripeSession: session.id,
        totalAmount: session.amount_total,
      },
    });

    const items = parseStoredOrderItems(updatedOrder.items);
    await forwardOrderToPos(updatedOrder, items, session.id);
    await finishWebhookEvent(event.id);

    return res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);
    try {
      await finishWebhookEvent(event.id, error);
    } catch (trackingError) {
      console.error("Unable to update webhook tracking:", trackingError);
    }
    return res.status(500).json({ error: "Webhook processing failed; retry is required." });
  }
});

export default router;
