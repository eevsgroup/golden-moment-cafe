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
    { day: "Monday",    open: "07:00", close: "15:30", displayOpen: "7:00 AM", displayClose: "3:30 PM" },
    { day: "Tuesday",   open: "07:00", close: "15:30", displayOpen: "7:00 AM", displayClose: "3:30 PM" },
    { day: "Wednesday", open: "07:00", close: "15:30", displayOpen: "7:00 AM", displayClose: "3:30 PM" },
    { day: "Thursday",  open: "07:00", close: "15:30", displayOpen: "7:00 AM", displayClose: "3:30 PM" },
    { day: "Friday",    open: "07:00", close: "15:30", displayOpen: "7:00 AM", displayClose: "3:30 PM" },
    { day: "Saturday",  open: "07:00", close: "14:30", displayOpen: "7:00 AM", displayClose: "2:30 PM" },
    { day: "Sunday",    open: "07:00", close: "14:30", displayOpen: "7:00 AM", displayClose: "2:30 PM" },
];

export const SCHEDULE_GROUPS = [
    { days: "Mon – Fri", hours: "7:00 AM – 3:30 PM" },
    { days: "Sat & Sun", hours: "7:00 AM – 2:30 PM" },
];

/** Short summary for Hero / Footer */
export const HOURS_SUMMARY = "Mon–Fri 7:00 AM – 3:30 PM · Sat–Sun 7:00 AM – 2:30 PM";

/** JSON-LD-ready opening hours specifications */
export function getJsonLdHours() {
    return [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "15:30",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "07:00",
            closes: "14:30",
        },
    ];
}
