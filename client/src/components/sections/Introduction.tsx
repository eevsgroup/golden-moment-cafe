"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            gsap.set(
                ".intro-eyebrow, .intro-headline-line, .intro-body, .intro-script, .intro-image, .intro-caption",
                { opacity: 1, y: 0, clipPath: "none" }
            );
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                once: true,
            },
            defaults: { ease: "power3.out" },
        });

        // 1 — Image reveals first (sets the scene)
        tl.fromTo(
            ".intro-image",
            { clipPath: "inset(100% 0 0 0)" },
            {
                clipPath: "inset(0% 0 0 0)",
                duration: 1.4,
                ease: "power4.inOut",
            },
            0
        );

        // 2 — Eyebrow
        tl.fromTo(
            ".intro-eyebrow",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.4
        );

        // 3 — Headline lines (masked reveal)
        tl.fromTo(
            ".intro-headline-line",
            { y: "100%" },
            { y: "0%", duration: 1.1, stagger: 0.1 },
            0.55
        );

        // 4 — Body copy
        tl.fromTo(
            ".intro-body",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1 },
            0.9
        );

        // 5 — Handwritten accent
        tl.fromTo(
            ".intro-script",
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9 },
            1.15
        );

        // 6 — Image caption
        tl.fromTo(
            ".intro-caption",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1 },
            1.3
        );
    }, { scope: sectionRef });

    return (
        <section
            id="introduction"
            ref={sectionRef}
            aria-label="About Golden Moment"
            className="bg-background section-padding overflow-hidden"
        >
            <div className="content-container">
                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-10 xl:gap-16">

                    {/* ── Text Column ── */}
                    <div className="lg:col-span-6 lg:pr-12 xl:pr-20">
                        {/* Eyebrow */}
                        <span className="intro-eyebrow invisible eyebrow block text-text-muted">
                            The Restaurant
                        </span>

                        {/* Headline — each line wrapped for mask reveal */}
                        <h2 className="mt-8 sm:mt-10 lg:mt-12">
                            <span className="block overflow-hidden pb-1">
                                <span className="intro-headline-line block font-serif text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.08] tracking-[-0.025em] text-text">
                                    For good food,
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-1">
                                <span className="intro-headline-line block font-serif text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.08] tracking-[-0.025em] text-text">
                                    long tables,
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-1">
                                <span className="intro-headline-line block font-serif text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.08] tracking-[-0.025em] text-text">
                                    and golden moments.
                                </span>
                            </span>
                        </h2>

                        {/* Body */}
                        <p className="intro-body invisible mt-8 max-w-[480px] font-sans text-[15px] leading-[1.8] text-text-secondary sm:mt-10 sm:text-base">
                            Golden Moment is a contemporary restaurant in Canberra,
                            bringing together seasonal cooking, thoughtful hospitality,
                            and the simple pleasure of sharing a table.
                        </p>

                        {/* Script accent */}
                        <p className="intro-script invisible mt-8 font-signature text-[clamp(1.5rem,3vw,2.125rem)] text-accent sm:mt-10">
                            come, stay awhile
                        </p>
                    </div>

                    {/* ── Image Column ── */}
                    <div className="lg:col-span-6">
                        <div className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:max-w-none">
                            <div className="intro-image relative aspect-[4/4] w-full overflow-hidden">
                                <Image
                                    src="/images/intro-dining.jpg"
                                    alt="A beautifully set table at Golden Moment — seasonal food, natural linen, warm daylight"
                                    fill
                                    sizes="(max-width: 1024px) 85vw, 38vw"
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Caption */}
                            <div className="intro-caption invisible mt-5 flex items-center justify-between border-t border-border pt-4 label-micro text-text-muted">
                                <span>Canberra · ACT</span>
                                <span>Est. 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
