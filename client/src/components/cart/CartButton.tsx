
"use client";

import { useCart } from "@/lib/context/CartContext";

export default function CartButton() {
    const { itemCount, subtotal, openCart } = useCart();

    // Hide the floating cart until an item is added.
    if (itemCount <= 0) return null;

    const formattedSubtotal = (subtotal / 100).toFixed(2);

    return (
        <div className="fixed bottom-4 right-4 z-[65] sm:bottom-6 sm:right-6">
            <button
                type="button"
                onClick={openCart}
                aria-label={`View your order. ${itemCount} ${itemCount === 1 ? "item" : "items"
                    }, total $${formattedSubtotal}`}
                className="
          group relative inline-flex
          max-w-[calc(100vw-2rem)]
          items-center gap-3
          rounded-full border border-white/10
          bg-espresso py-2.5 pl-3 pr-4
          text-text-inverse shadow-deep
          transition-all duration-200
          hover:-translate-y-0.5 hover:bg-cocoa
          active:translate-y-0
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-terracotta
        "
            >
                <span
                    aria-hidden="true"
                    className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full bg-terracotta text-white
            transition-colors duration-200
            group-hover:bg-[#b97255]
          "
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                </span>

                <span className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        Your Order
                    </span>

                    <span className="mt-1 whitespace-nowrap font-sans text-sm font-semibold tabular-nums text-white">
                        ${formattedSubtotal}
                    </span>
                </span>

                <span
                    aria-hidden="true"
                    className="
            ml-1 flex h-6 min-w-6 shrink-0
            items-center justify-center rounded-full
            border border-white/15 bg-cream px-1.5
            font-sans text-[11px] font-bold tabular-nums
            text-espresso
          "
                >
                    {itemCount}
                </span>
            </button>
        </div>
    );
}
