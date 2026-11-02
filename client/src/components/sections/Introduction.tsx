
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION_CONTENT } from "@/lib/data/sections";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Introduction() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            // Query only inside this section to avoid affecting
            // similarly named elements elsewhere on the page.
            const imageFrame =
                section.querySelector<HTMLElement>(".intro-image");

            const image =
                section.querySelector<HTMLElement>(".intro-photo");

            const eyebrow =
                section.querySelector<HTMLElement>(".intro-eyebrow");

            const headlineLines = Array.from(
                section.querySelectorAll<HTMLElement>(
                    ".intro-headline-line"
                )
            );

            const body =
                section.querySelector<HTMLElement>(".intro-body");

            const script =
                section.querySelector<HTMLElement>(".intro-script");

            const caption =
                section.querySelector<HTMLElement>(".intro-caption");

            if (
                !imageFrame ||
                !image ||
                !eyebrow ||
                !body ||
                !script ||
                !caption ||
                headlineLines.length === 0
            ) {
                return;
            }

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            const animatedElements = [
                imageFrame,
                image,
                eyebrow,
                ...headlineLines,
                body,
                script,
                caption,
            ];

            // Keep everything visible when reduced motion is enabled.
            if (prefersReducedMotion) {
                gsap.set(animatedElements, {
                    autoAlpha: 1,
                    clearProps: "transform,clipPath",
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 72%",
                    once: true,
                },
                defaults: {
                    ease: "power3.out",
                },
            });

            // 1. Reveal the photograph.
            timeline
                .fromTo(
                    imageFrame,
                    {
                        clipPath: "inset(100% 0% 0% 0%)",
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.3,
                        ease: "power4.inOut",
                    },
                    0
                )
                .fromTo(
                    image,
                    {
                        scale: 1.08,
                    },
                    {
                        scale: 1,
                        duration: 1.7,
                        ease: "power2.out",
                    },
                    0
                );

            // 2. Eyebrow.
            timeline.fromTo(
                eyebrow,
                {
                    autoAlpha: 0,
                    y: 14,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    clearProps: "transform",
                },
                0.35
            );

            // 3. Headline lines.
            timeline.fromTo(
                headlineLines,
                {
                    autoAlpha: 0,
                    yPercent: 105,
                },
                {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.95,
                    stagger: 0.12,
                    clearProps: "transform",
                },
                0.35
            );

            // 4. Supporting description.
            timeline.fromTo(
                body,
                {
                    autoAlpha: 0,
                    y: 18,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    clearProps: "transform",
                },
                0.8
            );

            // 5. Handwritten brand accent.
            timeline.fromTo(
                script,
                {
                    autoAlpha: 0,
                    y: 12,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    clearProps: "transform",
                },
                1
            );

            // 6. Image caption.
            timeline.fromTo(
                caption,
                {
                    autoAlpha: 0,
                    y: 8,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    clearProps: "transform",
                },
                1.05
            );
        },
        {
            scope: sectionRef,
            dependencies: [],
            revertOnUpdate: true,
        }
    );

    return (
        <section
            id="introduction"
            ref={sectionRef}
            aria-label="About Golden Moment"
            className="relative overflow-hidden bg-background pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-14 lg:pb-16"
        >
            <div className="content-container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">

                    {/* Text column */}
                    <div className="lg:col-span-6 lg:pr-8 xl:pr-14">
                        {/* Section eyebrow */}
                        <div className="intro-eyebrow inline-flex items-center gap-3 eyebrow text-text-muted">
                            <span
                                aria-hidden="true"
                                className="h-px w-9 bg-accent"
                            />
                            <span>The Restaurant</span>
                        </div>

                        {/* Editorial headline */}
                        <h2 className="mt-8 sm:mt-10 lg:mt-12 font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] leading-[1.05] tracking-[-0.035em] text-text">
                            <span className="block overflow-hidden pb-1">
                                <span className="intro-headline-line block">
                                    For good food,
                                </span>
                            </span>

                            <span className="block overflow-hidden pb-1">
                                <span className="intro-headline-line block">
                                    long tables,
                                </span>
                            </span>

                            <span className="block overflow-hidden pb-1">
                                <span className="intro-headline-line block text-accent">
                                    and golden moments.
                                </span>
                            </span>
                        </h2>

                        {/* Restaurant introduction */}
                        <p className="intro-body section-lead mt-8 sm:mt-9">
                            {SECTION_CONTENT.introduction.description}
                        </p>

                        {/* Handwritten brand signature */}
                        <p className="intro-script mt-8 font-signature text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-accent sm:mt-10">
                            {SECTION_CONTENT.introduction.script}
                        </p>
                    </div>

                    {/* Image column */}
                    <div className="lg:col-span-6">
                        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto lg:mr-0 lg:max-w-none">

                            {/* Image frame */}
                            <div className="intro-image relative aspect-[4/4] w-full overflow-hidden bg-bone">
                                <Image
                                    src="/images/intro-dining.jpg"
                                    alt="A beautifully set dining table at Golden Moment Café"
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 46vw"
                                    className="intro-photo object-cover object-center"
                                />
                            </div>

                            {/* Editorial image caption */}
                            <div className="intro-caption mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.17em] text-text-muted sm:text-xs">
                                    Canberra · ACT
                                </span>

                                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.17em] text-text-muted sm:text-xs">
                                    Est. 2026
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}