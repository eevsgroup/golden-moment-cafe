
"use client";

import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#food" },
    { label: "Catering", href: "#catering" },
    { label: "Visit", href: "#contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

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

    const signInButtonClassName =
        "inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-white/20 px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-text-inverse transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream";

    const reserveButtonClassName =
        "inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-terracotta px-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream";

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex min-h-[64px] max-w-[1440px] items-center justify-between gap-3 rounded-pill border border-white/15 bg-espresso/95 px-4 py-3 text-text-inverse shadow-deep backdrop-blur-2xl sm:min-h-[72px] sm:px-6"
            >
                {/* Brand */}
                <Link
                    href="/"
                    aria-label="Golden Moment home"
                    className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
                    onClick={closeMenu}
                >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 sm:h-11 sm:w-11">
                        <Image
                            src="/logo/logo-cafe.jpeg"
                            alt="Golden Moment Café logo"
                            fill
                            priority
                            sizes="44px"
                            className="object-cover"
                        />
                    </span>

                    <span className="font-display whitespace-nowrap text-[1.25rem] leading-none tracking-[-0.035em] sm:text-2xl">
                        Golden Moment
                    </span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-6 lg:flex xl:gap-8">
                    <div className="flex items-center gap-5 xl:gap-7">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-white/70 transition-colors duration-200 hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <span
                        aria-hidden="true"
                        className="h-6 w-px bg-white/15"
                    />

                    <a
                        href="#menu"
                        className={signInButtonClassName}
                    >
                        Order Online
                    </a>

                    <a href="#contact" className={reserveButtonClassName}>
                        Reserve a Table
                    </a>
                </div>

                {/* Mobile controls */}
                <div className="flex shrink-0 items-center gap-2 lg:hidden">
                    <a
                        href="#menu"
                        className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 px-3 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-text-inverse transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:h-10 sm:px-4 sm:text-[0.6875rem]"
                    >
                        Order Online
                    </a>

                    <button
                        type="button"
                        onClick={() => setOpen((current) => !current)}
                        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={open}
                        aria-controls="mobile-navigation"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-text-inverse transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:h-10 sm:w-10"
                    >
                        {open ? (
                            <X size={20} weight="regular" aria-hidden="true" />
                        ) : (
                            <List size={20} weight="regular" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile navigation panel */}
            {open && (
                <div
                    id="mobile-navigation"
                    className="mx-auto mt-3 max-w-[1440px] rounded-card border border-white/15 bg-espresso/95 p-5 text-text-inverse shadow-deep backdrop-blur-2xl sm:p-6 lg:hidden"
                >
                    <div className="flex flex-col">
                        <p className="eyebrow mb-4 text-white/45">
                            Explore Golden Moment
                        </p>

                        {navItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={`flex items-center justify-between py-4 text-sm font-medium text-white/85 transition-colors hover:text-white ${index !== navItems.length - 1
                                        ? "border-b border-white/10"
                                        : ""
                                    }`}
                            >
                                <span>{item.label}</span>
                                <span
                                    aria-hidden="true"
                                    className="font-display text-xl text-terracotta"
                                >
                                    ↗
                                </span>
                            </a>
                        ))}

                        <a
                            href="#contact"
                            onClick={closeMenu}
                            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-terracotta px-5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                        >
                            Reserve a Table
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
