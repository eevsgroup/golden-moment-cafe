"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ClockIcon,
    MapPinIcon,
} from "@phosphor-icons/react";

import { HOURS_SUMMARY } from "@/lib/data/hours";
import { CONTACT } from "@/lib/data/contact";
import { SECTION_CONTENT } from "@/lib/data/sections";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_CONTENT = [
    ".hero-eyebrow",
    ".hero-heading",
    ".hero-copy",
    ".hero-actions",
    ".hero-meta",
    ".hero-scroll",
].join(", ");

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const hero = heroRef.current;

            if (!hero) return;

            const image = hero.querySelector<HTMLElement>(".hero-image");

            if (!image) return;

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            // Content is visible by default in the markup's no-JS state.
            // GSAP owns the entrance animation only after initialization.
            if (prefersReducedMotion) {
                gsap.set(HERO_CONTENT, {
                    autoAlpha: 1,
                    clearProps: "transform",
                });

                gsap.set(image, {
                    clearProps: "transform",
                });

                return;
            }

            const entrance = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            entrance
                .fromTo(
                    ".hero-eyebrow",
                    { autoAlpha: 0, y: 14 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.65,
                        clearProps: "transform",
                    },
                    0.1
                )
                .fromTo(
                    ".hero-heading",
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.9,
                        clearProps: "transform",
                    },
                    0.2
                )
                .fromTo(
                    ".hero-copy",
                    { autoAlpha: 0, y: 12 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        clearProps: "transform",
                    },
                    0.5
                )
                .fromTo(
                    ".hero-actions",
                    { autoAlpha: 0, y: 12 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.65,
                        clearProps: "transform",
                    },
                    0.72
                )
                .fromTo(
                    ".hero-meta",
                    { autoAlpha: 0, y: 12 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        clearProps: "transform",
                    },
                    0.8
                )
                .fromTo(
                    ".hero-scroll",
                    { autoAlpha: 0 },
                    {
                        autoAlpha: 1,
                        duration: 0.55,
                    },
                    1
                );

            // Avoid competing scale animations: the entrance handles
            // the image zoom, while ScrollTrigger handles vertical drift.
            gsap.fromTo(
                image,
                { scale: 1.08 },
                {
                    scale: 1,
                    duration: 2,
                    ease: "power2.out",
                    overwrite: "auto",
                }
            );

            const media = gsap.matchMedia();

            // Desktop/tablet: pin briefly while the image drifts.
            media.add("(min-width: 768px)", () => {
                gsap.to(image, {
                    yPercent: 5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "+=40%",
                        scrub: 1,
                        pin: hero,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            });

            // Mobile: retain subtle parallax without pinning the viewport.
            media.add("(max-width: 767px)", () => {
                gsap.to(image, {
                    yPercent: 3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                });
            });

            return () => {
                media.revert();
            };
        },
        {
            scope: heroRef,
            dependencies: [],
            revertOnUpdate: true,
        }
    );

    return (
        <section
            id="hero"
            ref={heroRef}
            aria-label="Golden Moment Café introduction"
            className="relative isolate flex min-h-[max(760px,100svh)] flex-col overflow-hidden bg-espresso text-cream"
        >
            {/* Background photography */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-30 overflow-hidden bg-espresso"
            >
                <Image
                    src="/images/hero.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="hero-image object-cover object-[57%_center] sm:object-center"
                />
            </div>

            {/* Left-side directional overlay: ensures text on the left is crystal clear while cafe interior on the right remains luminous and warm */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20"
                style={{
                    background: [
                        "linear-gradient(90deg, rgba(20, 15, 11, 0.94) 0%, rgba(20, 15, 11, 0.88) 32%, rgba(20, 15, 11, 0.62) 55%, rgba(20, 15, 11, 0.20) 78%, transparent 100%)",
                        "linear-gradient(0deg, rgba(20, 15, 11, 0.88) 0%, rgba(20, 15, 11, 0.35) 25%, transparent 50%)",
                        "linear-gradient(180deg, rgba(20, 15, 11, 0.55) 0%, transparent 22%)",
                    ].join(", "),
                }}
            />

            {/* Fine top rule */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-24 -z-10 hidden border-t border-white/20 sm:inset-x-8 sm:block lg:inset-x-12"
            />

            {/* Main content */}
            <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-8 pt-32 sm:px-8 sm:pb-10 sm:pt-36 lg:px-16 lg:pb-10 lg:pt-32">
                <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_150px] lg:gap-12">
                    <div className="max-w-[850px]">
                        <div className="hero-eyebrow mb-6 flex items-center gap-4 sm:mb-8">
                            <span
                                aria-hidden="true"
                                className="h-px w-10 shrink-0 bg-gold sm:w-14"
                            />

                            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-pale sm:text-sm sm:tracking-[0.22em]">
                                Canberra, Australia
                            </p>
                        </div>

                        <div className="overflow-hidden pb-3">
                            <h1 className="hero-heading max-w-[850px] font-display text-[clamp(3.4rem,7.1vw,7.1rem)] leading-[0.94] tracking-[-0.055em] text-white">
                                Good food.
                                <br />
                                Better{" "}
                                <span className="font-serif font-normal italic text-gold-light">
                                    moments.
                                </span>
                            </h1>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <p className="hero-copy section-lead section-lead-inverse">
                                {SECTION_CONTENT.hero.description}
                            </p>

                            <p className="hero-copy mt-4 font-signature text-[2rem] leading-tight text-gold-light sm:mt-5 sm:text-[2.4rem]">
                                {SECTION_CONTENT.hero.script}
                            </p>
                        </div>

                        <div className="hero-actions mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
                            <a
                                href="#menu"
                                className="group inline-flex min-h-[54px] items-center justify-center gap-4 rounded-full bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-espresso transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-hover active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:px-8 sm:text-[13px]"
                            >
                                <span>Explore the menu</span>

                                <ArrowRightIcon
                                    size={19}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/50 bg-espresso/35 px-7 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 hover:border-white/80 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:px-8 sm:text-[13px]"
                            >
                                Reserve a table
                            </a>
                        </div>
                    </div>

                    {/* Vertical editorial accent */}
                    <div className="hidden justify-self-end pb-2 lg:block">
                        <div
                            aria-hidden="true"
                            className="mx-auto mb-5 h-14 w-px bg-gradient-to-b from-transparent via-gold/90 to-transparent"
                        />

                        <p className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-white/80 [writing-mode:vertical-rl]">
                            Coffee · Brunch · Good company
                        </p>
                    </div>
                </div>

                {/* Location and hours */}
                <div className="hero-meta mt-10 border-t border-white/30 pt-5 sm:mt-14 sm:pt-6 lg:mt-16">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
                        <a
                            href="#contact"
                            className="group flex min-w-0 items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                        >
                            <MapPinIcon
                                size={23}
                                weight="regular"
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-gold-light"
                            />

                            <span className="min-w-0">
                                <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-white/75">
                                    Find us
                                </span>

                                <span className="mt-1.5 block text-base leading-relaxed text-white transition-colors duration-200 group-hover:text-gold-pale sm:text-[17px]">
                                    {CONTACT.address.short}
                                </span>
                            </span>
                        </a>

                        <div className="flex min-w-0 items-start gap-3">
                            <ClockIcon
                                size={23}
                                weight="regular"
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-gold-light"
                            />

                            <span className="min-w-0">
                                <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-white/75">
                                    Opening hours
                                </span>

                                <span className="mt-1.5 block text-base leading-relaxed text-white sm:text-[17px]">
                                    {HOURS_SUMMARY}
                                </span>
                            </span>
                        </div>

                        <a
                            href="#explore-food"
                            className="hero-scroll group hidden items-center gap-3 self-end rounded-sm pb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light lg:flex"
                        >
                            <span>Explore our food</span>

                            <ArrowDownIcon
                                size={18}
                                weight="regular"
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-y-1"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}