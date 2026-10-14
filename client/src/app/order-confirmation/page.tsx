"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { useCart } from "@/lib/context/CartContext";
import { fetchOrder } from "@/lib/api/checkout";
import type { Order, OrderItemSnapshot } from "@/lib/types";

export default function OrderConfirmationPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const resolvedParams = use(searchParams);
    const sessionId = resolvedParams.session_id;

    const { clearCart } = useCart();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(Boolean(sessionId));

    // Clear cart upon reaching the confirmed order page
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    // Fetch order details from server
    useEffect(() => {
        if (!sessionId) return;
        let cancelled = false;

        fetchOrder(sessionId).then(({ order: fetchedOrder }) => {
            if (cancelled) return;
            if (fetchedOrder) {
                setOrder(fetchedOrder);
            }
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [sessionId]);

    const items: OrderItemSnapshot[] = Array.isArray(order?.items)
        ? (order.items as OrderItemSnapshot[])
        : [];

    // Case 1: Visited directly without a session_id
    if (!sessionId) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16 sm:py-24">
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm text-3xl">
                        ☕
                    </div>
                    <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight text-text mb-3">
                        No Active Order Found
                    </h1>
                    <p className="font-sans text-[15px] leading-relaxed text-text-muted mb-8">
                        It looks like you navigated here directly. If you recently placed an order, please check your receipt email or start a new order below.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/#menu"
                            className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:bg-accent-hover shadow-sm"
                        >
                            View Menu & Order
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-border bg-white text-text px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:border-accent hover:text-accent shadow-sm"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16 sm:py-24">
            <div className="max-w-xl w-full">
                {/* Status Hero */}
                <div className="text-center mb-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>

                    <h1 className="font-serif text-[clamp(2.2rem,5vw,3.2rem)] leading-[1.05] text-text mb-3">
                        Order Confirmed!
                    </h1>

                    <p className="font-sans text-[15px] leading-[1.6] text-text-muted max-w-md mx-auto">
                        Thank you for dining with Golden Moment. Your order has been placed and received by our kitchen.
                    </p>
                </div>

                {/* Receipt Card */}
                <div className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 shadow-sm mb-8">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                        <div>
                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold block">
                                Status
                            </span>
                            <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {order?.status || "PAID / PREPARING"}
                            </span>
                        </div>

                        <div className="text-right">
                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted block">
                                Order Type
                            </span>
                            <span className="font-sans text-[14px] font-semibold text-text mt-1 block">
                                {order?.orderType === "DINE_IN"
                                    ? `Dine-In ${order.tableNumber ? `(Table ${order.tableNumber})` : ""}`
                                    : order?.orderType === "DELIVERY"
                                    ? "Delivery"
                                    : "Takeaway / Pickup"}
                            </span>
                        </div>
                    </div>

                    {/* Customer Info */}
                    {order && (order.customerName || order.customerPhone || order.deliveryAddress) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left py-3 border-b border-border text-[13px]">
                            {order.customerName && (
                                <div>
                                    <span className="text-text-muted text-[11px] uppercase tracking-wider block">Customer</span>
                                    <span className="font-medium text-text">{order.customerName}</span>
                                </div>
                            )}
                            {order.customerPhone && (
                                <div>
                                    <span className="text-text-muted text-[11px] uppercase tracking-wider block">Phone</span>
                                    <span className="font-medium text-text">{order.customerPhone}</span>
                                </div>
                            )}
                            {order.deliveryAddress && (
                                <div className="sm:col-span-2">
                                    <span className="text-text-muted text-[11px] uppercase tracking-wider block">Address</span>
                                    <span className="font-medium text-text">{order.deliveryAddress}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Items List */}
                    {loading ? (
                        <div className="py-8 text-center text-text-muted font-sans text-sm animate-pulse">
                            Loading order details…
                        </div>
                    ) : items.length > 0 ? (
                        <div className="py-5 border-b border-border space-y-3">
                            <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted block">
                                Items Ordered
                            </span>
                            <ul className="divide-y divide-border/40">
                                {items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between py-2 text-[14px]">
                                        <div>
                                            <span className="font-medium text-text">
                                                {item.quantity}× {item.name}
                                            </span>
                                            {item.notes && (
                                                <span className="block text-[12px] text-text-muted italic">
                                                    Note: {item.notes}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-semibold text-text shrink-0">
                                            ${(((item.price || 0) * (item.quantity || 1)) / 100).toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {/* Total & Reference */}
                    <div className="flex items-center justify-between pt-5">
                        <div>
                            <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted block">
                                Reference ID
                            </span>
                            <span className="font-mono text-[12px] text-text-muted break-all">
                                {sessionId ? `${sessionId.slice(0, 22)}…` : order?.id || "N/A"}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted block">
                                Total Paid
                            </span>
                            <span className="font-serif text-2xl font-bold text-text">
                                ${((order?.totalAmount || 0) / 100).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:bg-accent-hover shadow-sm"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/#menu"
                        className="inline-flex items-center justify-center rounded-full border border-border bg-white text-text px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:border-accent hover:text-accent shadow-sm"
                    >
                        Order Again
                    </Link>
                </div>
            </div>
        </main>
    );
}
