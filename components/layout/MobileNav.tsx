"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    IndianRupee,
    Users,
    Menu
} from "lucide-react";
import { useState } from "react";
// import { Sidebar } from "./Sidebar";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // We might need a Sheet component for full menu on mobile if items are too many.

// For mobile bottom bar, we show max 4-5 core items, others in a "More" menu?
// Let's stick to a simple bottom bar for core, and maybe a drawer for others.
// Actually, user requested "Bottom tab bar (mobile)".
// Given 8 items, 5 icons on bottom bar is standard.
// Let's put Dashboard, Budget, Guests, Timeline, More.

const mobileNavItems = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/budget", label: "Budget", icon: IndianRupee },
    { href: "/guests", label: "Guests", icon: Users },
    // { href: "/timeline", label: "Plan", icon: CalendarHeart },
];

export function MobileNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Spacer for bottom nav */}
            <div className="h-20 w-full md:hidden" />

            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-wedding-gold/20 bg-white/90 px-2 pb-2 pt-2 backdrop-blur-lg md:hidden">
                {mobileNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 p-2 transition-colors",
                                isActive ? "text-wedding-gold-dark" : "text-wedding-slate/60"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6", isActive && "fill-current/20")} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}

                {/* More Button to toggle a drawer or just link to a menu page? 
            For simplicity in this phase, let's use a simple state to show full menu overlay or just a link to valid page.
            Let's implement a simple Overlay Menu for "More"
        */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex flex-col items-center justify-center space-y-1 p-2 transition-colors text-wedding-slate/60",
                        isOpen && "text-wedding-gold-dark"
                    )}
                >
                    <Menu className="h-6 w-6" />
                    <span className="text-[10px] font-medium">More</span>
                </button>
            </nav>

            {/* Mobile Full Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-wedding-ivory/95 backdrop-blur-xl md:hidden animate-fade-in p-8">
                    <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 text-wedding-slate">
                        ✕ Close
                    </button>
                    <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                        {/* Full list links */}
                        <Link href="/vendors" onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm space-y-2">
                            <span className="font-serif text-lg text-wedding-slate">Vendors</span>
                        </Link>
                        <Link href="/timeline" onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm space-y-2">
                            <span className="font-serif text-lg text-wedding-slate">Timeline</span>
                        </Link>
                        <Link href="/outfits" onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm space-y-2">
                            <span className="font-serif text-lg text-wedding-slate">Outfits</span>
                        </Link>
                        <Link href="/moodboard" onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm space-y-2">
                            <span className="font-serif text-lg text-wedding-slate">Mood Board</span>
                        </Link>
                        <Link href="/print" onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm space-y-2 col-span-2">
                            <span className="font-serif text-lg text-wedding-slate">Print Mode</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
