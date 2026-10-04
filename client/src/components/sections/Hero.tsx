"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
            className="relative isolate min-h-[85svh] overflow-hidden bg-background-dark text-text-inverse"
        >
            {/* Hero image */}
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

            {/* Warm cinematic treatment */}
            <div className="absolute inset-0 -z-10 bg-black/20" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

            {/* Content */}
            <div className="mx-auto flex min-h-[85svh] max-w-[1440px] flex-col justify-end px-6 pb-10 pt-24 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
                <div className="max-w-[760px]">
                    <div className="mb-5 overflow-hidden sm:mb-6">
                        <span className="reveal-eyebrow invisible block label-mini text-white/75">
                            Canberra · Australia
                        </span>
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
                                className="max-w-[760px] font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.84] tracking-[-0.045em] absolute inset-0"
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

                    <div className="mt-7 sm:mt-8">
                        <p className="reveal-text invisible max-w-[440px] font-sans text-base leading-[1.7] text-white/80 sm:text-[17px]">
                            Breakfast, burgers, curries and great coffee — served
                            daily from 7 AM in the heart of Canberra.
                        </p>

                        <p className="reveal-text invisible mt-6 font-signature text-[clamp(1.8rem,3.5vw,2.5rem)] text-accent/90 sm:mt-8">
                            come, stay awhile
                        </p>

                        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-8">
                            <a
                                href="#menu"
                                className="reveal-text invisible group relative inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 label-micro text-white transition-colors duration-300 hover:border-white"
                            >
                                <span className="absolute -inset-x-4 -inset-y-4" aria-hidden="true" />
                                <span>Explore the menu</span>
                                <span
                                    aria-hidden="true"
                                    className="inline-block animate-arrow-bounce"
                                >
                                    <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </a>

                            <a
                                href="#contact"
                                className="reveal-text invisible group relative inline-flex w-fit items-center gap-3 pb-2 label-micro text-white/60 transition-colors duration-300 hover:text-white"
                            >
                                <span className="absolute -inset-x-4 -inset-y-4" aria-hidden="true" />
                                <span>Reserve a table</span>
                                <span
                                    aria-hidden="true"
                                    className="inline-block transition-transform group-hover:translate-x-1 text-accent"
                                >
                                    <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Utility footer — address + hours */}
                <div className="reveal-footer invisible mt-8 flex flex-col gap-3 border-t border-white/20 pt-4 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 label-micro text-white/55">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Shop 4/14 Moore St, Canberra</span>
                    </div>
                    <div className="flex items-center gap-2 label-micro text-white/55">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        <span>Open Daily · 7:00 AM – 4:00 PM</span>
                    </div>
                </div>
            </div>
        </section>
    );
}