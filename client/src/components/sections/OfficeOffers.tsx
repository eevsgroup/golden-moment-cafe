"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const OFFERS = [
    {
        id: "breakfast",
        num: "01",
        title: "Breakfast Combo",
        tagline: "Kickstart your day the right way",
        price: "$9.99",
        details: "Bacon and Eggs Roll + Small Coffee",
        time: "Mon – Fri · 7 AM – 10 AM",
        img: "https://images.unsplash.com/photo-1550507992-eb63ffee0224?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "lunch",
        num: "02",
        title: "Office Lunch",
        tagline: "Delicious meals. Fast service.",
        price: "From $15",
        details: "Choice of Selected Meal + Any Can Drink",
        time: "Mon – Fri · 11 AM – 2 PM",
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "catering",
        num: "03",
        title: "Office Catering",
        tagline: "For meetings, training & team events",
        price: "From $15 pp",
        details: "Sandwiches · Wraps · Pastries · Coffee",
        time: "10% off all office catering orders",
        img: "https://images.unsplash.com/photo-1555243896-771a82b5dd8f?q=80&w=800&auto=format&fit=crop",
    },
];

function OfferRow({
    offer,
    isOpen,
    onToggle,
}: {
    offer: (typeof OFFERS)[0];
    isOpen: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!contentRef.current || !imgRef.current) return;

            if (isOpen) {
                gsap.to(contentRef.current, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                });
                gsap.fromTo(
                    imgRef.current,
                    { scale: 1.15, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
                );
            } else {
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.inOut",
                });
            }
        },
        { dependencies: [isOpen] }
    );

    return (
        <div className="group border-b border-white/10">
            {/* Clickable header row */}
            <button
                onClick={onToggle}
                className="relative flex w-full items-center gap-4 sm:gap-8 py-8 sm:py-10 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                aria-expanded={isOpen}
            >
                {/* Number */}
                <span className="label-micro text-white/30 w-8 shrink-0">
                    {offer.num}
                </span>

                {/* Title */}
                <span className="flex-1 font-serif text-[clamp(1.75rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-white transition-colors group-hover:text-accent">
                    {offer.title}
                </span>

                {/* Price pill */}
                <span className="hidden sm:block label-micro text-accent mr-4">
                    {offer.price}
                </span>

                {/* Toggle icon */}
                <span
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                            ? "border-accent bg-accent text-[#1a1614] rotate-45"
                            : "border-white/20 text-white/60 rotate-0 group-hover:border-white/40"
                    }`}
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </span>
            </button>

            {/* Expandable content */}
            <div
                ref={contentRef}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
            >
                <div className="pb-10 sm:pb-14 pl-12 sm:pl-16">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16">
                        {/* Text side */}
                        <div className="flex flex-col justify-center">
                            <p className="font-sans text-[15px] leading-[1.7] text-white/70 mb-6">
                                {offer.tagline}
                            </p>

                            {/* Details */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-baseline gap-4">
                                    <span className="label-micro text-white/40 w-16 shrink-0">
                                        Includes
                                    </span>
                                    <span className="font-sans text-[14px] text-white/90">
                                        {offer.details}
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-4">
                                    <span className="label-micro text-white/40 w-16 shrink-0">
                                        When
                                    </span>
                                    <span className="font-sans text-[14px] text-white/90">
                                        {offer.time}
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-4 sm:hidden">
                                    <span className="label-micro text-white/40 w-16 shrink-0">
                                        Price
                                    </span>
                                    <span className="font-sans text-[14px] font-medium text-accent">
                                        {offer.price}
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                href="#contact"
                                className="group/cta inline-flex items-center gap-4 self-start"
                            >
                                <span className="label-micro text-accent transition-colors group-hover/cta:text-white">
                                    Order now
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 text-accent transition-all group-hover/cta:bg-accent group-hover/cta:text-[#1a1614]">
                                    →
                                </span>
                            </Link>
                        </div>

                        {/* Image side */}
                        <div
                            ref={imgRef}
                            className="relative aspect-[16/10] w-full overflow-hidden"
                        >
                            <img
                                src={offer.img}
                                alt={offer.title}
                                className="absolute inset-0 h-full w-full object-cover object-center"
                            />
                            {/* Soft vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614]/40 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OfficeOffers() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openId, setOpenId] = useState<string | null>("breakfast");

    useGSAP(
        () => {
            const root = sectionRef.current;
            if (!root) return;

            const q = gsap.utils.selector(root);

            // Stagger in the header + rows on scroll
            gsap.fromTo(
                q(".offers-header, .offers-row"),
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: root,
                        start: "top 75%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="catering"
            aria-labelledby="offers-heading"
            className="relative w-full overflow-hidden bg-[#1a1614] py-24 sm:py-32 lg:py-40"
        >
            {/* Subtle noise/grain texture */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="content-container relative z-10">
                {/* Header */}
                <div className="offers-header mb-16 sm:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                    <div>
                        <p className="label-mini text-accent mb-5">Corporate & Catering</p>
                        <h2
                            id="offers-heading"
                            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white"
                        >
                            Office Offers
                        </h2>
                    </div>
                    <p className="font-sans text-[15px] leading-[1.6] text-white/50 max-w-[340px]">
                        Exclusive daily specials and catering for our local building staff.
                    </p>
                </div>

                {/* Accordion rows */}
                <div className="border-t border-white/10">
                    {OFFERS.map((offer) => (
                        <div key={offer.id} className="offers-row">
                            <OfferRow
                                offer={offer}
                                isOpen={openId === offer.id}
                                onToggle={() =>
                                    setOpenId((prev) =>
                                        prev === offer.id ? null : offer.id
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>

                {/* Trust bar */}
                <div className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                    {[
                        {
                            icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            ),
                            label: "Fast & Fresh",
                            desc: "Made fresh daily with quality ingredients",
                        },
                        {
                            icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M9 11l3 3L22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                            ),
                            label: "Easy Ordering",
                            desc: "Pre-order for hassle-free pickup or delivery",
                        },
                        {
                            icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            ),
                            label: "Order Now",
                            desc: "Speak to our team or visit the cafe",
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-start gap-5 sm:flex-col sm:items-center sm:text-center sm:gap-4"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-accent">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="label-micro text-white/80 mb-2">{item.label}</h4>
                                <p className="font-sans text-[13px] leading-[1.6] text-white/40 max-w-[220px] sm:mx-auto">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
