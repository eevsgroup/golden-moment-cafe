"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#introduction" },
    { label: "Catering", href: "#catering" },
    { label: "Visit", href: "#contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
            <nav
                className="
          mx-auto flex max-w-7xl items-center justify-between
          rounded-pill
          border border-border-inverse
          bg-background-dark/90
          px-5 py-3
          text-text-inverse
          shadow-deep
          backdrop-blur-xl
          md:px-6 md:py-4
        "
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="relative w-12 h-12 -my-2 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                        <img
                            src="/logo/Logo _cafe.jpeg"
                            alt="Golden Moment Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-display text-xl tracking-tight md:text-2xl">Golden Moment</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-10 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-text-inverse/70
                transition-colors duration-300
                hover:text-text-inverse
              "
                        >
                            {item.label}
                        </a>
                    ))}

                    {/* Reservation */}
                    <a
                        href="#contact"
                        className="
              rounded-pill
              bg-accent
              px-6 py-3
              text-xs font-semibold uppercase
              tracking-[0.15em]
              text-white
              transition-all duration-300
              hover:bg-accent-hover
            "
                    >
                        Reserve
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="
            flex size-11 items-center justify-center
            rounded-pill
            border border-border-inverse
            text-text-inverse
            transition-colors duration-300
            hover:bg-glass
            md:hidden
          "
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    {open ? <X size={20} /> : <List size={20} />}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {open && (
                <div
                    className="
            mx-auto mt-3 max-w-7xl
            rounded-card
            border border-border-inverse
            bg-glass-dark
            p-6
            text-text-inverse
            shadow-deep
            backdrop-blur-xl
            md:hidden
          "
                >
                    <div className="flex flex-col gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="
                  font-display text-4xl
                  transition-opacity duration-300
                  hover:opacity-70
                "
                            >
                                {item.label}
                            </a>
                        ))}

                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="
                rounded-pill
                bg-accent
                px-6 py-4
                text-center
                text-xs font-semibold uppercase
                tracking-[0.15em]
                text-white
                transition-colors duration-300
                hover:bg-accent-hover
              "
                        >
                            Reserve a table
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}