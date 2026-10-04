"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = sectionRef.current;
            if (!root) return;
            const q = gsap.utils.selector(root);

            const prefersReduced = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReduced) {
                gsap.set(q(".contact-anim"), { autoAlpha: 1, y: 0 });
                return;
            }

            gsap.fromTo(
                q(".contact-anim"),
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    stagger: 0.1,
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
            id="contact"
            ref={sectionRef}
            className="relative w-full bg-background overflow-hidden py-20 sm:py-28"
        >
            <div className="content-container">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column */}
                    <div>
                        {/* Eyebrow */}
                        <div className="contact-anim invisible flex items-center gap-4 mb-6">
                            <span className="w-8 h-px bg-accent"></span>
                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                                Get in touch
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="contact-anim invisible font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] text-text mb-4">
                            Let us <span className="italic text-accent">serve you.</span>
                        </h2>

                        {/* Subtitle */}
                        <p className="contact-anim invisible font-sans text-[15px] leading-[1.7] text-text-muted mb-10 max-w-[480px]">
                            We&apos;d love to hear from you. Visit us, give us a call, or send us a message on WhatsApp — we&apos;re here to help.
                        </p>

                        {/* Google Rating & Review Button */}
                        <div className="contact-anim invisible flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-border">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-[#FBBC05]" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="font-sans text-[12px] font-semibold text-text">5.0 on Google</span>
                            </div>
                            
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex w-max items-center justify-center overflow-hidden rounded-full border border-border px-6 py-2.5 transition-all duration-500 hover:border-transparent hover:shadow-lg"
                            >
                                {/* Slide-up background */}
                                <div className="absolute inset-0 translate-y-[101%] bg-accent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" />
                                
                                <span className="relative z-10 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-text transition-colors duration-500 group-hover:text-white">
                                    Leave a Review
                                </span>
                            </a>
                        </div>

                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Location Card */}
                            <div className="contact-anim rounded-2xl border border-border bg-white/60 p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </span>
                                    <span className="font-sans text-[12px] uppercase tracking-[0.15em] font-semibold text-accent">Location</span>
                                </div>
                                <p className="font-sans text-[14px] leading-[1.7] text-text mb-4">
                                    Shop 4/14 Moore St<br />
                                    Canberra ACT 2601<br />
                                    Australia
                                </p>
                                <a
                                    href="https://www.google.com/maps/dir//Shop+4%2F14+Moore+St,+Canberra+ACT+2601,+Australia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-accent hover:text-accent/80 transition-colors"
                                >
                                    Get directions
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>

                            {/* Hours Card */}
                            <div className="contact-anim rounded-2xl border border-border bg-white/60 p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                    </span>
                                    <span className="font-sans text-[12px] uppercase tracking-[0.15em] font-semibold text-accent">Hours</span>
                                </div>
                                <ul className="font-sans text-[13px] leading-[1.5] text-text flex flex-col gap-1.5">
                                    <li className="flex justify-between gap-4"><span className="font-medium">Monday</span> <span className="text-text-muted">7:00 AM – 2:30 PM</span></li>
                                    <li className="flex justify-between gap-4"><span className="font-medium">Tuesday</span> <span className="text-text-muted">6:00 AM – 4:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span className="font-medium">Wednesday</span> <span className="text-text-muted">6:00 AM – 4:30 PM</span></li>
                                    <li className="flex justify-between gap-4"><span className="font-medium">Thursday</span> <span className="text-text-muted">6:00 AM – 6:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span className="font-medium">Friday</span> <span className="text-text-muted">6:00 AM – 4:30 PM</span></li>
                                    <li className="flex justify-between gap-4"><span className="font-medium">Sat – Sun</span> <span className="text-text-muted">7:00 AM – 3:00 PM</span></li>
                                </ul>
                            </div>

                            {/* Call Us Card */}
                            <div className="contact-anim rounded-2xl border border-border bg-white/60 p-5 flex items-center gap-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 shrink-0">
                                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted block mb-0.5">Call us</span>
                                    <a
                                        href="tel:+61433056145"
                                        className="font-serif text-[1.1rem] text-text hover:text-accent transition-colors"
                                    >
                                        +61 433 056 145
                                    </a>
                                </div>
                            </div>

                            {/* WhatsApp Card */}
                            <div className="contact-anim rounded-2xl border border-border bg-white/60 p-5 flex items-center gap-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 shrink-0">
                                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                    </svg>
                                </span>
                                <div className="flex flex-col gap-1.5">
                                    <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">WhatsApp us</span>
                                    <a
                                        href="https://wa.me/61433056145"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-1.5 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm w-max"
                                    >
                                        <span className="font-sans text-[12px] font-semibold tracking-wide">Chat on WhatsApp</span>
                                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map */}
                    <div className="contact-anim invisible relative w-full h-[350px] lg:h-full lg:min-h-[480px] rounded-3xl overflow-hidden bg-bone shadow-md border border-border">
                        <iframe
                            src="https://maps.google.com/maps?q=Shop%204%2F14%20Moore%20St%2C%20Canberra%20ACT%202601%2C%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
