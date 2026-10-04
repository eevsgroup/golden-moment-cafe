"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import GMDivider from "@/components/ui/GMDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MENU_CATEGORIES = [
    "BURGERS",
    "PASTAS",
    "RICE & CURRY",
    "NOODLES & DUMPLINGS",
    "CLASSICS & SIDES",
    "ADD-ONS"
];

const getPlaceholderImage = (category: string) => {
    switch (category) {
        case "PASTAS": return "https://images.unsplash.com/photo-1621996311239-531f2425111b?q=80&w=800&auto=format&fit=crop";
        case "BURGERS": return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop";
        case "RICE & CURRY": return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop";
        case "NOODLES & DUMPLINGS": return "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop";
        case "CLASSICS & SIDES": return "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop";
        case "ADD-ONS": return "https://images.unsplash.com/photo-1525351484163-c529a90d566f?q=80&w=800&auto=format&fit=crop";
        default: return "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=800&auto=format&fit=crop";
    }
};

const MENU_DATA = [
    { category: "PASTAS", name: "Creamy chicken mushroom", price: "$17", desc: "al dente Pasta, Sautéed mushrooms, Tender chicken, creamy garlic sauce, finished with parmesan and olive oil.", special: true },
    { category: "PASTAS", name: "Italian Rosè Pasta", price: "$17", desc: "A creamy blend of tomato passata and cream, tossed with chicken & pasta, with parmesan and fresh herbs" },
    { category: "PASTAS", name: "Peri Peri Chicken", price: "$17", desc: "Tender chicken, Pasta tossed in a blend of spicy peri peri sauce, finished with parmesan and fresh herbs" },
    { category: "PASTAS", name: "Pesto Chicken", price: "$16", desc: "Grilled chicken & Pasta tossed in a blend of creamy basil pesto sauce, mix herbs finsihed with parmesan and olive oil" },
    
    { category: "BURGERS", name: "Cheese Burger", price: "$14", desc: "Grass fed Beef, Cheese, Tomato, mustard, pickle side of chips" },
    { category: "BURGERS", name: "Double Cheeseburger", price: "$18", desc: "Double Grass fed Beef, double Cheese, tomato, mustard, pickle with a side of chips" },
    { category: "BURGERS", name: "GM Classic Burger", price: "$20", desc: "Iceberg lettuce, Tomato, Grass fed Beef Patty, Cheese, Bacon, Pickles & GM house sauce with side of chips" },
    { category: "BURGERS", name: "GM Classic Chicken", price: "$20", desc: "Iceberg lettuce, Tomato, chicken schnitzel, bacon, cheese, GM house sauce with a side of chips" },
    { category: "BURGERS", name: "Chilli Burger", price: "$20", desc: "Grass fed Beef, Cheese, Streaky Bacon, lettuce, Jalapenoś, Hot sauce, house sauce & side of chips" },
    { category: "BURGERS", name: "Veggie Burger", price: "$20", desc: "Halloumi patty, Spinach , Tomato slice, Slaw & sweet Chilli sauce with a side of chips" },
    { category: "BURGERS", name: "GM Lunch Box", price: "$22", desc: "CheeseBurger with Side of Fries, 3pcs wings and a can of drink", special: true },

    { category: "RICE & CURRY", name: "Beef Curry", price: "$16", desc: "Curry with rice of Your Choice (Fried / Plain)" },
    { category: "RICE & CURRY", name: "Goat Curry", price: "$16", desc: "Curry with rice of Your Choice (Fried / Plain)" },
    { category: "RICE & CURRY", name: "Chicken Curry", price: "$16", desc: "Curry with rice of Your Choice (Fried / Plain)" },
    { category: "RICE & CURRY", name: "Nasi Goreng", price: "$16", desc: "Curry with rice of Your Choice (Fried / Plain)" },

    { category: "NOODLES & DUMPLINGS", name: "Veg Noodles / Dumplings", price: "$15", desc: "Served with a side of housemade dumpling sauce" },
    { category: "NOODLES & DUMPLINGS", name: "Chicken Noodles / Dumplings", price: "$17", desc: "Served with a side of housemade dumpling sauce" },

    { category: "CLASSICS & SIDES", name: "GM Hot Wings", price: "$10", desc: "6pcs" },
    { category: "CLASSICS & SIDES", name: "Peri Peri Wings", price: "$10", desc: "Delicious wings tossed in peri peri sauce" },
    { category: "CLASSICS & SIDES", name: "Smoke BBQ Wings", price: "$10", desc: "Delicious wings tossed in BBQ sauce" },
    { category: "CLASSICS & SIDES", name: "Bowl of Chips", price: "$8.5", desc: "Classic hot chips" },
    { category: "CLASSICS & SIDES", name: "GM Loaded Fries", price: "$13", desc: "Crunchy fried chips tossed in Shallots, Shredded Cheese, topped with Bacon bits and GM house sauce" },
    { category: "CLASSICS & SIDES", name: "Snitty and Chips", price: "$18", desc: "Crispy Golden Schnitzel served with a side of crunchy chips, mix salad and Garlic Aioli" },
    { category: "CLASSICS & SIDES", name: "Fish and chips", price: "$18", desc: "Crispy golden battered fish served with crunchy chips, fresh garden salad & tartare sauce." },
    { category: "CLASSICS & SIDES", name: "Seafood basket", price: "$20", desc: "Calamari, battered fish, served with a side of chips & garden salad" },

    { category: "ADD-ONS", name: "Egg", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Bacon", price: "$5", desc: "" },
    { category: "ADD-ONS", name: "Smoked Salmon", price: "$5", desc: "" },
    { category: "ADD-ONS", name: "Chorizo", price: "$5", desc: "" },
    { category: "ADD-ONS", name: "Avocado", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Hash Browns", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Halloumi", price: "$5", desc: "" },
    { category: "ADD-ONS", name: "Sautéed Mushrooms", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Spinach/Kale", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Feta Cheese", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Cherry Tomatoes", price: "$4", desc: "" },
    { category: "ADD-ONS", name: "Sauce", price: "$1", desc: "" },
    { category: "ADD-ONS", name: "Cheese", price: "$1", desc: "" }
];

export default function Menu() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState("BURGERS");

    useGSAP(
        () => {
            const root = sectionRef.current;
            if (!root) return;
            const q = gsap.utils.selector(root);
            
            gsap.fromTo(
                q(".menu-card"),
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: q(".menu-grid"),
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                q(".offer-card"),
                { y: 40, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: q(".offer-card"),
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    const filteredMenu = MENU_DATA.filter(item => item.category === activeTab);

    return (
        <section ref={sectionRef} id="menu" className="relative w-full bg-background pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
            <div className="content-container relative z-10">
                {/* Compact Header */}
                <div className="flex flex-col gap-4 mb-12 sm:mb-16">
                    <div>
                        <p className="label-mini text-accent mb-3">Our Menu</p>
                        <h2 className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-text">
                            Good food, all day.
                        </h2>
                    </div>
                    <p className="font-sans text-[15px] leading-[1.6] text-text-muted max-w-[440px]">
                        From breakfast and coffee to burgers, curries, pasta, momo and more. Made here, enjoyed slowly.
                    </p>
                </div>
            </div>

            {/* Premium Office Offers Strip */}
            <div className="content-container relative z-10 mt-12 sm:mt-16 mb-12 sm:mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Offer 1 — Breakfast Combo */}
                    <a href="#contact" className="offer-card invisible group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5e6d3] to-[#ede0d0] transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5">
                        <div className="relative h-40 sm:h-36 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=600&auto=format&fit=crop"
                                alt="Breakfast combo — bacon eggs roll and coffee"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#f5e6d3] via-transparent to-transparent" />
                            <span className="absolute top-3 left-4 label-micro text-white bg-accent/80 backdrop-blur-sm px-2.5 py-1 rounded-full">Mon-Fri 7am-10am</span>
                        </div>
                        <div className="relative p-5">
                            <div className="flex items-baseline justify-between mb-1.5">
                                <h4 className="font-serif text-[1.15rem] leading-tight text-text">
                                    Breakfast Combo
                                </h4>
                                <span className="font-serif text-xl text-accent">$9.99</span>
                            </div>
                            <p className="font-sans text-[12px] leading-[1.5] text-text-muted">
                                Bacon and Eggs Roll + Small Coffee
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="label-micro text-accent opacity-0 transition-opacity group-hover:opacity-100">Order Now</span>
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-white">
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </span>
                            </div>
                        </div>
                    </a>

                    {/* Offer 2 — Lunch Deal */}
                    <a href="#contact" className="offer-card invisible group relative overflow-hidden rounded-2xl bg-gradient-to-br from-bone to-white transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5">
                        <div className="relative h-40 sm:h-36 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"
                                alt="Lunch deal — burger and chips"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bone via-transparent to-transparent" />
                            <span className="absolute top-3 left-4 label-micro text-white bg-accent/80 backdrop-blur-sm px-2.5 py-1 rounded-full">Mon-Fri 11am-2pm</span>
                        </div>
                        <div className="relative p-5">
                            <div className="flex items-baseline justify-between mb-1.5">
                                <h4 className="font-serif text-[1.15rem] leading-tight text-text">
                                    Office Lunch Special
                                </h4>
                                <span className="font-serif text-[1rem] text-accent mt-1">From $15</span>
                            </div>
                            <p className="font-sans text-[12px] leading-[1.5] text-text-muted">
                                Choice of Selected Meal + Any Can Drink
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="label-micro text-accent opacity-0 transition-opacity group-hover:opacity-100">View Deal</span>
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-white">
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </span>
                            </div>
                        </div>
                    </a>

                    {/* Offer 3 — Office Catering */}
                    <a href="#contact" className="offer-card invisible group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2320] to-[#1a1614] transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5">
                        <div className="relative h-40 sm:h-36 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop"
                                alt="Office catering — sandwiches wraps and pastries spread"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614] via-[#1a1614]/30 to-transparent" />
                            <span className="absolute top-3 left-4 label-micro text-white bg-accent/80 backdrop-blur-sm px-2.5 py-1 rounded-full">Pre-order</span>
                        </div>
                        <div className="relative p-5">
                            <div className="flex items-baseline justify-between mb-1.5">
                                <h4 className="font-serif text-[1.15rem] leading-tight text-white">
                                    Office Catering
                                </h4>
                                <span className="font-serif text-[1rem] text-accent mt-1">From $15 pp</span>
                            </div>
                            <p className="font-sans text-[12px] leading-[1.5] text-white/80">
                                Sandwiches · Wraps · Pastries · Coffee
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="label-micro text-white/70">10% Off All Catering Orders</span>
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent transition-all group-hover:bg-accent group-hover:text-white">
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Category Tabs — Pill shaped */}
            <div className="relative z-10">
                <div className="content-container">
                    <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar py-2">
                        {MENU_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`label-micro whitespace-nowrap px-6 py-2.5 rounded-full transition-all duration-300 ${
                                    activeTab === cat
                                        ? "bg-accent text-[#1a1512] shadow-md font-bold border border-accent"
                                        : "bg-transparent text-text-muted hover:text-accent border border-transparent"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Area */}
            <div className="content-container mt-16 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                    <div>
                        <h3 className="font-serif text-[2.5rem] sm:text-[3rem] leading-none tracking-[-0.02em] text-text mb-3">
                            {activeTab}
                        </h3>
                        <p className="font-sans text-[15px] text-text-muted">
                            Fresh ingredients, bold flavours, and all your favourites.
                        </p>
                    </div>
                </div>

                <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                    {filteredMenu.map((item, idx) => (
                        <div key={`${item.name}-${idx}`} className="menu-card invisible group cursor-pointer">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone mb-5">
                                <Image
                                    src={getPlaceholderImage(item.category)}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                {item.special && (
                                    <span className="absolute top-3 right-3 label-micro text-white bg-accent/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        Special
                                    </span>
                                )}
                            </div>
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                                <h4 className="font-serif text-[1.35rem] leading-[1.1] tracking-[-0.01em] text-text">
                                    {item.name}
                                </h4>
                                <span className="font-sans text-[13px] font-medium text-text shrink-0">
                                    {item.price}
                                </span>
                            </div>
                            {item.desc && (
                                <p className="font-sans text-[13px] leading-[1.6] text-text-muted">
                                    {item.desc}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar: consistent with other sections */}
            <div className="mt-16 sm:mt-20 pb-16 sm:pb-20 relative z-10">
                <GMDivider 
                    leftText="Golden Moment" 
                    rightText="Canberra · ACT" 
                />
            </div>
        </section>
    );
}
