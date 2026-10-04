import Image from "next/image";
import FoodReveal from "./FoodReveal";
import GMDivider from "@/components/ui/GMDivider";

/**
 * LAYOUT MODEL
 * ------------
 * Below `xl` the section is a single stacked column.
 * At `xl`+ the container becomes an artboard (design region 1403 x 914) and
 * everything is placed in percentages of it, with type in `cqw` (floored so it
 * never gets unreadably small). All images now stay INSIDE the container:
 * the right-hand collage ends at right: 0 of the artboard (no viewport bleed).
 *
 * NOTE: the collage filenames don't match their content (food-hands.jpg shows
 * mushrooms, food-table.jpg shows toast, intro-dining.jpg is borrowed from another
 * section). Rename the files when convenient; the alt text is what's correct.
 */

type CollageImage = { src: string; alt: string; sizes: string; className: string };

const HOVER =
    "motion-safe:[@media(hover:hover)]:group-hover:scale-[1.02]";

const COLLAGE: CollageImage[] = [
    {
        // Top: 79.97% -> right edge of artboard
        src: "/images/food-hands.jpg",
        alt: "Roasted mushrooms with herbs and cream in a speckled stoneware bowl",
        sizes: "(max-width: 1279px) 100vw, 25vw",
        className:
            "col-span-5 aspect-[4/3] xl:left-[79.97%] xl:right-0 xl:top-[5.14%] xl:col-auto xl:aspect-auto xl:h-[52.52%]",
    },
    {
        // Bottom left
        src: "/images/food-table.jpg",
        alt: "Charred toast topped with cream and micro herbs on a plate",
        sizes: "(max-width: 1279px) 60vw, 14vw",
        className:
            "col-span-3 h-56 sm:h-72 xl:left-[74.91%] xl:top-[58.75%] xl:col-auto xl:h-[30.42%] xl:w-[13.5%]",
    },
    {
        // Bottom right: ends at the artboard edge, no bleed
        src: "/images/intro-dining.jpg",
        alt: "Glass tumbler and small brass dish in dappled leaf shadow",
        sizes: "(max-width: 1279px) 40vw, 11vw",
        className:
            "col-span-2 h-56 sm:h-72 xl:left-[89.6%] xl:right-0 xl:top-[58.75%] xl:col-auto xl:h-[30.42%]",
    },
];

const RAIL_WORDS = ["Seasonal", "Produce", "Thoughtful", "Cooking", "Shared"];

type FoodProps = {
    brand?: string;
    location?: string;
    eyebrow?: string;
    headlineLines?: [string, string];
    body?: string;
    script?: string;
    ctaLabel?: string;
    ctaHref?: string;
    signatureCaption?: string;
};

export default function Food({
    brand = "Golden Moment",
    location = "Canberra · ACT",
    eyebrow = "Our Food",
    headlineLines = ["Food made", "for the table."],
    body = "Seasonal produce, thoughtful cooking, and plates designed to be shared. At Golden Moment, food is simple at heart — generous, considered, and made to bring people together.",
    script = "seasonal. fresh. together.",
    ctaLabel = "View Menu",
    ctaHref = "#menu",
    signatureCaption = "Our Signature Cuisine",
}: FoodProps) {
    return (
        <FoodReveal>
            <div className="content-container">
                <div className="mx-auto max-w-3xl xl:max-w-none">
                    <div className="relative flex flex-col gap-10 xl:block xl:aspect-[1403/914] xl:[container-type:inline-size]">
                        {/* Header bar */}
                        <div className="food-header food-anim flex items-center gap-4 xl:absolute xl:inset-x-0 xl:top-0 xl:h-[2.13%] xl:gap-[1.92cqw]">
                            <span className="food-meta food-anim whitespace-nowrap label-mini text-text xl:text-[length:max(13px,0.93cqw)]">
                                {brand}
                            </span>
                            <span aria-hidden="true" className="h-px flex-1 bg-border" />
                            <span className="whitespace-nowrap label-micro text-text-muted xl:text-[length:max(12px,0.79cqw)]">
                                {location}
                            </span>
                        </div>

                        {/* Left rail: decorative, repeats the body copy, hidden from AT */}
                        <div
                            aria-hidden="true"
                            className="food-rail food-anim hidden xl:absolute xl:-left-[2.28%] xl:top-[12%] xl:flex xl:flex-col xl:items-start"
                        >
                            <span className="label-micro leading-[1.96] text-text-muted xl:text-[length:max(12px,0.6cqw)]">
                                {RAIL_WORDS.map((w, i) => (
                                    <span key={w}>
                                        {w}
                                        {i < RAIL_WORDS.length - 1 && <br />}
                                    </span>
                                ))}
                            </span>
                            <span className="mt-[1.1cqw] h-[4.27cqw] w-px bg-border-strong" />
                        </div>

                        {/* Hero image (514 x 789) */}
                        <figure className="food-main-img food-anim group relative aspect-[4/5] overflow-hidden bg-bone xl:absolute xl:left-[4.7%] xl:top-[5.14%] xl:aspect-[514/789] xl:w-[36.64%]">
                            <Image
                                src="/images/food-main.jpg"
                                alt="A hand garnishing sliced steak with fresh thyme on a stoneware plate"
                                fill
                                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 768px, 36vw"
                                className="object-cover object-center transition-transform duration-[1400ms] ease-out motion-safe:[@media(hover:hover)]:group-hover:scale-[1.015]"
                            />

                            {/* Scrim so the white caption stays legible on any photo */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent"
                            />

                            <figcaption className="absolute bottom-5 left-5 flex items-center gap-3 xl:bottom-[2.4%] xl:left-[19%] xl:gap-[0.93cqw]">
                                <span className="food-meta food-anim whitespace-nowrap label-micro text-white xl:text-[length:max(12px,0.74cqw)]">
                                    {signatureCaption}
                                </span>
                                <span aria-hidden="true" className="h-px w-10 bg-white/70 xl:w-[2.96cqw]" />
                            </figcaption>
                        </figure>

                        {/* Text column */}
                        <div className="xl:absolute xl:left-[48.04%] xl:top-[13.89%] xl:w-[25.73%]">
                            <p className="food-eyebrow food-anim label-mini text-accent xl:text-[length:max(13px,0.82cqw)]">
                                {eyebrow}
                            </p>

                            <h2 id="food-heading" className="mt-6 xl:mt-[2.01cqw]">
                                {headlineLines.map((line) => (
                                    // Mask is content-width (+ slack) so a wider fallback font
                                    // can't clip mid-word; bottom padding protects descenders.
                                    <span key={line} className="block w-max max-w-full overflow-hidden pb-[0.08em] xl:max-w-none xl:pr-[1cqw]">
                                        <span className="food-headline-line food-anim block whitespace-nowrap font-serif text-[clamp(3rem,13vw,4.5rem)] leading-[1.1] tracking-[-0.03em] text-text xl:text-[5.2cqw]">
                                            {line}
                                        </span>
                                    </span>
                                ))}
                            </h2>

                            <p className="food-body food-anim mt-8 text-pretty font-sans text-[15px] leading-[1.75] text-text sm:text-base xl:mt-[2.35cqw] xl:text-[length:max(14px,1.11cqw)] xl:leading-[1.726]">
                                {body}
                            </p>

                            {/* Handwritten accent */}
                            <p className="food-script food-anim mt-12 font-signature text-[clamp(2rem,4vw,2.5rem)] leading-[1.2] text-accent [font-synthesis:none] -rotate-[8deg] origin-bottom-left xl:mt-[4cqw] xl:text-[2.5cqw]">
                                {script}
                            </p>

                            {/* CTA: accessible name = visible label; visible focus ring */}
                            <a
                                href={ctaHref}
                                className="food-cta food-anim group mt-12 inline-flex items-center gap-5 outline-offset-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent xl:mt-[5.77cqw] xl:gap-[2.08cqw]"
                            >
                                <span className="relative label-micro text-text xl:text-[length:max(12px,0.79cqw)]">
                                    {ctaLabel}
                                    {/* right offset cancels the trailing letter-spacing */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute -bottom-2 left-0 right-[0.28em] h-px bg-text transition-colors duration-300 group-hover:bg-accent xl:-bottom-[0.59cqw]"
                                    />
                                </span>

                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 32 8"
                                    fill="none"
                                    className="w-8 shrink-0 text-text transition-transform duration-300 motion-safe:[@media(hover:hover)]:group-hover:translate-x-1.5 xl:w-[2.3cqw]"
                                >
                                    <path d="M0 4h31M27.5 0.75 31 4l-3.5 3.25" stroke="currentColor" strokeWidth="0.9" />
                                </svg>
                            </a>
                        </div>

                        {/* Right collage: contained within the artboard (no viewport bleed).
                            `contents` at xl so children position against the artboard. */}
                        <div className="grid grid-cols-5 items-start gap-3 xl:contents">
                            {COLLAGE.map((img) => (
                                <figure
                                    key={img.src}
                                    className={`food-support-img food-anim group relative overflow-hidden bg-bone xl:absolute ${img.className}`}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes={img.sizes}
                                        className={`object-cover object-center transition-transform duration-[1200ms] ease-out ${HOVER}`}
                                    />
                                </figure>
                            ))}
                        </div>

                        {/* Footer signature: decorative repeat of the header */}
                        <div
                            className="food-signature food-anim xl:absolute xl:inset-x-0 xl:top-[95.79%] xl:h-[4.21%]"
                        >
                            <GMDivider 
                                leftText={brand}
                                rightText={location}
                                className="!py-0 !bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FoodReveal>
    );
}