"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ListIcon, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#food" },
    { label: "Catering", href: "#catering" },
    { label: "Visit", href: "#contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 32);
        }

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    function closeMenu() {
        setOpen(false);
    }

    const navLinkClassName =
        "group relative whitespace-nowrap py-2 text-[13px] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light";

    const orderButtonClassName =
        "inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-white/20 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light";

    const reserveButtonClassName =
        "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-espresso transition-colors duration-300 hover:bg-gold-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light";

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
            <nav
                aria-label="Main navigation"
                className={[
                    "mx-auto flex max-w-[1440px] items-center justify-between gap-3 rounded-full border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out sm:px-6",
                    isScrolled
                        ? "min-h-[62px] border-white/[0.09] bg-espresso/95 py-2 shadow-[0_8px_36px_rgba(0,0,0,0.20)] backdrop-blur-2xl sm:min-h-[68px]"
                        : "min-h-[66px] border-white/[0.14] bg-espresso/55 py-2 backdrop-blur-xl sm:min-h-[72px]",
                ].join(" ")}
            >
                {/* Brand */}
                <Link
                    href="/"
                    aria-label="Golden Moment Café home"
                    onClick={closeMenu}
                    className="group flex min-w-0 shrink items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:gap-3"
                >
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-cream sm:size-11">
                        <Image
                            src="/logo/logo-cafe.jpeg"
                            alt="Golden Moment Café"
                            fill
                            priority
                            sizes="44px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </span>

                    <span className="min-w-0">
                        <span className="block whitespace-nowrap font-display text-[1.2rem] leading-none tracking-[-0.045em] text-cream sm:text-[1.55rem]">
                            Golden Moment
                        </span>
                        <span className="mt-1 hidden text-[8px] font-medium uppercase tracking-[0.24em] text-white/45 sm:block">
                            Café · Canberra
                        </span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-5 lg:flex xl:gap-7">
                    <div className="flex items-center gap-5 xl:gap-7">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={navLinkClassName}
                            >
                                {item.label}
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
                                />
                            </a>
                        ))}
                    </div>

                    <span
                        aria-hidden="true"
                        className="h-6 w-px bg-white/15"
                    />

                    <a href="#menu" className={orderButtonClassName}>
                        Order Online
                    </a>

                    <a href="#contact" className={reserveButtonClassName}>
                        Reserve a Table
                        <ArrowUpRightIcon
                            size={14}
                            weight="regular"
                            aria-hidden="true"
                        />
                    </a>
                </div>

                {/* Mobile controls */}
                <div className="flex shrink-0 items-center gap-2 lg:hidden">
                    <a
                        href="#menu"
                        onClick={closeMenu}
                        className="inline-flex h-9 items-center justify-center rounded-full border border-white/25 px-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:h-10 sm:px-4 sm:text-[10px]"
                    >
                        Order
                    </a>

                    <button
                        type="button"
                        onClick={() => setOpen((current) => !current)}
                        aria-label={
                            open
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={open}
                        aria-controls="mobile-navigation"
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:size-10"
                    >
                        {open ? (
                            <X
                                size={20}
                                weight="regular"
                                aria-hidden="true"
                            />
                        ) : (
                            <ListIcon
                                size={20}
                                weight="regular"
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile navigation */}
            <div
                id="mobile-navigation"
                aria-label="Mobile navigation"
                aria-hidden={!open}
                className={[
                    "mx-auto mt-2 max-w-[1440px] overflow-hidden rounded-2xl border border-white/10 bg-espresso/[0.98] text-white shadow-[0_20px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out lg:hidden",
                    open
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0",
                ].join(" ")}
                style={{ pointerEvents: open ? "auto" : "none" }}
            >
                <div className="p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                            Explore Golden Moment
                        </p>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-gold">
                            Canberra
                        </span>
                    </div>

                    <div className="flex flex-col">
                        {navItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                tabIndex={open ? 0 : -1}
                                onClick={closeMenu}
                                className={[
                                    "flex min-h-[52px] items-center justify-between gap-4 py-3 text-sm text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
                                    index !== navItems.length - 1
                                        ? "border-b border-white/[0.09]"
                                        : "",
                                ].join(" ")}
                            >
                                <span>{item.label}</span>
                                <ArrowUpRightIcon
                                    size={17}
                                    weight="regular"
                                    className="shrink-0 text-gold"
                                    aria-hidden="true"
                                />
                            </a>
                        ))}
                    </div>

                    <a
                        href="#contact"
                        tabIndex={open ? 0 : -1}
                        onClick={closeMenu}
                        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-espresso transition-colors duration-300 hover:bg-gold-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                    >
                        Reserve a Table
                        <ArrowUpRightIcon
                            size={15}
                            weight="regular"
                            aria-hidden="true"
                        />
                    </a>
                </div>
            </div>
        </header>
    );
}