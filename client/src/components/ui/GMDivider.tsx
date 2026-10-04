/**
 * GM Monogram Divider
 *
 * Shared editorial divider used across sections.
 * Renders the "GM" monogram flanked by horizontal rules.
 *
 * Variants:
 *  - "light" (default) — for light/cream backgrounds
 *  - "dark" — for dark backgrounds (gold tones)
 */

type GMDividerProps = {
    variant?: "light" | "dark";
    className?: string;
    leftText?: string;
    rightText?: string;
};

export default function GMDivider({ 
    variant = "light", 
    className = "",
    leftText,
    rightText
}: GMDividerProps) {
    const isLight = variant === "light";

    const ruleColor = isLight ? "bg-border" : "bg-[#c4956a]/15";
    const monogramColor = isLight ? "text-text" : "text-[#c4956a]/40";
    const textColor = isLight ? "text-text-muted" : "text-[#c4956a]/40";
    const borderColor = isLight ? "" : "border-t border-white/[0.06]";
    const bgColor = isLight ? "bg-background" : "bg-[#1a1512]";

    return (
        <div className={`${bgColor} ${borderColor} ${className}`} aria-hidden="true">
            <div className="content-container">
                <div className="flex items-center gap-4 sm:gap-6 py-5">
                    {/* Left side rule (and optional text) */}
                    <div className="flex-1 flex items-center gap-4">
                        {leftText && (
                            <span className={`whitespace-nowrap label-mini ${textColor}`}>
                                {leftText}
                            </span>
                        )}
                        <span className={`h-px flex-1 ${ruleColor}`} />
                    </div>
                    
                    {/* Monogram */}
                    <span className={`px-2 sm:px-4 font-serif text-[1.5rem] sm:text-[1.75rem] leading-none ${monogramColor}`}>
                        <span className="relative -top-[0.08em] z-10">G</span>
                        <span className="relative -ml-[0.15em] top-[0.18em] z-0">M</span>
                    </span>
                    
                    {/* Right side rule (and optional text) */}
                    <div className="flex-1 flex items-center gap-4">
                        <span className={`h-px flex-1 ${ruleColor}`} />
                        {rightText && (
                            <span className={`whitespace-nowrap label-mini ${textColor} hidden sm:block`}>
                                {rightText}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
