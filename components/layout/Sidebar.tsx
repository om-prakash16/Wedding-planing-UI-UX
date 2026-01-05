"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    IndianRupee,
    Users,
    Store,
    CalendarHeart,
    Shirt,
    Palette,
    Printer,
    HeartHandshake
} from "lucide-react";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/budget", label: "Budget", icon: IndianRupee },
    { href: "/guests", label: "Guest List", icon: Users },
    { href: "/vendors", label: "Vendors", icon: Store },
    { href: "/timeline", label: "Timeline", icon: CalendarHeart },
    { href: "/outfits", label: "Outfits", icon: Shirt },
    { href: "/moodboard", label: "Mood Board", icon: Palette },
    { href: "/print", label: "Print Mode", icon: Printer },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden h-screen w-64 flex-col border-r border-wedding-gold/20 bg-wedding-ivory px-4 py-8 md:flex fixed top-0 left-0 overflow-y-auto">
            <div className="mb-10 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="mb-2 rounded-full bg-wedding-gold/10 p-3">
                        <HeartHandshake className="h-8 w-8 text-wedding-gold-dark" />
                    </div>
                    <h1 className="font-serif text-2xl font-bold text-wedding-gold-dark">
                        Wedding Planner
                    </h1>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200",
                                isActive
                                    ? "bg-wedding-gold text-white shadow-md"
                                    : "text-wedding-slate hover:bg-wedding-blush hover:text-wedding-maroon"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-white" : "text-wedding-gold-dark group-hover:text-wedding-maroon"
                                )}
                            />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-8 text-center text-xs text-wedding-slate/60">
                <p>Designed with Love</p>
            </div>
        </aside>
    );
}
