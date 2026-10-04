import { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "ghost";
}

export function Button({
    children,
    href,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-pill px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300";

    const variantClasses = {
        primary: "bg-accent text-white hover:bg-accent-hover",
        secondary:
            "border border-border-strong bg-transparent text-text hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-text hover:bg-surface-elevated",
    };

    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

    if (href) {
        // If the href is an external link or anchor link, use a regular 'a' tag
        if (href.startsWith("http") || href.startsWith("#")) {
            return (
                <a href={href} className={combinedClassName} {...props}>
                    {children}
                </a>
            );
        }
        
        return (
            <Link href={href} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}
