"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOOD_CATEGORIES = [
    {
        id: "breakfast",
        title: "Breakfast & Brunch",
        description: "Start your day the delicious way.",
        action: "Explore Breakfast",
        image:
            "https://images.unsplash.com/photo-1525351484163-529a90d566f5?q=85&w=1500&auto=format&fit=crop",
        imageAlt: "Breakfast plate with eggs, toast and fresh ingredients",
        className: "food-category-card food-category-card--large",
        icon: "breakfast",
    },
    {
        id: "coffee",
        title: "Coffee & Drinks",
        description: "Great coffee, always.",
        action: "Explore Drinks",
        image:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=85&w=1200&auto=format&fit=crop",
        imageAlt: "Freshly prepared coffee in a warm café setting",
        className: "food-category-card",
        icon: "coffee",
    },
    {
        id: "lunch",
        title: "Lunch & Favourites",
        description: "Satisfying meals for every craving.",
        action: "Explore Lunch",
        image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=85&w=1200&auto=format&fit=crop",
        imageAlt: "A freshly prepared pasta lunch",
        className: "food-category-card",
        icon: "lunch",
    },
] as const;

function CategoryIcon({ name }: { name: "breakfast" | "coffee" | "lunch" }) {
    if (name === "coffee") {
        return (
            <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M10 19h25v12a9 9 0 0 1-9 9h-7a9 9 0 0 1-9-9V19Z" />
                <path d="M35 22h3a5 5 0 0 1 0 10h-4M7 43h34M19 12c-3-3 3-4 0-8M27 12c-3-3 3-4 0-8" />
            </svg>
        );
    }

    if (name === "lunch") {
        return (
            <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M12 5v15M18 5v15M12 13h6M15 20v23M31 5v38M31 5c8 7 8 17 0 20" />
            </svg>
        );
    }

    return (
        <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M7 31h34M11 26a13 13 0 0 1 26 0M24 5v5M8 12l4 4M40 12l-4 4M4 38h40M24 16v7" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15M13 5l7 7-7 7" />
        </svg>
    );
}

export default function ExploreOurFood() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const intro = section.querySelectorAll<HTMLElement>(".food-intro > *");
            const cards = section.querySelectorAll<HTMLElement>(".food-category-card");

            gsap.fromTo(
                intro,
                { y: 22, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.75,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: section, start: "top 78%", once: true },
                    clearProps: "transform",
                }
            );

            gsap.fromTo(
                cards,
                { y: 28, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.85,
                    stagger: 0.13,
                    ease: "power3.out",
                    scrollTrigger: { trigger: cards[0], start: "top 82%", once: true },
                    clearProps: "transform",
                }
            );
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section
            id="explore-food"
            ref={sectionRef}
            aria-labelledby="explore-food-heading"
            className="explore-food-section relative isolate overflow-hidden bg-cream py-20 text-espresso sm:py-24 lg:py-28"
        >
            <div className="content-container relative z-10">
                <header className="food-intro mb-10 flex flex-col gap-5 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-[850px]">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="eyebrow text-sienna">Our Menu</span>
                            <span className="h-px w-24 bg-sienna/65 sm:w-32" aria-hidden="true" />
                        </div>
                        <h2
                            id="explore-food-heading"
                            className="editorial-heading text-[clamp(3.25rem,7.2vw,6rem)] text-espresso"
                        >
                            Explore Our Food
                        </h2>
                        <p className="mt-4 max-w-[760px] text-base leading-relaxed text-text-secondary sm:text-lg lg:text-[1.2rem]">
                            From hearty breakfasts to delicious lunches, discover our menu favourites.
                        </p>
                    </div>

                    <Link
                        href="#menu"
                        className="group inline-flex min-h-11 w-fit shrink-0 items-center gap-3 border-b border-sienna pb-1 text-sm font-semibold text-espresso transition-colors hover:text-sienna focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:text-base"
                    >
                        View Full Menu
                        <ArrowIcon />
                    </Link>
                </header>

                <div className="food-category-grid grid grid-cols-1 gap-4 md:auto-rows-[260px] md:grid-cols-2 md:gap-5 lg:auto-rows-[300px]">
                    {FOOD_CATEGORIES.map((category) => (
                        <Link
                            key={category.id}
                            href="#menu"
                            aria-label={`${category.action}. Browse the full Golden Moment menu.`}
                            className={`${category.id === "breakfast" ? "md:row-span-2 md:min-h-[540px] lg:min-h-[620px]" : "min-h-[280px] lg:min-h-[300px]"} group relative isolate flex overflow-hidden rounded-[1.15rem] bg-espresso text-cream shadow-[0_12px_35px_rgba(32,27,23,0.08)] outline-none transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(32,27,23,0.16)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none`}
                        >
                            <Image
                                src={category.image}
                                alt={category.imageAlt}
                                fill
                                sizes={category.id === "breakfast"
                                    ? "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 55vw"
                                    : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 45vw"}
                                className="food-category-image -z-20 object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.055] motion-reduce:transform-none"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160f0a]/90 via-[#160f0a]/65 to-[#160f0a]/10"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 -z-10 bg-gradient-to-t from-[#160f0a]/35 via-transparent to-[#160f0a]/10"
                            />

                            <div className="flex w-full flex-col items-start p-6 sm:p-7 lg:p-8">
                                <span className="mb-5 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-gold-light/90 text-gold-light sm:mb-6 sm:h-[68px] sm:w-[68px]">
                                    <CategoryIcon name={category.icon} />
                                </span>

                                <h3 className="max-w-[420px] font-serif text-[clamp(1.8rem,3.1vw,2.75rem)] leading-[1.05] tracking-[-0.035em] text-cream">
                                    {category.title}
                                </h3>
                                <p className="mt-3 max-w-[270px] text-sm leading-relaxed text-cream/90 sm:text-base">
                                    {category.description}
                                </p>

                                <span className="mt-6 inline-flex items-center gap-3 border-b border-gold-light/80 pb-1 text-sm font-medium text-cream transition-colors group-hover:text-gold-light sm:mt-7">
                                    {category.action}
                                    <ArrowIcon />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
