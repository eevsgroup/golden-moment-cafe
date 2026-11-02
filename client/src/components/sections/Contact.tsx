"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    ChatCircleDotsIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    Star,
} from "@phosphor-icons/react";

import { CONTACT } from "@/lib/data/contact";
import { SECTION_CONTENT } from "@/lib/data/sections";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OPENING_HOURS = [
    {
        label: "Mon – Fri",
        value: "7:00 AM – 3:30 PM",
    },
    {
        label: "Sat & Sun",
        value: "7:00 AM – 2:30 PM",
    },
];

const PRIMARY_BUTTON =
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.13em] text-white shadow-sm transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-espresso motion-reduce:transition-none";

const SECONDARY_BUTTON =
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/30 bg-white/[0.04] px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.13em] text-cream transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/65 hover:bg-white/[0.1] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-espresso motion-reduce:transition-none";

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const elements = gsap.utils.toArray<HTMLElement>(
                "[data-contact-reveal]",
                section
            );

            if (!elements.length) return;

            // Keep the content immediately visible for reduced-motion users.
            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }

            gsap.fromTo(
                elements,
                {
                    autoAlpha: 0,
                    y: 20,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.75,
                    stagger: 0.09,
                    ease: "power3.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        once: true,
                    },
                }
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
            id="contact"
            ref={sectionRef}
            aria-labelledby="contact-heading"
            className="relative overflow-hidden bg-cream pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 text-espresso"
        >
            <div className="content-container">

                {/* ─────────────────────────────
                    SECTION HEADING
                ───────────────────────────── */}
                <div className="mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-11">
                    <div>
                        <div
                            data-contact-reveal
                            className="mb-4 flex items-center gap-3"
                        >
                            <span
                                aria-hidden="true"
                                className="h-px w-9 bg-accent"
                            />

                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.19em] text-accent sm:text-[11px]">
                                Get in touch
                            </span>
                        </div>

                        <h2
                            id="contact-heading"
                            data-contact-reveal
                            className="font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] leading-[1.05] tracking-[-0.035em] text-espresso"
                        >
                            Come visit us
                            <span className="italic text-accent">
                                .
                            </span>
                        </h2>

                        <p
                            data-contact-reveal
                            className="section-lead mt-4"
                        >
                            {SECTION_CONTENT.contact.description}
                        </p>
                    </div>

                    {/* Google review */}
                    <div
                        data-contact-reveal
                        className="flex items-center gap-3 self-start border-t border-espresso/15 pt-4 sm:self-auto sm:border-t-0 sm:pt-0"
                    >
                        <svg
                            viewBox="0 0 48 48"
                            className="h-7 w-7 shrink-0"
                            role="img"
                            aria-label="Google"
                        >
                            <path
                                fill="#4285F4"
                                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.7c3.9-3.6 6-8.8 6-14.9Z"
                            />
                            <path
                                fill="#34A853"
                                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20.4 20.4 0 0 0 24 44Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M12.8 27.9a12.3 12.3 0 0 1 0-7.8v-5.2H5.9a20.3 20.3 0 0 0 0 18.2l6.9-5.2Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M24 12.2c3 0 5.7 1 7.8 3l5.8-5.8A19.5 19.5 0 0 0 24 4a20.4 20.4 0 0 0-18.1 10.9l6.9 5.2c1.6-4.6 6-7.9 11.2-7.9Z"
                            />
                        </svg>

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-serif text-xl text-espresso">
                                    5.0
                                </span>

                                <div
                                    className="flex gap-0.5 text-gold"
                                    aria-label="Five out of five stars"
                                >
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <Star
                                                key={index}
                                                size={12}
                                                weight="fill"
                                                aria-hidden="true"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <a
                                href={CONTACT.googleReviewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-espresso"
                            >
                                Google reviews

                                <ArrowUpRightIcon
                                    size={13}
                                    weight="regular"
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ─────────────────────────────
                    MAIN CONTACT COMPOSITION
                ───────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">

                    {/* DARK INFORMATION PANEL */}
                    <div
                        data-contact-reveal
                        className="flex flex-col bg-espresso p-6 text-cream sm:p-8 lg:p-9"
                    >
                        {/* Location */}
                        <div>
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                                Find us
                            </span>

                            <div className="mt-4 flex items-start gap-3">
                                <MapPinIcon
                                    size={21}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="mt-1 shrink-0 text-gold-light"
                                />

                                <address className="font-serif text-lg not-italic leading-[1.55] text-white sm:text-xl">
                                    {CONTACT.address.street}
                                    <br />
                                    {CONTACT.address.locality}{" "}
                                    {CONTACT.address.region}{" "}
                                    {CONTACT.address.postalCode}
                                    <br />
                                    Australia
                                </address>
                            </div>
                        </div>

                        {/* Opening hours */}
                        <div className="mt-7 border-t border-white/15 pt-6">
                            <div className="flex items-center gap-3">
                                <ClockIcon
                                    size={20}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="text-gold-light"
                                />

                                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-white/60">
                                    Opening hours
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                {OPENING_HOURS.map((hour) => (
                                    <div
                                        key={hour.label}
                                        className="flex flex-wrap items-center justify-between gap-3"
                                    >
                                        <span className="font-serif text-lg text-white">
                                            {hour.label}
                                        </span>

                                        <span className="font-sans text-sm text-white/80">
                                            {hour.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="mt-7 border-t border-white/15 pt-6">
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-white/60">
                                Talk to us
                            </span>

                            <a
                                href={`tel:${CONTACT.phone}`}
                                className="group mt-4 flex w-fit items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                            >
                                <PhoneIcon
                                    size={18}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="shrink-0 text-gold-light"
                                />

                                <span className="font-serif text-lg text-white transition-colors duration-200 group-hover:text-gold-light">
                                    {CONTACT.phoneDisplay}
                                </span>

                                <ArrowUpRightIcon
                                    size={15}
                                    aria-hidden="true"
                                    className="text-white/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row lg:flex-col xl:flex-row">

                            {/* Primary action */}
                            <a
                                href={CONTACT.googleMapsDirections}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={PRIMARY_BUTTON}
                            >
                                <span>Get directions</span>

                                <ArrowUpRightIcon
                                    size={17}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>

                            {/* Secondary action */}
                            <a
                                href={CONTACT.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={SECONDARY_BUTTON}
                            >
                                <ChatCircleDotsIcon
                                    size={18}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />

                                <span>WhatsApp us</span>

                                <ArrowUpRightIcon
                                    size={15}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </div>

                        {/* Brand signature */}
                        <p className="mt-7 font-signature text-[1.8rem] leading-tight text-gold-light">
                            Come, stay awhile.
                        </p>
                    </div>

                    {/* MAP PANEL */}
                    <div
                        data-contact-reveal
                        className="flex min-h-[370px] flex-col border border-espresso/10 bg-bone p-2 sm:min-h-[430px] lg:min-h-[490px]"
                    >
                        {/* Map header */}
                        <div className="flex items-center justify-between gap-4 px-3 py-3 sm:px-4">
                            <div>
                                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-accent">
                                    Golden Moment
                                </span>

                                <p className="mt-1 font-serif text-xl text-espresso">
                                    Visit us in Canberra
                                </p>
                            </div>

                            <a
                                href={CONTACT.googleMapsDirections}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open directions to Golden Moment in Google Maps"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-espresso/15 bg-white/70 text-espresso transition-[transform,background-color,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none"
                            >
                                <ArrowUpRightIcon
                                    size={19}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </div>

                        {/* Embedded map */}
                        <div className="relative min-h-[320px] flex-1 overflow-hidden bg-bone sm:min-h-[370px]">
                            <iframe
                                src={CONTACT.googleMapsEmbed}
                                title="Map showing Golden Moment Café and Restaurant in Canberra"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 h-full w-full"
                            />
                        </div>

                        {/* Map footer */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-warm-gray">
                                Canberra · ACT
                            </span>

                            <a
                                href={CONTACT.googleMapsDirections}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-espresso"
                            >
                                Open in Maps

                                <ArrowRightIcon
                                    size={14}
                                    weight="regular"
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}