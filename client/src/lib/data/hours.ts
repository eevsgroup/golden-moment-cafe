/**
 * Single source of truth for opening hours.
 * Consumed by Contact, Hero, Footer, and the JSON-LD schema in layout.tsx.
 */

export type DayHours = {
    day: string;
    open: string;
    close: string;
    displayOpen: string;
    displayClose: string;
};

export const HOURS: DayHours[] = [
    { day: "Monday",    open: "07:00", close: "14:30", displayOpen: "7:00 AM",  displayClose: "2:30 PM" },
    { day: "Tuesday",   open: "06:00", close: "16:00", displayOpen: "6:00 AM",  displayClose: "4:00 PM" },
    { day: "Wednesday", open: "06:00", close: "16:30", displayOpen: "6:00 AM",  displayClose: "4:30 PM" },
    { day: "Thursday",  open: "06:00", close: "18:00", displayOpen: "6:00 AM",  displayClose: "6:00 PM" },
    { day: "Friday",    open: "06:00", close: "16:30", displayOpen: "6:00 AM",  displayClose: "4:30 PM" },
    { day: "Saturday",  open: "07:00", close: "15:00", displayOpen: "7:00 AM",  displayClose: "3:00 PM" },
    { day: "Sunday",    open: "07:00", close: "15:00", displayOpen: "7:00 AM",  displayClose: "3:00 PM" },
];

/** Short summary for Hero / Footer (earliest open - latest close) */
export const HOURS_SUMMARY = "6:00 AM – 6:00 PM";

/** JSON-LD-ready opening hours specifications */
export function getJsonLdHours() {
    return [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Monday",
            opens: "07:00",
            closes: "14:30",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Tuesday", "Wednesday", "Friday"],
            opens: "06:00",
            closes: "16:30",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Thursday",
            opens: "06:00",
            closes: "18:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "07:00",
            closes: "15:00",
        },
    ];
}
