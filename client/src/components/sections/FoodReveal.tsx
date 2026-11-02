"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FoodRevealProps = {
    children: ReactNode;
};

export default function FoodReveal({ children }: FoodRevealProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const select = gsap.utils.selector(section);
            const all = select(".food-anim");

            if (!all.length) return;

            // No hidden CSS is required. If JavaScript is unavailable,
            // the server-rendered content remains visible.
            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }

            const media = gsap.matchMedia();

            media.add(
                "(prefers-reduced-motion: no-preference)",
                () => {
                    let timeline: gsap.core.Timeline | undefined;
                    let fallback: gsap.core.Tween | undefined;

                    try {
                        const header = select(".food-header");
                        const mainImage = select(".food-main-img");
                        const rail = select(".food-rail");
                        const eyebrow = select(".food-eyebrow");
                        const headline = select(".food-headline-line");
                        const body = select(".food-body");
                        const script = select(".food-script");
                        const cta = select(".food-cta");
                        const supportingImages = select(".food-support-img");
                        const meta = select(".food-meta");

                        // Set initial states before the reveal timeline begins.
                        gsap.set(all, {
                            autoAlpha: 0,
                        });

                        gsap.set(mainImage, {
                            y: 36,
                            clipPath: "inset(0 0 10% 0)",
                        });

                        gsap.set(headline, {
                            yPercent: 105,
                        });

                        gsap.set(eyebrow, {
                            y: 14,
                        });

                        gsap.set(body, {
                            y: 16,
                        });

                        gsap.set(script, {
                            y: 12,
                        });

                        gsap.set(cta, {
                            y: 12,
                        });

                        gsap.set(supportingImages, {
                            y: 28,
                        });

                        timeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: section,
                                start: "top 65%",
                                once: true,
                            },
                            defaults: {
                                ease: "power3.out",
                            },
                            onComplete: () => {
                                gsap.set(all, {
                                    clearProps: "transform,clipPath",
                                });
                            },
                        });

                        timeline
                            .to(
                                header,
                                {
                                    autoAlpha: 1,
                                    duration: 0.65,
                                },
                                0
                            )
                            .to(
                                mainImage,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    clipPath: "inset(0 0 0% 0)",
                                    duration: 1.2,
                                    ease: "power2.out",
                                },
                                0.05
                            )
                            .to(
                                rail,
                                {
                                    autoAlpha: 1,
                                    duration: 0.7,
                                },
                                0.3
                            )
                            .to(
                                eyebrow,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.65,
                                },
                                0.2
                            )
                            .to(
                                headline,
                                {
                                    autoAlpha: 1,
                                    yPercent: 0,
                                    duration: 0.9,
                                    stagger: 0.12,
                                    ease: "power4.out",
                                },
                                0.3
                            )
                            .to(
                                body,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.75,
                                },
                                0.7
                            )
                            .to(
                                script,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.75,
                                },
                                0.88
                            )
                            .to(
                                cta,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.65,
                                },
                                1
                            )
                            .to(
                                supportingImages,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.85,
                                    stagger: 0.13,
                                },
                                0.18
                            )
                            .to(
                                meta,
                                {
                                    autoAlpha: 1,
                                    duration: 0.65,
                                    stagger: 0.08,
                                }
                            );

                        // Fallback for unusual scroll restoration or layout timing.
                        fallback = gsap.delayedCall(2, () => {
                            const rect = section.getBoundingClientRect();

                            const isAlreadyInView =
                                rect.top < window.innerHeight * 0.65 &&
                                rect.bottom > 0;

                            if (
                                timeline &&
                                timeline.progress() === 0 &&
                                isAlreadyInView
                            ) {
                                timeline.play();
                            }
                        });
                    } catch (error) {
                        console.error(
                            "[FoodReveal] Animation initialization failed:",
                            error
                        );

                        timeline?.kill();

                        // Restore content if animation setup fails.
                        gsap.set(all, {
                            clearProps: "all",
                        });
                    }

                    return () => {
                        timeline?.kill();
                        fallback?.kill();
                    };
                }
            );

            return () => {
                media.revert();
            };
        },
        {
            scope: sectionRef,
            dependencies: [],
            revertOnUpdate: true,
        }
    );

    return (
        <section
            id="food"
            ref={sectionRef}
            aria-labelledby="food-heading"
            className="bg-background pt-12 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-12 overflow-hidden print:[&_.food-anim]:!visible print:[&_.food-anim]:!opacity-100"
        >
            {children}
        </section>
    );
}