/**
 * Single source of truth for contact & location info.
 */

export const CONTACT = {
    phone: "+61433056145",
    phoneDisplay: "+61 433 056 145",
    whatsappUrl: "https://wa.me/61433056145",

    address: {
        street: "Shop 4/14 Moore St",
        locality: "Canberra",
        region: "ACT",
        postalCode: "2601",
        country: "AU",
        full: "Shop 4/14 Moore St, Canberra ACT 2601, Australia",
        short: "Shop 4/14 Moore St, Canberra",
    },

    geo: {
        latitude: -35.273060,
        longitude: 149.126442,
    },

    googleMapsDirections:
        "https://www.google.com/maps/dir//Shop+4%2F14+Moore+St,+Canberra+ACT+2601,+Australia",
    googleMapsEmbed:
        "https://maps.google.com/maps?q=Shop%204%2F14%20Moore%20St%2C%20Canberra%20ACT%202601%2C%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleReviewUrl:
        "https://www.google.com/maps/place/Golden+Moment+Cafe/@-35.273060,149.126442/reviews",

    social: {
        instagram: "https://www.instagram.com/goldenmoment.au",
        facebook: "https://www.facebook.com/goldenmomentcafe",
        tripadvisor: "https://www.tripadvisor.com.au/Restaurant_Review-Golden_Moment_Cafe",
    },

    website: "https://goldenmoment.au",
} as const;
