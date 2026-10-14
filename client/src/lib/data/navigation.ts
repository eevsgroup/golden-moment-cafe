/**
 * Single source of truth for all navigation links.
 */

export const NAV_ITEMS = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#food" },
    { label: "Catering", href: "#catering" },
    { label: "Visit", href: "#contact" },
] as const;

export const FOOTER_EXPLORE = [
    { label: "Home", href: "#hero" },
    { label: "Our Food", href: "#food" },
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Catering", href: "#catering" },
    { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_MENU = [
    { label: "Burgers", href: "#menu" },
    { label: "Pastas", href: "#menu" },
    { label: "Rice & Curry", href: "#menu" },
    { label: "Noodles & Dumplings", href: "#menu" },
    { label: "Classics & Sides", href: "#menu" },
    { label: "Add-Ons", href: "#menu" },
] as const;
