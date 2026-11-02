"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useCart } from "@/lib/context/CartContext";
import { fetchMenu } from "@/lib/api/menu";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { SECTION_CONTENT } from "@/lib/data/sections";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* -------------------------------------------------------------------------- */
/* Menu photography                                                           */
/* -------------------------------------------------------------------------- */

const CATEGORY_IMAGES: Record<string, string> = {
    PASTAS:
        "https://images.unsplash.com/photo-1621996311239-531f2425111b?q=80&w=1200&auto=format&fit=crop",
    BURGERS:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    "RICE & CURRY":
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    "NOODLES & DUMPLINGS":
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
    "CLASSICS & SIDES":
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1200&auto=format&fit=crop",
    "ADD-ONS":
        "https://images.unsplash.com/photo-1525351484163-c529a90d566f?q=80&w=1200&auto=format&fit=crop",
    "COFFEE & DRINKS":
        "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1200&auto=format&fit=crop",
    "BRUNCH & CLASSICS":
        "https://images.unsplash.com/photo-1525351484163-c529a90d566f?q=80&w=1200&auto=format&fit=crop",
};

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1200&auto=format&fit=crop";

/*
 * These promotions are retained from the existing Menu implementation.
 * Confirm their prices, hours and availability with the café before launch.
 */
const OFFERS = [
    {
        id: "breakfast",
        eyebrow: "MON–FRI · 7–10 AM",
        title: "Breakfast Combo",
        price: "$9.99",
        description: "Bacon and egg roll with a small coffee.",
        image:
            "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Breakfast pastries and fruit",
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
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
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
            "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Food prepared for sharing",
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
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.75 12h14.5" />
            <path d="m12.5 5.25 6.75 6.75-6.75 6.75" />
        </svg>
    );
}

function PlusIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        >
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

function CheckIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m5 12.5 4.2 4.2L19 7" />
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/* Offer cards                                                                */
/* -------------------------------------------------------------------------- */

function PromotionCard({ offer }: { offer: (typeof OFFERS)[number] }) {
    const isDark = offer.tone === "dark";
    const offerNote = "offer" in offer ? offer.offer : null;
    const href = offer.id === "catering" ? "#contact" : "#menu-items";

    return (
        <article
            className={[
                "offer-card group relative isolate flex min-w-0 flex-col overflow-hidden rounded-[1.35rem]",
                "border transition-[transform,box-shadow,border-color] duration-500 ease-out",
                "hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(32,27,23,0.12)]",
                "motion-reduce:transform-none motion-reduce:transition-none",
                isDark
                    ? "border-espresso bg-espresso text-cream"
                    : "border-espresso/10 bg-[#eee7da] text-espresso hover:border-sand",
            ].join(" ")}
        >
            <div className="relative aspect-[16/8.5] overflow-hidden sm:aspect-[16/9]">
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
                        "absolute inset-0",
                        isDark
                            ? "bg-gradient-to-t from-espresso/80 via-espresso/10 to-espresso/5"
                            : "bg-gradient-to-t from-espresso/55 via-transparent to-espresso/5",
                    ].join(" ")}
                />
                <span
                    className={[
                        "absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center rounded-full px-3 py-1.5",
                        "text-[0.62rem] font-semibold uppercase tracking-[0.13em] backdrop-blur-md sm:text-[0.66rem]",
                        isDark ? "bg-gold text-espresso" : "bg-cream/95 text-espresso",
                    ].join(" ")}
                >
                    {offer.eyebrow}
                </span>
                {offerNote && (
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-espresso/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-gold-pale backdrop-blur-md">
                        {offerNote}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3
                        className={[
                            "min-w-0 font-serif text-[1.35rem] leading-[1.05] tracking-[-0.03em] sm:text-[1.45rem]",
                            isDark ? "text-cream" : "text-espresso",
                        ].join(" ")}
                    >
                        {offer.title}
                    </h3>
                    <span
                        className={[
                            "shrink-0 pt-0.5 font-serif text-[1.05rem] font-semibold tracking-[-0.025em]",
                            isDark ? "text-gold-light" : "text-sienna",
                        ].join(" ")}
                    >
                        {offer.price}
                    </span>
                </div>

                <p
                    className={[
                        "mt-2.5 max-w-[34ch] text-[0.83rem] leading-[1.6]",
                        isDark ? "text-cream/75" : "text-text-secondary",
                    ].join(" ")}
                >
                    {offer.description}
                </p>

                <Link
                    href={href}
                    aria-label={`${offer.action}: ${offer.title}`}
                    className={[
                        "mt-5 inline-flex min-h-10 items-center justify-between gap-3 border-t pt-3",
                        "text-[0.68rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4",
                        isDark
                            ? "border-white/15 text-gold-light hover:text-white"
                            : "border-espresso/10 text-sienna-dark hover:text-espresso",
                    ].join(" ")}
                >
                    <span>{offer.action}</span>
                    <span
                        aria-hidden="true"
                        className={[
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 group-hover:translate-x-1",
                            isDark
                                ? "bg-gold/15 text-gold-light group-hover:bg-gold group-hover:text-espresso"
                                : "bg-bone text-sienna-dark group-hover:bg-sienna group-hover:text-white",
                        ].join(" ")}
                    >
                        <ArrowIcon className="h-4 w-4" />
                    </span>
                </Link>
            </div>
        </article>
    );
}

/* -------------------------------------------------------------------------- */
/* Menu item cards                                                            */
/* -------------------------------------------------------------------------- */

type MenuItemCardProps = {
    item: MenuItem;
    categoryName: string;
    quantity: number;
    added: boolean;
    onAdd: () => void;
    onDecrease: () => void;
};

function MenuItemCard({
    item,
    categoryName,
    quantity,
    added,
    onAdd,
    onDecrease,
}: MenuItemCardProps) {
    const total = formatPrice(item.price * quantity);

    return (
        <article className="menu-item-card group flex min-w-0 flex-col">
            <div className="relative mb-4 aspect-[5/4] overflow-hidden rounded-[1.1rem] bg-bone">
                <Image
                    src={getItemImage(item, categoryName)}
                    alt={item.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-espresso/20 to-transparent"
                />

                <span className="absolute right-3 top-3 rounded-full border border-white/60 bg-cream/95 px-3 py-1.5 text-sm font-semibold tabular-nums text-espresso shadow-sm backdrop-blur-sm">
                    {formatPrice(item.price)}
                </span>

                {item.isSpecial && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-espresso px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-gold-pale shadow-sm">
                        Chef&apos;s special
                    </span>
                )}

                {quantity > 0 && (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/20 bg-espresso/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                        {quantity} in order
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col px-0.5">
                <div className="flex items-start justify-between gap-3">
                    <h4 className="min-w-0 font-serif text-[1.3rem] leading-[1.08] tracking-[-0.03em] text-espresso sm:text-[1.4rem]">
                        {item.name}
                    </h4>
                </div>

                {item.description ? (
                    <p className="mt-2 line-clamp-2 min-h-[2.65rem] max-w-[42ch] text-[0.82rem] leading-[1.6] text-text-secondary">
                        {item.description}
                    </p>
                ) : (
                    <div className="min-h-[2.65rem]" aria-hidden="true" />
                )}

                <div className="mt-auto pt-4">
                    {quantity === 0 ? (
                        <button
                            type="button"
                            onClick={onAdd}
                            aria-label={`Add ${item.name} to order`}
                            className={[
                                "group/add inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-full border px-4 py-2.5",
                                "text-[0.68rem] font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform] duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                                added
                                    ? "border-success bg-success text-white"
                                    : "border-espresso/20 bg-transparent text-espresso hover:border-gold-cta hover:bg-gold-cta hover:text-espresso active:scale-[0.985]",
                            ].join(" ")}
                        >
                            <span className="inline-flex items-center gap-2">
                                {added ? (
                                    <CheckIcon className="h-4 w-4" />
                                ) : (
                                    <PlusIcon className="h-4 w-4 transition-transform duration-300 group-hover/add:rotate-90" />
                                )}
                                {added ? "Added to order" : "Add to order"}
                            </span>
                            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/add:translate-x-1" />
                        </button>
                    ) : (
                        <div
                            className="flex min-h-11 items-center justify-between gap-2 rounded-full border border-espresso/15 bg-[#eee7da] p-1"
                            aria-label={`${item.name}, quantity ${quantity}, total ${total}`}
                        >
                            <button
                                type="button"
                                onClick={onDecrease}
                                aria-label={`Remove one ${item.name}`}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-xl text-espresso transition-colors duration-200 hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                <span aria-hidden="true">−</span>
                            </button>
                            <span className="flex min-w-0 flex-col items-center leading-tight">
                                <span className="text-xs font-semibold text-espresso">
                                    {quantity} in order
                                </span>
                                <span className="mt-0.5 text-[0.7rem] tabular-nums text-sienna-dark">
                                    {total}
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={onAdd}
                                aria-label={`Add another ${item.name}`}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso text-lg text-cream transition-[background-color,color,transform] duration-200 hover:bg-gold-cta hover:text-espresso active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

function MenuLoadingState() {
    return (
        <div
            className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            aria-label="Loading menu items"
            aria-busy="true"
        >
            {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="mb-4 aspect-[5/4] rounded-[1.1rem] bg-bone" />
                    <div className="mb-3 h-5 w-3/4 rounded bg-bone" />
                    <div className="mb-2 h-3 w-full rounded bg-bone" />
                    <div className="h-3 w-2/3 rounded bg-bone" />
                    <div className="mt-5 h-11 rounded-full bg-bone" />
                </div>
            ))}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Menu section                                                               */
/* -------------------------------------------------------------------------- */

export default function Menu() {
    const sectionRef = useRef<HTMLElement>(null);
    const addedTimeoutRef = useRef<number | null>(null);
    const { addItem, updateQuantity, getItemQuantity } = useCart();

    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [activeTab, setActiveTab] = useState("");
    const [dataSource, setDataSource] = useState<
        "loading" | "server" | "static"
    >("loading");
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
                setDataSource("static");
                setLoadError(true);
            }
        }

        void loadMenu();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        return () => {
            if (addedTimeoutRef.current !== null) {
                window.clearTimeout(addedTimeoutRef.current);
            }
        };
    }, []);

    useGSAP(
        () => {
            const root = sectionRef.current;
            if (!root || dataSource === "loading") return;

            const media = gsap.matchMedia();

            media.add("(prefers-reduced-motion: no-preference)", () => {
                const intro = root.querySelector<HTMLElement>(".menu-intro");
                const offerCards = root.querySelectorAll<HTMLElement>(".offer-card");
                const menuCards = root.querySelectorAll<HTMLElement>(".menu-item-card");

                if (intro) {
                    gsap.fromTo(
                        intro,
                        { y: 20, autoAlpha: 0 },
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.75,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: intro,
                                start: "top 86%",
                                once: true,
                            },
                        },
                    );
                }

                if (offerCards.length) {
                    gsap.fromTo(
                        offerCards,
                        { y: 22, autoAlpha: 0 },
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
                            stagger: 0.045,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: menuCards[0],
                                start: "top 91%",
                                once: true,
                            },
                        },
                    );
                }
            });

            return () => media.revert();
        },
        {
            scope: sectionRef,
            dependencies: [categories, activeTab, dataSource],
            revertOnUpdate: true,
        },
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

            if (addedTimeoutRef.current !== null) {
                window.clearTimeout(addedTimeoutRef.current);
            }

            addedTimeoutRef.current = window.setTimeout(() => {
                setAddedId((current) => (current === item.id ? null : current));
                addedTimeoutRef.current = null;
            }, 1200);
        },
        [addItem],
    );

    const handleRetry = useCallback(async () => {
        setLoadError(false);
        setDataSource("loading");

        try {
            const result = await fetchMenu();
            const nextCategories = result.categories ?? [];
            setCategories(nextCategories);
            setDataSource(result.source);
            setActiveTab(nextCategories[0]?.name ?? "");
        } catch {
            setCategories([]);
            setLoadError(true);
            setDataSource("static");
        }
    }, []);

    const activeCategory =
        categories.find((category) => category.name === activeTab) ?? categories[0];
    const activeCategoryName = activeCategory?.name ?? "";
    const filteredItems = activeCategory?.items ?? [];

    const handleTabKeyDown = useCallback(
        (event: ReactKeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
            if (!categories.length) return;

            let nextIndex = currentIndex;
            if (event.key === "ArrowRight") {
                nextIndex = (currentIndex + 1) % categories.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (currentIndex - 1 + categories.length) % categories.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = categories.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            const nextCategory = categories[nextIndex];
            setActiveTab(nextCategory.name);
            document.getElementById(`menu-tab-${nextCategory.id}`)?.focus();
        },
        [categories],
    );

    return (
        <section
            ref={sectionRef}
            id="menu"
            aria-labelledby="menu-heading"
            className="relative w-full overflow-clip bg-cream pb-20 pt-16 text-espresso sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
        >
            {/* Intro: make the breadth of the café menu clear at a glance. */}
            <div className="content-container relative z-10">
                <header className="menu-intro grid grid-cols-1 gap-6 border-b border-espresso/15 pb-8 sm:pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end lg:gap-16">
                    <div>
                        <p className="label-mini mb-4 flex items-center gap-3 font-semibold text-accent">
                            <span className="h-px w-8 bg-gold-cta" aria-hidden="true" />
                            The Golden Moment menu
                        </p>
                        <h2
                            id="menu-heading"
                            className="max-w-[760px] font-display text-[clamp(2.7rem,5.3vw,5rem)] leading-[0.98] tracking-[-0.055em] text-espresso"
                        >
                            From morning favourites to a proper lunch.
                        </h2>
                    </div>

                    <div className="lg:pb-1">
                        <p className="max-w-[470px] text-[0.94rem] leading-[1.75] text-text-secondary sm:text-base">
                            {SECTION_CONTENT.menu.description ||
                                "Explore breakfast and brunch, coffee and drinks, plus satisfying café favourites — all in one place."}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2.5">
                            {[
                                "Breakfast & brunch",
                                "Coffee & drinks",
                                "Lunch favourites",
                                "Office catering",
                            ].map((label) => (
                                <span
                                    key={label}
                                    className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-sienna-dark"
                                >
                                    <span
                                        className="h-1.5 w-1.5 rounded-full bg-gold-cta"
                                        aria-hidden="true"
                                    />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </header>
            </div>

            {/* Offers: three clear reasons to choose Golden Moment. */}
            <div className="content-container relative z-10 mt-9 sm:mt-11 lg:mt-14">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="label-mini mb-2 font-semibold text-accent">
                            Worth knowing
                        </p>
                        <h3 className="font-serif text-[1.9rem] leading-none tracking-[-0.035em] text-espresso sm:text-[2.15rem]">
                            More ways to enjoy your day.
                        </h3>
                    </div>
                    <p className="max-w-[360px] text-sm leading-relaxed text-text-muted sm:text-right">
                        A quick breakfast, a lunch break or food for the whole team.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {OFFERS.map((offer) => (
                        <PromotionCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>

            {/* Category navigation stays close to the menu items on scroll. */}
            <div className="sticky top-[72px] z-30 mt-14 border-y border-espresso/10 bg-cream/95 py-3 shadow-[0_5px_20px_rgba(32,27,23,0.045)] backdrop-blur-xl sm:top-[88px] sm:mt-16">
                <div className="content-container">
                    {dataSource === "loading" ? (
                        <div
                            className="flex gap-2 overflow-hidden py-1"
                            aria-label="Loading menu categories"
                            aria-busy="true"
                        >
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-bone"
                                />
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div
                            role="tablist"
                            aria-label="Menu categories"
                            className="flex items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {categories.map((category, index) => {
                                const selected = activeCategoryName === category.name;
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
                                        onKeyDown={(event) => handleTabKeyDown(event, index)}
                                        className={[
                                            "inline-flex min-h-10 shrink-0 items-center gap-2.5 rounded-full border px-4 py-2",
                                            "text-[0.66rem] font-bold uppercase tracking-[0.1em] transition-[background-color,border-color,color] duration-200",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                                            selected
                                                ? "border-espresso bg-espresso text-cream"
                                                : "border-espresso/15 bg-transparent text-text-muted hover:border-sand hover:bg-[#eee7da] hover:text-espresso",
                                        ].join(" ")}
                                    >
                                        <span>{category.name}</span>
                                        <span
                                            className={[
                                                "min-w-5 rounded-full px-1.5 py-0.5 text-center text-[0.65rem] tabular-nums",
                                                selected
                                                    ? "bg-white/15 text-white"
                                                    : "bg-bone text-text-muted",
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

            {/* Actual menu catalogue */}
            <div
                id="menu-items"
                className="content-container relative z-10 scroll-mt-36 mt-10 sm:mt-12"
            >
                <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="label-mini mb-2 font-semibold text-accent">
                            Explore the menu
                        </p>
                        <h3 className="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-espresso sm:text-[2.85rem]">
                            {activeCategoryName ||
                                (dataSource === "loading" ? "Preparing the menu" : "Our menu")}
                        </h3>
                        <p className="mt-3 max-w-[500px] text-sm leading-relaxed text-text-secondary">
                            {SECTION_CONTENT.menu.subDescription ||
                                "Choose a favourite, add it to your order and make it a Golden Moment."}
                        </p>
                    </div>

                    {activeCategory && (
                        <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-text-muted sm:pb-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-cta" aria-hidden="true" />
                            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                        </p>
                    )}
                </div>

                {dataSource === "loading" ? (
                    <MenuLoadingState />
                ) : loadError ? (
                    <div className="rounded-[1.35rem] border border-espresso/10 bg-[#eee7da] px-6 py-12 text-center sm:px-10">
                        <p className="label-mini mb-3 font-semibold text-accent">
                            Menu unavailable
                        </p>
                        <h4 className="font-serif text-3xl tracking-[-0.03em] text-espresso">
                            We couldn&apos;t load the menu.
                        </h4>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
                            Please try again in a moment, or contact the café and our team will be happy to help.
                        </p>
                        <button
                            type="button"
                            onClick={handleRetry}
                            className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-espresso px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-sienna active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                            Try again
                            <ArrowIcon className="h-4 w-4" />
                        </button>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div
                        id={activeCategory ? `menu-panel-${activeCategory.id}` : "menu-panel"}
                        role="tabpanel"
                        aria-labelledby={activeCategory ? `menu-tab-${activeCategory.id}` : undefined}
                        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12 2xl:grid-cols-4"
                    >
                        {filteredItems.map((item) => {
                            const quantity = getItemQuantity(item.id);

                            return (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    categoryName={activeCategoryName}
                                    quantity={quantity}
                                    added={addedId === item.id}
                                    onAdd={() => handleAddToCart(item, activeCategoryName)}
                                    onDecrease={() =>
                                        updateQuantity(item.id, Math.max(0, quantity - 1))
                                    }
                                />
                            );
                        })}
                    </div>
                ) : categories.length > 0 ? (
                    <div className="rounded-[1.35rem] border border-dashed border-espresso/20 px-6 py-14 text-center">
                        <h4 className="font-serif text-2xl tracking-[-0.03em] text-espresso">
                            Nothing on this menu just yet.
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">
                            Please check another category or ask our team about today&apos;s specials.
                        </p>
                    </div>
                ) : (
                    <div className="rounded-[1.35rem] border border-espresso/10 bg-[#eee7da] px-6 py-12 text-center">
                        <h4 className="font-serif text-2xl tracking-[-0.03em] text-espresso">
                            Our menu is being updated.
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">
                            Please contact the café for today&apos;s menu.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
