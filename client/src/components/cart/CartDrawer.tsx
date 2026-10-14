
"use client";

import { useCart } from "@/lib/context/CartContext";
import { createCheckoutSession } from "@/lib/api/checkout";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { OrderType } from "@/lib/types";

const FOCUSABLE_SELECTOR = [
    "a[href]",
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function CartDrawer() {
    const {
        isOpen,
        closeCart,
        items,
        itemCount,
        subtotal,
        orderType,
        customerInfo,
        removeItem,
        updateQuantity,
        updateNotes,
        setOrderType,
        setCustomerInfo,
    } = useCart();

    const drawerRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Reuse the same key when retrying an unchanged checkout payload.
    const checkoutAttemptRef = useRef<{
        fingerprint: string;
        key: string;
    } | null>(null);

    // Prevent duplicate concurrent checkout requests.
    const checkoutInFlightRef = useRef(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

    /* Drawer keyboard, focus and background-scroll management */
    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusFrame = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeCart();
                return;
            }

            if (event.key !== "Tab") return;

            const drawer = drawerRef.current;
            if (!drawer) return;

            const focusable = Array.from(
                drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            ).filter(
                (element) =>
                    element.getClientRects().length > 0 &&
                    !element.hasAttribute("hidden")
            );

            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (event.shiftKey) {
                if (active === first || !drawer.contains(active)) {
                    event.preventDefault();
                    last.focus();
                }
            } else if (active === last || !drawer.contains(active)) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;

            const previouslyFocused = previousFocusRef.current;

            if (previouslyFocused?.isConnected) {
                previouslyFocused.focus();
            }
        };
    }, [isOpen, closeCart]);

    /* Checkout */
    async function handleCheckout() {
        if (items.length === 0 || checkoutInFlightRef.current) {
            return;
        }

        if (!customerInfo.name.trim()) {
            setError("Please enter your name.");
            return;
        }

        const phoneDigits = customerInfo.phone.replace(/\D/g, "");

        if (phoneDigits.length < 8) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (
            orderType === "DINE_IN" &&
            !customerInfo.tableNumber?.trim()
        ) {
            setError("Please enter your table number.");
            return;
        }

        if (
            orderType === "DELIVERY" &&
            !customerInfo.deliveryAddress?.trim()
        ) {
            setError("Please enter your delivery address.");
            return;
        }

        const payload = {
            items: items.map((item) => ({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                notes: item.notes || "",
            })),
            orderType,
            customerInfo: { ...customerInfo },
        };

        // A changed payload must receive a new idempotency key.
        const fingerprint = JSON.stringify(payload);

        if (
            checkoutAttemptRef.current?.fingerprint !== fingerprint
        ) {
            checkoutAttemptRef.current = {
                fingerprint,
                key: crypto.randomUUID(),
            };
        }

        // Capture the key for this exact request and its retries.
        const idempotencyKey = checkoutAttemptRef.current.key;

        checkoutInFlightRef.current = true;
        setError(null);
        setLoading(true);

        try {
            const result = await createCheckoutSession(
                payload,
                idempotencyKey
            );

            if (result.url) {
                window.location.href = result.url;
                return;
            }

            // Keep the key. Retrying the same payload should reuse it.
            setError(
                result.error ??
                "We couldn't start checkout. Please try again."
            );
        } catch {
            setError(
                "Something went wrong while starting checkout. Please try again."
            );
        } finally {
            checkoutInFlightRef.current = false;
            setLoading(false);
        }
    }

    const orderTypes: {
        value: OrderType;
        label: string;
        description: string;
    }[] = [
            {
                value: "PICKUP",
                label: "Pickup",
                description: "Collect your order",
            },
            {
                value: "DINE_IN",
                label: "Dine in",
                description: "Enjoy it here",
            },
            {
                value: "DELIVERY",
                label: "Delivery",
                description: "Bring it to you",
            },
        ];

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden="true"
                onClick={() => closeCart()}
                className={`fixed inset-0 z-[70] bg-espresso/45 backdrop-blur-[3px] transition-opacity duration-300 ${isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Drawer */}
            <aside
                ref={drawerRef}
                role="dialog"
                aria-modal={isOpen ? true : undefined}
                aria-labelledby="cart-title"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`fixed inset-y-0 right-0 z-[80] flex h-[100dvh] w-full max-w-[480px] flex-col border-l border-border bg-background shadow-deep transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6 sm:py-5">
                    <div>
                        <p className="eyebrow text-accent">
                            Golden Moment
                        </p>

                        <h2
                            id="cart-title"
                            className="mt-2 font-display text-3xl leading-none tracking-tight text-text"
                        >
                            Your Order
                        </h2>

                        <p className="mt-2 text-xs text-text-muted">
                            {itemCount}{" "}
                            {itemCount === 1 ? "item" : "items"} in your
                            order
                        </p>
                    </div>

                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={closeCart}
                        aria-label="Close cart"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                {/* Items area */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5">
                    {items.length === 0 ? (
                        <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                            <span
                                aria-hidden="true"
                                className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-3xl"
                            >
                                ☕
                            </span>

                            <h3 className="mt-5 font-display text-2xl text-text">
                                Nothing on the table yet
                            </h3>

                            <p className="mt-2 max-w-[250px] text-sm leading-6 text-text-muted">
                                Explore our menu and find something
                                delicious.
                            </p>

                            <button
                                type="button"
                                onClick={closeCart}
                                className="mt-5 rounded-full bg-espresso px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-cocoa"
                            >
                                Explore the menu
                                <span aria-hidden="true"> ↗</span>
                            </button>
                        </div>
                    ) : (
                        <section aria-label="Items in your order">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                                    Your selection
                                </p>

                                <span className="text-xs tabular-nums text-text-muted">
                                    {itemCount} total
                                </span>
                            </div>

                            <ul className="space-y-3">
                                {items.map((item) => {
                                    const noteIsOpen =
                                        activeNoteId === item.menuItemId;

                                    return (
                                        <li
                                            key={item.menuItemId}
                                            className="rounded-2xl border border-border bg-surface-elevated p-3 sm:p-4"
                                        >
                                            {/* Product thumbnail and details */}
                                            <div className="flex items-start gap-3">
                                                <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-surface sm:h-[84px] sm:w-[84px]">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            sizes="84px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="flex h-full w-full items-center justify-center text-2xl"
                                                            aria-hidden="true"
                                                        >
                                                            🍽️
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1 pt-0.5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-text">
                                                                {item.name}
                                                            </h3>

                                                            <p className="mt-1 truncate text-xs text-text-muted">
                                                                {item.categoryName}
                                                            </p>
                                                        </div>

                                                        <p className="shrink-0 text-sm font-semibold tabular-nums text-text">
                                                            $
                                                            {(
                                                                (item.price *
                                                                    item.quantity) /
                                                                100
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between gap-2">
                                                        <div
                                                            className="inline-flex h-8 items-center overflow-hidden rounded-full border border-border"
                                                            aria-label={`Quantity for ${item.name}`}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.menuItemId,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                aria-label={`Decrease ${item.name} quantity`}
                                                                className="flex h-8 w-8 items-center justify-center text-base text-text-muted transition-colors hover:bg-surface hover:text-text"
                                                            >
                                                                −
                                                            </button>

                                                            <span className="min-w-7 px-1 text-center text-xs font-semibold tabular-nums text-text">
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.menuItemId,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                aria-label={`Increase ${item.name} quantity`}
                                                                className="flex h-8 w-8 items-center justify-center text-base text-text-muted transition-colors hover:bg-surface hover:text-text"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeItem(
                                                                    item.menuItemId
                                                                )
                                                            }
                                                            className="rounded-md px-1 py-1 text-[11px] text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Special instructions */}
                                            <div className="mt-3 border-t border-border/70 pt-3">
                                                {item.notes && !noteIsOpen && (
                                                    <p className="mb-2 line-clamp-2 text-xs leading-5 text-text-muted">
                                                        <span className="font-medium text-text">
                                                            Note:
                                                        </span>{" "}
                                                        {item.notes}
                                                    </p>
                                                )}

                                                {noteIsOpen ? (
                                                    <div className="space-y-2">
                                                        <label
                                                            htmlFor={`note-${item.menuItemId}`}
                                                            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted"
                                                        >
                                                            Special instructions
                                                        </label>

                                                        <textarea
                                                            id={`note-${item.menuItemId}`}
                                                            rows={2}
                                                            maxLength={250}
                                                            autoFocus
                                                            placeholder="Any preferences for this item?"
                                                            value={item.notes || ""}
                                                            onChange={(event) =>
                                                                updateNotes(
                                                                    item.menuItemId,
                                                                    event.target.value
                                                                )
                                                            }
                                                            className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm leading-5 text-text placeholder:text-text-muted/60 focus:border-accent"
                                                        />

                                                        <div className="flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setActiveNoteId(
                                                                        null
                                                                    )
                                                                }
                                                                className="rounded-full bg-espresso px-4 py-2 text-[11px] font-semibold text-cream transition-colors hover:bg-cocoa"
                                                            >
                                                                Done
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveNoteId(
                                                                item.menuItemId
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-accent"
                                                    >
                                                        <span aria-hidden="true">
                                                            ＋
                                                        </span>
                                                        {item.notes
                                                            ? "Edit instructions"
                                                            : "Add instructions"}
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Checkout section */}
                {items.length > 0 && (
                    <footer className="shrink-0 border-t border-border bg-background px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pt-4">
                        <div className="max-h-[42dvh] space-y-4 overflow-y-auto overscroll-contain pb-1">
                            <fieldset>
                                <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                                    How would you like your order?
                                </legend>

                                <div className="grid grid-cols-3 gap-2">
                                    {orderTypes.map((type) => {
                                        const selected =
                                            orderType === type.value;

                                        return (
                                            <button
                                                key={type.value}
                                                type="button"
                                                aria-pressed={selected}
                                                onClick={() =>
                                                    setOrderType(type.value)
                                                }
                                                className={`min-w-0 rounded-xl border px-2 py-3 text-left transition-colors ${selected
                                                        ? "border-accent bg-accent/10"
                                                        : "border-border bg-surface-elevated hover:border-border-strong"
                                                    }`}
                                            >
                                                <span
                                                    className={`block text-xs font-semibold ${selected
                                                            ? "text-accent"
                                                            : "text-text"
                                                        }`}
                                                >
                                                    {type.label}
                                                </span>

                                                <span className="mt-1 block text-[10px] leading-4 text-text-muted">
                                                    {type.description}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    autoComplete="name"
                                    maxLength={100}
                                    aria-label="Your name"
                                    placeholder="Your name *"
                                    value={customerInfo.name}
                                    onChange={(event) =>
                                        setCustomerInfo({
                                            name: event.target.value,
                                        })
                                    }
                                    className="col-span-2 min-w-0 rounded-xl border border-border bg-surface-elevated px-3.5 py-3 text-sm text-text placeholder:text-text-muted/70 focus:border-accent"
                                />

                                <input
                                    type="tel"
                                    autoComplete="tel"
                                    maxLength={30}
                                    aria-label="Your phone number"
                                    placeholder="Phone number *"
                                    value={customerInfo.phone}
                                    onChange={(event) =>
                                        setCustomerInfo({
                                            phone: event.target.value,
                                        })
                                    }
                                    className={`min-w-0 rounded-xl border border-border bg-surface-elevated px-3.5 py-3 text-sm text-text placeholder:text-text-muted/70 focus:border-accent ${orderType === "PICKUP"
                                            ? "col-span-2"
                                            : "col-span-1"
                                        }`}
                                />

                                {orderType === "DINE_IN" && (
                                    <input
                                        type="text"
                                        maxLength={20}
                                        aria-label="Table number"
                                        placeholder="Table number *"
                                        value={customerInfo.tableNumber || ""}
                                        onChange={(event) =>
                                            setCustomerInfo({
                                                tableNumber:
                                                    event.target.value,
                                            })
                                        }
                                        className="min-w-0 rounded-xl border border-border bg-surface-elevated px-3.5 py-3 text-sm text-text placeholder:text-text-muted/70 focus:border-accent"
                                    />
                                )}

                                {orderType === "DELIVERY" && (
                                    <input
                                        type="text"
                                        autoComplete="street-address"
                                        maxLength={300}
                                        aria-label="Delivery address"
                                        placeholder="Delivery address *"
                                        value={
                                            customerInfo.deliveryAddress || ""
                                        }
                                        onChange={(event) =>
                                            setCustomerInfo({
                                                deliveryAddress:
                                                    event.target.value,
                                            })
                                        }
                                        className="col-span-2 min-w-0 rounded-xl border border-border bg-surface-elevated px-3.5 py-3 text-sm text-text placeholder:text-text-muted/70 focus:border-accent"
                                    />
                                )}
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700"
                                >
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Subtotal and checkout action */}
                        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                                    Order subtotal
                                </p>

                                <p className="mt-1 font-display text-3xl leading-none tabular-nums text-text">
                                    ${(subtotal / 100).toFixed(2)}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCheckout}
                                disabled={loading}
                                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-terracotta px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-50 sm:px-7"
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Processing
                                    </>
                                ) : (
                                    <>
                                        Checkout{" "}
                                        <span aria-hidden="true">↗</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </footer>
                )}
            </aside>
        </>
    );
}
