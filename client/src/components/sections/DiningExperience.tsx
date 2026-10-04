"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import GMDivider from "@/components/ui/GMDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function DiningExperience() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const q = gsap.utils.selector(sectionRef);
            const prefersReduced = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReduced) {
                gsap.set([...q(".anim-img"), ...q(".anim-fade"), ...q(".anim-line")], {
                    autoAlpha: 1, y: 0, clipPath: "none",
                });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 68%",
                    once: true,
                },
                defaults: { ease: "power3.out" },
            });

            tl.fromTo(
                q(".anim-img"),
                { clipPath: "inset(4%)", autoAlpha: 0, scale: 1.04 },
                { clipPath: "inset(0%)", autoAlpha: 1, scale: 1, duration: 1.4, stagger: 0.2, ease: "power2.out" }
            )
            .fromTo(
                q(".anim-line"),
                { y: "120%" },
                { y: "0%", duration: 1, stagger: 0.12, ease: "power4.out" },
                "-=0.9"
            )
            .fromTo(
                q(".anim-fade"),
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
                "-=0.5"
            );

            gsap.fromTo(q(".ken-burns"), { scale: 1 }, {
                scale: 1.06, ease: "none",
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
            });

            gsap.to(q(".float-img"), {
                y: -25, ease: "none",
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="experience"
            aria-labelledby="experience-heading"
            className="relative w-full overflow-hidden bg-[#1a1512]"
        >
            {/* Film grain */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundSize: "128px 128px",
                }}
            />

            {/* ════ MAIN LAYOUT CONTAINER ════ */}
            <div className="relative z-[2] flex flex-col lg:flex-row lg:min-h-[640px]">

                {/* ── LEFT: Landscape Image (50%) ── */}
                <div className="relative w-full lg:w-1/2 min-h-[400px] sm:min-h-[460px] lg:min-h-full overflow-hidden">
                    <div className="anim-img invisible absolute inset-0">
                        <Image
                            src="/images/place.png"
                            alt="Canberra landscape at golden hour"
                            fill
                            sizes="(max-width: 1023px) 100vw, 55vw"
                            className="ken-burns object-cover object-center"
                        />
                        {/* Smooth, subtle gradients */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1512]/40 via-[#1a1512]/0 to-[#1a1512]/0" />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a1512]/20 via-[#1a1512]/0 to-[#1a1512]/0" />
                        
                        {/* No right edge gradient: the design uses a sharp, crisp line here */}
                    </div>

                    {/* Overlays on landscape */}
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[400px] sm:min-h-[460px] lg:min-h-[640px] p-7 sm:p-10">
                        {/* Top: GOLDEN MOMENT */}
                        <div className="anim-fade invisible">
                            <span className="label-micro tracking-[0.25em] text-white/55">
                                Golden Moment
                            </span>
                        </div>
                        {/* Bottom: SEASONAL · LOCAL · SHARED */}
                        <div className="anim-fade invisible flex items-center gap-4">
                            <span className="label-micro text-white/45">Seasonal</span>
                            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/25" />
                            <span className="label-micro text-white/45">Local</span>
                            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/25" />
                            <span className="label-micro text-white/45">Shared</span>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Dark Editorial Panel (50%) ── */}
                <div className="w-full lg:w-1/2 flex items-center bg-[#1a1512]">
                    {/* Notice the large lg:pl-[140px] to make room for the floating image */}
                    <div className="w-full px-8 py-14 sm:px-12 sm:py-18 lg:pl-[140px] lg:pr-12 lg:py-16 xl:pl-[160px] xl:pr-16">
                        <div className="max-w-[480px] mx-auto lg:mx-0">

                            {/* Eyebrow */}
                            <div className="anim-fade invisible flex items-center gap-4 mb-8">
                                <span className="w-7 h-px bg-[#c4956a]/50" />
                                <span className="label-micro text-[#c4956a] tracking-[0.2em]">
                                    The Experience
                                </span>
                            </div>

                            {/* Headline */}
                            <h2 id="experience-heading" className="mb-7">
                                <span className="block overflow-hidden pb-1">
                                    <span className="anim-line block font-serif text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[#f4efe6]">
                                        Stay for
                                    </span>
                                </span>
                                <span className="block overflow-hidden pb-1">
                                    <span className="anim-line block font-serif text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[#f4efe6]">
                                        the moment.
                                    </span>
                                </span>
                            </h2>

                            {/* Body */}
                            <p className="anim-fade invisible font-sans text-[14px] sm:text-[14.5px] leading-[1.85] text-[#c9b89f]/70">
                                Relaxed in Canberra, Golden Moment is more than
                                a café — it&apos;s a place to slow down, connect and
                                savour the simple things. Great coffee, seasonal food
                                and a warm, welcoming space, right in the heart
                                of our city.
                            </p>

                            {/* Handwritten signature */}
                            <p
                                className="anim-fade invisible mt-8 text-[1.4rem] sm:text-[1.6rem] text-[#c4956a] -rotate-[2deg] origin-left"
                                style={{ fontFamily: 'var(--font-signature, "Segoe Print", "Bradley Hand", cursive)' }}
                            >
                                made here, enjoyed slowly.
                            </p>

                            {/* CTA Button — solid gold pill */}
                            <Link
                                href="#visit"
                                className="anim-fade invisible group inline-flex items-center gap-3 mt-10 bg-[#c4956a] text-[#1a1512] rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-[#d4a87a] hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">
                                    Our Place
                                </span>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── FLOATING INTERIOR IMAGE (positioned on the parent, not clipped) ── */}
                <div
                    className="anim-img invisible float-img hidden lg:block absolute z-30"
                    style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "clamp(180px, 16vw, 240px)",
                    }}
                >
                    <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/80">
                        <Image
                            src="/images/intro-dining.jpg"
                            alt="Inside Golden Moment — warm dining atmosphere"
                            fill
                            sizes="240px"
                            className="object-cover"
                        />
                    </div>
                    <div className="mt-3 text-center bg-[#1a1512]/90 backdrop-blur-sm py-2.5 px-3 rounded-xl border border-white/10 shadow-lg mx-auto w-max">
                        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#f4efe6]/90 font-semibold drop-shadow-sm">
                            Inside Golden Moment
                        </p>
                        <p className="font-sans text-[10px] text-[#c9b89f]/80 mt-1 drop-shadow-sm">
                            Canberra · Est. 2024
                        </p>
                    </div>
                </div>

                {/* ── Vertical "01 / 03" label ── */}
                <div
                    className="anim-fade invisible hidden lg:block absolute z-30 left-4 top-1/2 -translate-y-1/2"
                >
                    <span
                        className="label-micro text-white/30 tracking-[0.2em] text-[10px]"
                        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                    >
                        01 / 03
                    </span>
                </div>
            </div>

            {/* ── Bottom GM Divider ── */}
            <GMDivider variant="dark" className="relative z-[2]" />
        </section>
    );
}