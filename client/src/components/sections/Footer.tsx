"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#0a0806] text-white pt-16 sm:pt-20 pb-8 overflow-hidden font-sans">
            {/* Background Texture Overlay */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: 'url("/images/footer.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div className="content-container relative z-10">
                {/* TOP MAIN SECTION */}
                <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-12 sm:pb-16 border-b border-white/10">

                    {/* Column 1: Brand & CTA (approx 40%) */}
                    <div className="lg:w-[40%] flex flex-col gap-10">
                        {/* Logo Lockup */}
                        <div className="flex items-center gap-5">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#d2a373]/30 shadow-lg flex-shrink-0">
                                <Image
                                    src="/logo/Logo _cafe.jpeg"
                                    alt="Golden Moment Logo"
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="font-serif text-[18px] sm:text-[20px] leading-none text-[#d2a373] tracking-[0.15em] uppercase">
                                    Golden Moment
                                </h2>
                                <p className="font-sans text-[10px] sm:text-[11px] text-[#d2a373]/80 mt-2 uppercase tracking-[0.25em]">
                                    Café & Restaurant
                                </p>
                            </div>
                        </div>

                        {/* CTA Text */}
                        <div className="mt-2">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-sans text-[11px] text-[#d2a373] uppercase tracking-[0.15em]">
                                    Dine with us
                                </span>
                                <span className="w-8 h-px bg-[#d2a373]/50" />
                            </div>
                            <h3 className="font-serif text-[2.5rem] sm:text-[3.25rem] leading-[1.1] tracking-[-0.02em] text-[#f8f5f2] mb-6">
                                Great food. Good<br />company.
                            </h3>
                            <p className="font-sans text-[14px] leading-[1.7] text-white/60 max-w-[400px]">
                                Whether it&apos;s a quick coffee, a relaxed lunch or a family dinner, Golden Moment is here for every occasion.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: 3 Columns (approx 60%) */}
                    <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 pt-2">

                        {/* Column 2: Explore */}
                        <div className="flex flex-col sm:border-r border-white/10 sm:pr-6">
                            <h4 className="font-sans text-[12px] text-[#d2a373] uppercase tracking-[0.15em] mb-8">
                                Explore
                            </h4>
                            <ul className="flex flex-col gap-4">
                                {['Home', 'About Us', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="font-sans text-[14px] text-white/80 hover:text-[#d2a373] transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Our Menu */}
                        <div className="flex flex-col sm:border-r border-white/10 sm:pr-6">
                            <h4 className="font-sans text-[12px] text-[#d2a373] uppercase tracking-[0.15em] mb-8">
                                Our Menu
                            </h4>
                            <ul className="flex flex-col gap-4">
                                {['Coffee', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Beverages'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="font-sans text-[14px] text-white/80 hover:text-[#d2a373] transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Visit & Book */}
                        <div className="flex flex-col sm:pl-4">

                            {/* Visit Us */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-4 h-4 text-[#d2a373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <h4 className="font-sans text-[12px] text-[#d2a373] uppercase tracking-[0.15em]">
                                        Visit Us
                                    </h4>
                                </div>
                                <p className="font-sans text-[14px] leading-[1.8] text-white/80 pl-7">
                                    Shop 4/14 Moore St,<br />
                                    Canberra ACT 2601
                                </p>
                            </div>

                            {/* Open Daily */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-4 h-4 text-[#d2a373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    <h4 className="font-sans text-[12px] text-[#d2a373] uppercase tracking-[0.15em]">
                                        Open Daily
                                    </h4>
                                </div>
                                <p className="font-sans text-[14px] leading-[1.8] text-white/80 pl-7">
                                    7:00 AM – 4:00 PM
                                </p>
                            </div>

                            {/* Book Button */}
                            <Link
                                href="#contact"
                                className="group flex items-center justify-center gap-3 bg-[#d2a373] text-[#110e0c] self-start rounded-full py-3.5 px-6 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">Book A Table</span>
                                <svg 
                                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </Link>

                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR SECTION */}
                <div className="pt-6 flex flex-col xl:flex-row items-center justify-between gap-6">

                    {/* Left: Logo small */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#d2a373]/30">
                            <Image
                                src="/logo/Logo _cafe.jpeg"
                                alt="Golden Moment Logo"
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="font-serif text-[14px] leading-none text-[#d2a373] tracking-[0.15em] uppercase">
                                Golden Moment
                            </h2>
                            <p className="font-sans text-[8px] text-[#d2a373]/80 mt-1.5 uppercase tracking-[0.25em]">
                                Café & Restaurant
                            </p>
                        </div>
                    </div>

                    {/* Middle: Tagline & Separator */}
                    <div className="flex items-center gap-8 lg:gap-16">
                        <span className="w-12 h-px bg-[#d2a373]/30 hidden md:block" />
                        <div className="flex items-center gap-3 sm:gap-6 font-sans text-[10px] text-[#d2a373] uppercase tracking-[0.2em]">
                            <span>Good Food</span>
                            <span className="text-[#d2a373]/40">/</span>
                            <span>Great Vibes</span>
                            <span className="text-[#d2a373]/40">/</span>
                            <span>Always</span>
                        </div>
                    </div>

                    {/* Right: Socials & Copyright */}
                    <div className="flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-12">
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-[#d2a373] hover:text-[#d2a373] transition-all">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="5" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-[#d2a373] hover:text-[#d2a373] transition-all">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            {/* Trip Advisor / Generic */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-[#d2a373] hover:text-[#d2a373] transition-all">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-center md:text-right font-sans text-[11px] leading-[1.6] text-white/40">
                            <p>© {new Date().getFullYear()} Golden Moment Café & Restaurant.</p>
                            <p>All rights reserved.</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
