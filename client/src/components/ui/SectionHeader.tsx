import { ReactNode } from "react";

interface SectionHeaderProps {
    title: ReactNode;
    eyebrow?: string;
    description?: ReactNode;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeader({
    title,
    eyebrow,
    description,
    align = "left",
    className = "",
}: SectionHeaderProps) {
    return (
        <div
            className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""} ${className}`.trim()}
        >
            {eyebrow && <div className="eyebrow text-text-muted">{eyebrow}</div>}
            
            <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl text-text">
                {title}
            </h2>
            
            {description && (
                <p className="max-w-2xl text-text-secondary leading-relaxed md:text-lg">
                    {description}
                </p>
            )}
        </div>
    );
}
