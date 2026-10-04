import { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    spacing?: "default" | "small" | "none";
}

export function Section({
    children,
    spacing = "default",
    className = "",
    ...props
}: SectionProps) {
    const spacingClasses = {
        default: "section-padding",
        small: "section-padding-small",
        none: "",
    };

    return (
        <section
            className={`${spacingClasses[spacing]} ${className}`.trim()}
            {...props}
        >
            {children}
        </section>
    );
}
