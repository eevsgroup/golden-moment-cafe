/**
 * Centralized Section Content — Single Source of Truth
 *
 * All section eyebrows, headlines, descriptions (leads), and scripts across
 * the application are defined here to ensure complete editorial consistency.
 */

export const SECTION_CONTENT = {
    hero: {
        eyebrow: "Canberra, Australia",
        title: "Good food. Better moments.",
        description:
            "Seasonal cooking, thoughtful hospitality, and the simple pleasure of sharing a table. Fresh artisan coffee, generous plates and a place to slow down and make a little more of the day.",
        script: "Come, stay awhile.",
    },
    introduction: {
        eyebrow: "The Restaurant",
        title: "For good food, long tables, and golden moments.",
        description:
            "Golden Moment is a contemporary restaurant in Canberra, bringing together seasonal cooking, thoughtful hospitality, and the simple pleasure of sharing a table.",
        script: "Come, stay awhile.",
    },
    food: {
        eyebrow: "Our Signature Cuisine",
        title: "Thoughtful food made fresh every day.",
        description:
            "At Golden Moment, food is simple at heart — generous, seasonal, fresh. Morning coffee through to slow afternoon lunches and relaxed dinners, every plate is prepared with care and quality local ingredients.",
        script: "seasonal. fresh. delicious.",
        ctaLabel: "View Menu",
    },
    menu: {
        eyebrow: "From our kitchen",
        title: "Good food, all day.",
        description:
            "From breakfast and artisan coffee to burgers, curries, pasta, momo and loaded chips. Made fresh, just the way a good café should.",
        subDescription:
            "Thoughtful ingredients, familiar favourites, and something new to discover.",
    },
    dining: {
        eyebrow: "The Experience",
        title: "Stay for the moment.",
        description:
            "Relaxed in Canberra, Golden Moment is more than a café — it's a place to slow down, connect and savour the simple things. Great coffee, seasonal food and a warm, welcoming space, right in the heart of our city.",
        script: "made here, enjoyed slowly.",
        ctaLabel: "Our Place",
    },
    contact: {
        eyebrow: "Get in touch",
        title: "Come visit us.",
        description:
            "Good food, good company and a warm welcome. We look forward to seeing you.",
    },
    footer: {
        eyebrow: "Dine with us",
        title: "Great food. Good company.",
        description:
            "Whether it's a quick coffee, a relaxed lunch or a family dinner, Golden Moment is here for every occasion.",
    },
} as const;
