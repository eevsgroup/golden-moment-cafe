"use client";

import { useCart } from "@/lib/context/CartContext";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CartNotification() {
    const { lastAdded, itemCount, subtotal, openCart, dismissNotification } = useCart();
    const [prevTimestamp, setPrevTimestamp] = useState<number | null>(null);
    const [isExiting, setIsExiting] = useState(false);

    // Adjust state during render when a new item is added without synchronous setState in effect
    if (lastAdded && lastAdded.timestamp !== prevTimestamp) {
        setPrevTimestamp(lastAdded.timestamp);
        setIsExiting(false);
    }

    useEffect(() => {
        if (!lastAdded) return;

        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(dismissNotification, 350);
        }, 4200);

        return () => clearTimeout(timer);
    }, [lastAdded, dismissNotification]);

    if (!lastAdded) return null;

    const visible = !isExiting;
    const item = lastAdded.item;
    const quantityAdded = lastAdded.quantityAdded || 1;
    const totalQuantity = lastAdded.totalQuantity || quantityAdded;

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(dismissNotification, 300);
    };

    return (
        <div
            className={`fixed top-24 right-4 sm:right-6 z-[90] max-w-sm w-[calc(100vw-2rem)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                visible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            }`}
            role="status"
            aria-live="polite"
        >
            <div className="relative overflow-hidden rounded-2xl border border-amber-300/40 bg-[#1c1613]/95 text-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {/* Glowing top line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300" />

                <div className="flex items-start gap-3.5">
                    {/* Item Thumbnail or Fallback Icon */}
                    <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-white/10 border border-white/15">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl">
                                ☕
                            </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[#1a1410] text-[10px] font-black shadow-sm">
                            +{quantityAdded}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-wider text-amber-400">
                                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Added to Order
                            </span>

                            <button
                                onClick={handleDismiss}
                                className="text-white/40 hover:text-white transition-colors text-lg leading-none p-0.5"
                                aria-label="Dismiss notification"
                            >
                                ×
                            </button>
                        </div>

                        <h4 className="font-serif text-[16px] text-white font-medium truncate mt-0.5">
                            {item.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-1 text-[12px] text-white/70">
                            <span className="font-semibold text-amber-300">
                                ${(item ? (item.price * quantityAdded) / 100 : 0).toFixed(2)}
                            </span>
                            <span>•</span>
                            <span className="text-white/60">
                                {totalQuantity} in cart
                            </span>
                        </div>
                    </div>
                </div>

                {/* Subtotal & Quick Actions Bar */}
                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="text-[12px] leading-tight">
                        <span className="text-white/50 text-[10px] uppercase tracking-wider block">Cart Total</span>
                        <span className="font-sans font-bold text-white">
                            {itemCount} {itemCount === 1 ? "item" : "items"} · ${(subtotal / 100).toFixed(2)}
                        </span>
                    </div>

                    <button
                        onClick={() => {
                            handleDismiss();
                            openCart();
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#1a1410] px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95"
                    >
                        <span>View Order</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
