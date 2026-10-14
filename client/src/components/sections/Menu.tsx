"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import GMDivider from "@/components/ui/GMDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/lib/context/CartContext";
import { fetchMenu } from "@/lib/api/menu";
import type { MenuCategory, MenuItem } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORY_IMAGES: Record<string, string> = {
    PASTAS:
        "https://images.unsplash.com/photo-1621996311239-531f2425111b?q=80&w=900&auto=format&fit=crop",
    BURGERS:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop",
    "RICE & CURRY":
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=900&auto=format&fit=crop",
    "NOODLES & DUMPLINGS":
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=900&auto=format&fit=crop",
    "CLASSICS & SIDES":
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=900&auto=format&fit=crop",
    "ADD-ONS":
        "https://images.unsplash.com/photo-1525351484163-c529a90d566f?q=80&w=900&auto=format&fit=crop",
    "COFFEE & DRINKS":
        "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=900&auto=format&fit=crop",
    "BRUNCH & CLASSICS":
        "https://images.unsplash.com/photo-1525351484163-c529a90d566f?q=80&w=900&auto=format&fit=crop",
};

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=900&auto=format&fit=crop";

const OFFERS = [
    {
        id: "breakfast",
        eyebrow: "MON–FRI · 7–10 AM",
        title: "Breakfast Combo",
        price: "$9.99",
        description: "Bacon and egg roll with a small coffee.",
        image:
            "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=900&auto=format&fit=crop",
        imageAlt: "Fresh breakfast pastries and fruit",
        action: "Explore breakfast",
        tone: "light",
    },
    {
        id: "lunch",
        eyebrow: "MON–FRI · 11 AM–2 PM",
        title: "Office Lunch Special",
        price: "From $15",
        description: "A selected meal paired with any canned drink.",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop",
        imageAlt: "Freshly made cheeseburger",
        action: "Explore lunch",
        tone: "light",
    },
    {
        id: "catering",
        eyebrow: "MADE FOR A CROWD",
        title: "Office Catering",
        price: "From $15 pp",
        description: "Sandwiches, wraps, pastries and coffee for the team.",
        image:
            "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=900&auto=format&fit=crop",
        imageAlt: "Crispy golden chips served for sharing",
        action: "Enquire about catering",
        offer: "10% off catering orders",
        tone: "dark",
    },
] as const;

function getItemImage(item: MenuItem, categoryName: string): string {
    const key = (categoryName || "").toUpperCase().trim();
    return item.image || CATEGORY_IMAGES[key] || DEFAULT_IMAGE;
}

function formatPrice(cents: number): string {
    const amount = cents / 100;
    return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function ArrowIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function PromotionCard({
    offer,
}: {
    offer: (typeof OFFERS)[number];
}) {
    const isDark = offer.tone === "dark";
    const actionLabel = "offer" in offer ? offer.offer : offer.action;

    return (
        <Link
            href="#contact"
            aria-label={`${actionLabel}: ${offer.title}, ${offer.price}`}
            className={[
                "offer-card group relative isolate flex min-w-0 flex-col overflow-hidden rounded-[1.15rem]",
                "border transition-[transform,box-shadow,border-color] duration-300 ease-out",
                "motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4",
                isDark
                    ? "border-espresso/15 bg-espresso text-cream hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(32,27,23,0.18)]"
                    : "border-[#dfd2bf] bg-[#f8f2e8] text-espresso hover:-translate-y-1 hover:border-[#c9ad8a] hover:shadow-[0_18px_40px_rgba(67,48,31,0.10)]",
            ].join(" ")}
        >
            <div className="relative h-36 overflow-hidden sm:h-[9rem] lg:h-[9rem]">
                <Image
                    src={offer.image}
                    alt={offer.imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
                />
                <div
                    aria-hidden="true"
                    className={[
                        "absolute inset-x-0 bottom-0 h-[40%]",
                        isDark
                            ? "bg-gradient-to-t from-espresso/80 to-transparent"
                            : "bg-gradient-to-t from-[#f8f2e8]/70 to-transparent",
                    ].join(" ")}
                />
                <span
                    className={[
                        "absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center rounded-full px-3 py-1.5",
                        "text-[0.62rem] font-semibold uppercase tracking-[0.13em] backdrop-blur-md",
                        isDark
                            ? "bg-amber-400 text-espresso"
                            : "bg-espresso/85 text-white",
                    ].join(" ")}
                >
                    {offer.eyebrow}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-[1.15rem]">
                <div className="flex items-start justify-between gap-3">
                    <h3
                        className={[
                            "min-w-0 font-serif text-[1.18rem] leading-tight tracking-[-0.025em] sm:text-[1.22rem]",
                            isDark ? "text-cream" : "text-espresso",
                        ].join(" ")}
                    >
                        {offer.title}
                    </h3>
                    <span
                        className={[
                            "shrink-0 pt-0.5 font-serif text-[1rem] font-semibold tracking-[-0.025em]",
                            isDark ? "text-amber-300" : "text-[#a64c22]",
                        ].join(" ")}
                    >
                        {offer.price}
                    </span>
                </div>

                <p
                    className={[
                        "mt-2 text-[0.78rem] leading-[1.55]",
                        isDark ? "text-cream/75" : "text-[#766b5d]",
                    ].join(" ")}
                >
                    {offer.description}
                </p>

                <div className="mt-4 flex min-h-8 items-center justify-between gap-3">
                    <span
                        className={[
                            "text-[0.64rem] font-semibold uppercase tracking-[0.12em]",
                            isDark ? "text-amber-300" : "text-[#a64c22]",
                        ].join(" ")}
                    >
                        {actionLabel}
                    </span>
                    <span
                        aria-hidden="true"
                        className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300",
                            "group-hover:translate-x-0.5",
                            isDark
                                ? "bg-amber-400/15 text-amber-300 group-hover:bg-amber-400 group-hover:text-espresso"
                                : "bg-[#ead9bf] text-[#8d451f] group-hover:bg-[#a64c22] group-hover:text-white",
                        ].join(" ")}
                    >
                        <ArrowIcon className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

function MenuItemCard({
    item,
    categoryName,
    quantity,
    added,
    onAdd,
    onDecrease,
}: {
    item: MenuItem;
    categoryName: string;
    quantity: number;
    added: boolean;
    onAdd: () => void;
    onDecrease: () => void;
}) {
    const total = formatPrice(item.price * quantity);

    return (
        <article className="menu-card group flex min-w-0 flex-col rounded-2xl border border-transparent p-2.5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-border hover:bg-surface/60 hover:shadow-[0_10px_28px_rgba(32,27,23,0.045)] sm:p-3">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-bone">
                <Image
                    src={getItemImage(item, categoryName)}
                    alt={item.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
                />

                {quantity > 0 && (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/20 bg-espresso/90 px-3 py-1.5 text-[0.68rem] font-semibold text-white shadow-sm backdrop-blur-sm">
                        {quantity} in order
                    </span>
                )}

                {item.isSpecial && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#a64c22] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white shadow-sm">
                        Chef&apos;s special
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col px-1 pb-1">
                <div className="flex items-start justify-between gap-3">
                    <h4 className="min-w-0 font-serif text-[1.2rem] leading-[1.12] tracking-[-0.025em] text-text">
                        {item.name}
                    </h4>
                    <span className="shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-accent">
                        {formatPrice(item.price)}
                    </span>
                </div>

                {item.description ? (
                    <p className="mt-2 line-clamp-2 min-h-[2.65rem] text-[0.82rem] leading-[1.6] text-text-muted">
                        {item.description}
                    </p>
                ) : (
                    <div className="min-h-[2.65rem]" />
                )}

                <div className="mt-auto pt-4">
                    {quantity === 0 ? (
                        <button
                            type="button"
                            onClick={onAdd}
                            className={[
                                "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5",
                                "text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                                added
                                    ? "border-[#426a4a] bg-[#426a4a] text-white"
                                    : "border-[#c8a77e] bg-transparent text-text hover:border-accent hover:bg-accent hover:text-white",
                            ].join(" ")}
                        >
                            {added ? (
                                <>
                                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>
                                    Added
                                </>
                            ) : (
                                <>
                                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                    Add to order
                                </>
                            )}
                        </button>
                    ) : (
                        <div
                            className="flex min-h-11 items-center justify-between gap-2 rounded-full border border-[#d8c2a5] bg-[#f6ecdd] p-1"
                            aria-label={`${item.name}, quantity ${quantity}, total ${total}`}
                        >
                            <button
                                type="button"
                                onClick={onDecrease}
                                aria-label={`Remove one ${item.name}`}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg text-espresso shadow-sm transition-colors hover:bg-[#ead9bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                <span aria-hidden="true">−</span>
                            </button>
                            <span className="flex min-w-0 flex-col items-center leading-tight">
                                <span className="text-xs font-semibold text-espresso">
                                    {quantity} in order
                                </span>
                                <span className="mt-0.5 text-[0.7rem] tabular-nums text-[#8d451f]">
                                    {total}
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={onAdd}
                                aria-label={`Add another ${item.name}`}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso text-lg text-white transition-colors hover:bg-[#a64c22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                <span aria-hidden="true">+</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function Menu() {
    const sectionRef = useRef<HTMLElement>(null);
    const { addItem, updateQuantity, getItemQuantity } = useCart();

    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [activeTab, setActiveTab] = useState("");
    const [dataSource, setDataSource] = useState<"loading" | "server" | "fallback">("loading");
    const [loadError, setLoadError] = useState(false);
    const [addedId, setAddedId] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadMenu() {
            try {
                const result = await fetchMenu();
                if (cancelled) return;

                const nextCategories = result.categories ?? [];
                setCategories(nextCategories);
                setDataSource(result.source);
                setLoadError(false);
                setActiveTab((current) =>
                    nextCategories.some((category) => category.name === current)
                        ? current
                        : nextCategories[0]?.name ?? "",
                );
            } catch {
                if (cancelled) return;
                setCategories([]);
                setDataSource("fallback");
                setLoadError(true);
            }
        }

        void loadMenu();
        return () => {
            cancelled = true;
        };
    }, []);

    useGSAP(
        () => {
            const root = sectionRef.current;
            if (!root || dataSource === "loading") return;

            const media = gsap.matchMedia();

            media.add("(prefers-reduced-motion: no-preference)", () => {
                const offerCards = root.querySelectorAll<HTMLElement>(".offer-card");
                const menuCards = root.querySelectorAll<HTMLElement>(".menu-card");

                if (offerCards.length) {
                    gsap.fromTo(
                        offerCards,
                        { y: 18, autoAlpha: 0 },
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.65,
                            stagger: 0.09,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: offerCards[0],
                                start: "top 88%",
                                once: true,
                            },
                        },
                    );
                }

                if (menuCards.length) {
                    gsap.fromTo(
                        menuCards,
                        { y: 16, autoAlpha: 0 },
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.45,
                            stagger: 0.035,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: menuCards[0],
                                start: "top 92%",
                                once: true,
                            },
                        },
                    );
                }
            });

            return () => media.revert();
        },
        { scope: sectionRef, dependencies: [categories, activeTab, dataSource], revertOnUpdate: true },
    );

    const handleAddToCart = useCallback(
        (item: MenuItem, categoryName: string) => {
            addItem({
                menuItemId: item.id,
                name: item.name,
                price: item.price,
                notes: "",
                image: getItemImage(item, categoryName),
                categoryName,
            });
            setAddedId(item.id);
            window.setTimeout(() => {
                setAddedId((current) => (current === item.id ? null : current));
            }, 1200);
        },
        [addItem],
    );

    const activeCategory = categories.find((category) => category.name === activeTab);
    const filteredItems = activeCategory?.items ?? [];

    return (
        <section
            ref={sectionRef}
            id="menu"
            aria-labelledby="menu-heading"
            className="relative w-full overflow-hidden bg-background pt-16 sm:pt-20 lg:pt-24"
        >
            <div className="content-container relative z-10">
                <header className="mb-9 flex flex-col gap-4 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="label-mini mb-3 font-semibold uppercase tracking-[0.2em] text-accent">
                            From our kitchen
                        </p>
                        <h2
                            id="menu-heading"
                            className="max-w-[720px] font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.94] tracking-[-0.045em] text-text"
                        >
                            Good food, all day.
                        </h2>
                    </div>
                    <p className="max-w-[450px] text-[0.94rem] leading-[1.75] text-text-muted">
                        From breakfast and artisan coffee to burgers, curries, pasta, momo
                        and loaded chips. Made fresh, just the way a good café should.
                    </p>
                </header>
            </div>

            <div className="content-container relative z-10 mb-12 sm:mb-14 lg:mb-16">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="label-mini font-semibold uppercase tracking-[0.16em] text-text-muted">
                        Worth making time for
                    </p>
                    <span className="hidden text-xs text-text-muted sm:block">
                        A little something for every part of the day
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {OFFERS.map((offer) => (
                        <PromotionCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>

            <div className="sticky top-[72px] z-30 border-y border-border bg-background/95 py-3 shadow-[0_4px_16px_rgba(32,27,23,0.035)] backdrop-blur-xl sm:top-[88px]">
                <div className="content-container">
                    {dataSource === "loading" ? (
                        <div className="flex gap-2 overflow-hidden py-1" aria-label="Loading menu categories">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-bone" />
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div
                            role="tablist"
                            aria-label="Menu categories"
                            className="hide-scrollbar flex items-center gap-2 overflow-x-auto py-1"
                        >
                            {categories.map((category) => {
                                const selected = activeTab === category.name;
                                const tabId = `menu-tab-${category.id}`;
                                const panelId = `menu-panel-${category.id}`;

                                return (
                                    <button
                                        key={category.id}
                                        id={tabId}
                                        type="button"
                                        role="tab"
                                        aria-selected={selected}
                                        aria-controls={panelId}
                                        tabIndex={selected ? 0 : -1}
                                        onClick={() => setActiveTab(category.name)}
                                        className={[
                                            "inline-flex min-h-10 shrink-0 items-center gap-2.5 rounded-full border px-4 py-2",
                                            "text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                                            selected
                                                ? "border-espresso bg-espresso text-cream"
                                                : "border-border bg-surface-elevated text-text-muted hover:border-[#c8a77e] hover:text-text",
                                        ].join(" ")}
                                    >
                                        <span>{category.name}</span>
                                        <span
                                            className={[
                                                "min-w-5 rounded-full px-1.5 py-0.5 text-center text-[0.62rem] tabular-nums",
                                                selected ? "bg-white/15 text-white" : "bg-bone text-text-muted",
                                            ].join(" ")}
                                        >
                                            {category.items?.length ?? 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="py-2 text-sm text-text-muted">
                            Menu categories are temporarily unavailable.
                        </p>
                    )}
                </div>
            </div>

            <div className="content-container relative z-10 mt-10 sm:mt-12">
                <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="label-mini mb-2 font-semibold uppercase tracking-[0.16em] text-accent">
                            Explore the menu
                        </p>
                        <h3 className="font-serif text-[2.35rem] leading-none tracking-[-0.035em] text-text sm:text-[2.8rem]">
                            {activeTab || (dataSource === "loading" ? "Preparing the menu" : "Menu")}
                        </h3>
                        <p className="mt-3 max-w-[520px] text-sm leading-relaxed text-text-muted">
                            Thoughtful ingredients, familiar favourites, and something new to discover.
                        </p>
                    </div>
                    {activeCategory && (
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                        </p>
                    )}
                </div>

                {dataSource === "loading" ? (
                    <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading menu items">
                        {Array.from({ length: 8 }, (_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="mb-4 aspect-[4/3] rounded-xl bg-bone" />
                                <div className="mb-3 h-5 w-3/4 rounded bg-bone" />
                                <div className="mb-2 h-3 w-full rounded bg-bone" />
                                <div className="h-3 w-2/3 rounded bg-bone" />
                            </div>
                        ))}
                    </div>
                ) : loadError ? (
                    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
                        <h4 className="font-serif text-2xl text-text">We couldn’t load the menu.</h4>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                            Please try again in a moment, or contact the café and we’ll be happy to help.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setLoadError(false);
                                setDataSource("loading");
                                void fetchMenu()
                                    .then((result) => {
                                        setCategories(result.categories ?? []);
                                        setDataSource(result.source);
                                        setActiveTab(result.categories?.[0]?.name ?? "");
                                    })
                                    .catch(() => {
                                        setLoadError(true);
                                        setDataSource("fallback");
                                    });
                            }}
                            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-espresso px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-[#a64c22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                            Try again
                        </button>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div
                        id={activeCategory ? `menu-panel-${activeCategory.id}` : "menu-panel"}
                        role="tabpanel"
                        aria-labelledby={activeCategory ? `menu-tab-${activeCategory.id}` : undefined}
                        className="menu-grid grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4"
                    >
                        {filteredItems.map((item) => {
                            const quantity = getItemQuantity(item.id);
                            return (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    categoryName={activeTab}
                                    quantity={quantity}
                                    added={addedId === item.id}
                                    onAdd={() => handleAddToCart(item, activeTab)}
                                    onDecrease={() => updateQuantity(item.id, quantity - 1)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
                        <h4 className="font-serif text-2xl text-text">Nothing on this menu just yet.</h4>
                        <p className="mt-2 text-sm text-text-muted">
                            Please check another category or ask our team about today’s specials.
                        </p>
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-16 pb-16 sm:mt-20 sm:pb-20">
                <GMDivider leftText="Golden Moment" rightText="Canberra · ACT" />
            </div>
        </section>
    );
}
