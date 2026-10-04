"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Owns the <section> and the scroll reveal. Children are server-rendered markup
 * whose animated nodes carry `.food-anim` plus one specific class.
 *
 * Hidden-state strategy
 * ---------------------
 * - Before JS runs, `.food-anim` is `visibility: hidden` ONLY when the user has not
 *   asked for reduced motion (`motion-safe:`) and the reveal hasn't been armed yet
 *   (`:not([data-revealed])`). That removes the SSR flash on deep links.
 * - Once the timeline is built, GSAP's inline styles hold the hidden state and
 *   `data-revealed` is set, so the CSS gate steps aside.
 * - Reduced motion: the timeline never runs and nothing is ever hidden.
 * - Print always shows everything.
 * - Failsafe: if the trigger never fires but the section is on screen, play anyway.
 */
export default function FoodReveal({ children }: { children: ReactNode }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const q = gsap.utils.selector(section);
                const all = q(".food-anim");

                const reveal = () => {
                    section.dataset.revealed = "true";
                };

                try {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top 65%",
                            once: true,
                        },
                        defaults: { ease: "power3.out" },
                        onComplete: () => {
                            // Drop leftover transform / clip-path so they stop creating
                            // stacking contexts. Opacity/visibility are already at rest.
                            gsap.set(all, { clearProps: "transform,clipPath" });
                        },
                    });

                    tl.fromTo(q(".food-header"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 0)
                        .fromTo(
                            q(".food-main-img"),
                            { autoAlpha: 0, y: 45, clipPath: "inset(0 0 10% 0)" },
                            { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power2.out" },
                            0.1
                        )
                        .fromTo(q(".food-rail"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.4)
                        .fromTo(q(".food-eyebrow"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.2)
                        .fromTo(
                            q(".food-headline-line"),
                            { autoAlpha: 0, y: "105%" },
                            { autoAlpha: 1, y: "0%", duration: 0.95, stagger: 0.11, ease: "power4.out" },
                            0.3
                        )
                        .fromTo(q(".food-body"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.72)
                        .fromTo(q(".food-script"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.88)
                        .fromTo(q(".food-cta"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 1.02)
                        .fromTo(
                            q(".food-support-img"),
                            { autoAlpha: 0, y: 28 },
                            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14 },
                            0.2
                        )
                        .fromTo(q(".food-meta"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.75, stagger: 0.08 }, 1.08)
                        .fromTo(q(".food-signature"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.2);

                    // Inline hidden styles are in place now; the CSS gate can step aside.
                    reveal();

                    // Failsafe: trigger never fired (odd scroller/layout) but we're on screen.
                    gsap.delayedCall(5, () => {
                        if (tl.progress() === 0 && section.getBoundingClientRect().top < window.innerHeight) {
                            tl.play();
                        }
                    });
                } catch (err) {
                    // Never leave content hidden because of an animation error.
                    console.error("[Food] reveal failed, showing content", err);
                    gsap.set(all, { clearProps: "all" });
                    reveal();
                }
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="food"
            ref={sectionRef}
            aria-labelledby="food-heading"
            className="bg-background section-padding overflow-hidden motion-safe:[&:not([data-revealed])_.food-anim]:invisible print:[&_.food-anim]:!visible"
        >
            {children}
        </section>
    );
}