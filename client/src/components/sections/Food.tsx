import Image from "next/image";
import FoodReveal from "./FoodReveal";
import { SECTION_CONTENT } from "@/lib/data/sections";

type CollageImage = {
    src: string;
    alt: string;
    sizes: string;
    className: string;
};

const HOVER =
    "motion-safe:[@media(hover:hover)]:group-hover:scale-[1.02]";

const COLLAGE: CollageImage[] = [
    {
        src: "/images/food-hands.jpg",
        alt: "Roasted mushrooms with herbs and cream in a speckled stoneware bowl",
        sizes: "(max-width: 1279px) 100vw, 25vw",
        className:
            "col-span-5 aspect-[4/3] xl:left-[79.97%] xl:right-0 xl:top-[5.14%] xl:col-auto xl:aspect-auto xl:h-[52.52%]",
    },
    {
        src: "/images/food-table.jpg",
        alt: "Charred toast topped with cream and micro herbs on a plate",
        sizes: "(max-width: 1279px) 60vw, 14vw",
        className:
            "col-span-3 h-56 sm:h-72 xl:left-[74.91%] xl:top-[58.75%] xl:col-auto xl:h-[30.42%] xl:w-[13.5%]",
    },
    {
        src: "/images/intro-dining.jpg",
        alt: "Glass tumbler and small brass dish in dappled leaf shadow",
        sizes: "(max-width: 1279px) 40vw, 11vw",
        className:
            "col-span-2 h-56 sm:h-72 xl:left-[89.6%] xl:right-0 xl:top-[58.75%] xl:col-auto xl:h-[30.42%]",
    },
];

const RAIL_WORDS = [
    "Seasonal",
    "Produce",
    "Thoughtful",
    "Cooking",
    "Shared",
];

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
    eyebrow = SECTION_CONTENT.food.eyebrow,
    headlineLines = ["Food made", "for the table."],
    body = SECTION_CONTENT.food.description,
    script = SECTION_CONTENT.food.script,
    ctaLabel = SECTION_CONTENT.food.ctaLabel,
    ctaHref = "#menu",
    signatureCaption = "Our Signature Cuisine",
}: FoodProps) {
    return (
        <FoodReveal>
            <div className="content-container">
                <div className="mx-auto max-w-3xl xl:max-w-none">
                    <div className="relative flex flex-col gap-10 xl:block xl:aspect-[1403/835] xl:[container-type:inline-size]">

                        {/* Editorial header */}
                        <div className="food-header food-anim flex items-center gap-4 xl:absolute xl:inset-x-0 xl:top-0 xl:h-[2.13%] xl:gap-[1.92cqw]">
                            <span className="food-meta food-anim whitespace-nowrap label-mini text-text xl:text-[length:max(13px,0.93cqw)]">
                                {brand}
                            </span>

                            <span
                                aria-hidden="true"
                                className="h-px flex-1 bg-border"
                            />

                            <span className="whitespace-nowrap label-micro text-text-muted xl:text-[length:max(12px,0.79cqw)]">
                                {location}
                            </span>
                        </div>

                        {/* Decorative left rail */}
                        <div
                            aria-hidden="true"
                            className="food-rail food-anim hidden xl:absolute xl:-left-[2.28%] xl:top-[12%] xl:flex xl:flex-col xl:items-start"
                        >
                            <span className="label-micro leading-[1.96] text-text-muted xl:text-[length:max(12px,0.6cqw)]">
                                {RAIL_WORDS.map((word, index) => (
                                    <span key={word}>
                                        {word}
                                        {index < RAIL_WORDS.length - 1 && (
                                            <br />
                                        )}
                                    </span>
                                ))}
                            </span>

                            <span className="mt-[1.1cqw] h-[4.27cqw] w-px bg-border-strong" />
                        </div>

                        {/* Main food photograph */}
                        <figure className="food-main-img food-anim group relative aspect-[4/5] overflow-hidden bg-bone xl:absolute xl:left-[4.7%] xl:top-[5.14%] xl:aspect-[514/789] xl:w-[36.64%]">
                            <Image
                                src="/images/food-main.jpg"
                                alt="A hand garnishing sliced steak with fresh thyme on a stoneware plate"
                                fill
                                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 768px, 36vw"
                                className="object-cover object-center transition-transform duration-[1400ms] ease-out motion-safe:[@media(hover:hover)]:group-hover:scale-[1.015]"
                            />

                            {/* Photograph gradient */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                            />

                            <figcaption className="absolute bottom-5 left-5 flex items-center gap-3 xl:bottom-[2.4%] xl:left-[19%] xl:gap-[0.93cqw]">
                                <span className="food-meta food-anim whitespace-nowrap label-micro text-white xl:text-[length:max(12px,0.74cqw)]">
                                    {signatureCaption}
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="h-px w-10 bg-white/75 xl:w-[2.96cqw]"
                                />
                            </figcaption>
                        </figure>

                        {/* Editorial text column */}
                        <div className="xl:absolute xl:left-[48.04%] xl:top-[13.89%] xl:w-[25.73%]">
                            <p className="food-eyebrow food-anim label-mini text-accent xl:text-[length:max(13px,0.82cqw)]">
                                {eyebrow}
                            </p>

                            <h2
                                id="food-heading"
                                className="mt-6 text-balance xl:mt-[2.01cqw]"
                            >
                                {headlineLines.map((line, index) => (
                                    <span
                                        key={`${index}-${line}`}
                                        className="block w-full overflow-hidden pb-[0.12em]"
                                    >
                                        <span className="food-headline-line food-anim block max-w-full break-words font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] leading-[1.05] tracking-[-0.035em] text-text xl:text-[clamp(2.5rem,4.5cqw,4.25rem)]">
                                            {line}
                                        </span>
                                    </span>
                                ))}
                            </h2>

                            {/* Description */}
                            <p className="food-body food-anim section-lead mt-7 text-pretty sm:mt-8 xl:mt-[2.35cqw]">
                                {body}
                            </p>

                            {/* Handwritten accent */}
                            <p className="food-script food-anim mt-10 origin-bottom-left -rotate-[8deg] font-signature text-[clamp(1.9rem,4vw,2.5rem)] leading-[1.2] text-accent [font-synthesis:none] sm:mt-12 xl:mt-[3.5cqw] xl:text-[2.5cqw]">
                                {script}
                            </p>

                            {/* Menu CTA */}
                            <a
                                href={ctaHref}
                                className="food-cta food-anim group mt-10 inline-flex items-center gap-5 outline-offset-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:mt-12 xl:mt-[5cqw] xl:gap-[2.08cqw]"
                            >
                                <span className="relative label-micro text-text xl:text-[length:max(12px,0.79cqw)]">
                                    {ctaLabel}

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
                                    <path
                                        d="M0 4h31M27.5 0.75 31 4l-3.5 3.25"
                                        stroke="currentColor"
                                        strokeWidth="0.9"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Supporting photo collage */}
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
                    </div>
                </div>
            </div>
        </FoodReveal>
    );
}