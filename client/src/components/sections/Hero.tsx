"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HOURS_SUMMARY } from "@/lib/data/hours";
import { CONTACT } from "@/lib/data/contact";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Respect reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            // Instantly reveal everything, no animation
            gsap.set(".reveal-eyebrow, .reveal-heading, .reveal-text, .reveal-footer", {
                opacity: 1,
                y: 0,
            });
            return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Image slight scale-down effect
        tl.fromTo(
            ".hero-img",
            { scale: 1.05 },
            { scale: 1, duration: 2.5, ease: "power2.out" },
            0
        );

        // Staggered text reveals
        tl.fromTo(
            ".reveal-eyebrow",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1 },
            0.5
        )
            .fromTo(
                ".reveal-heading",
                { y: "120%", autoAlpha: 0 },
                { y: "0%", autoAlpha: 1, duration: 1.2 },
                0.6
            )
            .fromTo(
                ".reveal-text",
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1, stagger: 0.2 },
                0.8
            )
            .fromTo(
                ".reveal-footer",
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 1.5 },
                1.2
            );
    }, { scope: heroRef });

    return (
        <section
            id="hero"
            ref={heroRef}
            aria-label="Hero"
            className="relative isolate min-h-[90svh] overflow-hidden bg-[#1e1713] text-text-inverse"
        >
            {/* Hero image — luminous, morning sun cafe view */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <Image
                    src="/images/heroimg.png"
                    alt="Golden Moment Cafe in Canberra"
                    fill
                    priority
                    sizes="100vw"
                    className="hero-img will-change-transform object-cover object-center"
                />
            </div>
            {/* ── Sun-drenched Morning Lighting ── */}

            {/* 1. Warm morning sunlight, concentrated in the upper-right */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0
  bg-[radial-gradient(ellipse_at_82%_12%,rgba(255,230,160,0.42)_0%,rgba(255,205,120,0.18)_38%,transparent_70%)]"
            />

            {/* 2. Gentle golden warmth across the scene */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0
  bg-gradient-to-tr from-[#6b4528]/20 via-amber-100/5 to-transparent"
            />

            {/* 3. Soft left-side scrim for text readability */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0
  bg-gradient-to-r from-[#1c140e]/45 via-[#1c140e]/20 to-transparent"
            />

            {/* 4. Subtle bottom shading for footer icons */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0
  bg-gradient-to-t from-[#18110b]/30 via-[#18110b]/5 to-transparent"
            />
            {/* Content */}
            <div className="mx-auto flex min-h-[90svh] max-w-[1440px] flex-col justify-end px-6 pb-10 pt-28 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
                <div className="max-w-[760px]">
                    {/* Morning Pill Badge */}
                    <div className="mb-4 sm:mb-5">
                        <div className="reveal-eyebrow invisible inline-flex items-center gap-2.5 rounded-full bg-black/30 backdrop-blur-md px-4 py-1.5 border border-white/20 text-white shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">
                                Canberra · Good Morning · Open from 7 AM
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden pb-4">
                        <div className="reveal-heading relative invisible">
                            {/* 3D extrusion layer (behind) */}
                            <h1
                                aria-hidden="true"
                                className="max-w-[760px] font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.84] tracking-[-0.045em] text-[#8b6914]"
                                style={{
                                    textShadow: `
                                        0 1px 0 #7a5c10,
                                        0 2px 0 #6b500d,
                                        0 3px 0 #5c440a,
                                        0 4px 0 #4d3808,
                                        0 5px 0 #3e2d06,
                                        0 6px 0 #2f2204,
                                        0 7px 0 #201802,
                                        0 8px 12px rgba(0,0,0,0.5),
                                        0 8px 25px rgba(0,0,0,0.3)
                                    `,
                                }}
                            >
                                Golden
                                <br />
                                Moment
                            </h1>
                            {/* Shiny metallic face layer (front) */}
                            <h1
                                className="max-w-[760px] font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.84] tracking-[-0.045em] absolute inset-0 drop-shadow-lg"
                                style={{
                                    background: "linear-gradient(170deg, #fef4c0 0%, #f0d56c 18%, #d4a833 35%, #b8860b 50%, #d4a833 62%, #f0d56c 78%, #fef4c0 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Golden
                                <br />
                                Moment
                            </h1>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                        <p className="reveal-text invisible max-w-[460px] font-sans text-base leading-[1.7] text-white/95 sm:text-[17px] drop-shadow-sm font-medium">
                            Fresh artisan coffee, sourdough brunch, handcrafted burgers & curries — served daily from 7 AM in the heart of Canberra.
                        </p>

                        <p className="reveal-text invisible mt-5 font-signature text-[clamp(2rem,3.8vw,2.8rem)] text-amber-300 drop-shadow-md sm:mt-6 -rotate-2 origin-left">
                            come, stay awhile
                        </p>

                        <div className="mt-7 flex flex-col gap-3.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-5">
                            {/* High-visibility golden order button */}
                            <a
                                href="#menu"
                                className="reveal-text invisible group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-[#1a1410] shadow-[0_10px_30px_rgba(245,158,11,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_40px_rgba(245,158,11,0.65)] active:scale-95"
                            >
                                <span>Explore Menu & Order</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>

                            <a
                                href="#contact"
                                className="reveal-text invisible group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/25 backdrop-blur-md px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white/20 hover:border-white/60 active:scale-95"
                            >
                                <span>Reserve a Table</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Utility footer — address + hours */}
                <div className="reveal-footer invisible mt-10 flex flex-col gap-3 border-t border-white/20 pt-4 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 label-micro text-white/75 drop-shadow-sm">
                        <svg className="w-4 h-4 shrink-0 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{CONTACT.address.short}</span>
                    </div>
                    <div className="flex items-center gap-2 label-micro text-white/75 drop-shadow-sm">
                        <svg className="w-4 h-4 shrink-0 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        <span>Open Daily · {HOURS_SUMMARY}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}