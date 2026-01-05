"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export function SidebarContextWrapper() {
    return <Sidebar />;
}

export function MobileNavContextWrapper() {
    return <MobileNav />;
}
