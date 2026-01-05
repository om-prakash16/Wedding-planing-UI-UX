"use client";

import { useState } from "react";
import { PrintDashboard } from "@/components/print/PrintDashboard";
import { PrintBudget } from "@/components/print/PrintBudget";
import { PrintGuests } from "@/components/print/PrintGuests";
import { PrintVendors } from "@/components/print/PrintVendors";
import { PrintTimeline } from "@/components/print/PrintTimeline";
import { PrintOutfits } from "@/components/print/PrintOutfits";
import { PrintMoodBoards } from "@/components/print/PrintMoodBoards";
import { Button } from "@/components/ui/Button";
import { Printer, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PrintPage() {
    const [sections, setSections] = useState({
        dashboard: true,
        budget: true,
        guests: true,
        vendors: true,
        timeline: true,
        outfits: true,
        moodboards: true,
    });

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 print:bg-white text-black">
            {/* Screen-Only Controls */}
            <div className="print:hidden fixed top-0 left-0 w-80 h-full bg-white border-r border-gray-200 p-6 z-50 overflow-y-auto shadow-lg">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-4">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Planner
                    </Link>
                    <h1 className="font-serif text-2xl font-bold mb-1">Print Planner</h1>
                    <p className="text-xs text-gray-500">Select sections to include in your printed booklet.</p>
                </div>

                <div className="space-y-3 mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Sections</h3>
                    {Object.entries(sections).map(([key, checked]) => (
                        <button
                            key={key}
                            onClick={() => toggleSection(key as keyof typeof sections)}
                            className={cn(
                                "w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all",
                                checked
                                    ? "bg-wedding-slate text-white border-wedding-slate shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            <span className="capitalize">{key === 'moodboards' ? 'Mood Boards' : key}</span>
                            {checked && <Check className="h-4 w-4" />}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    <Button className="w-full justify-center" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <p className="text-[10px] text-center text-gray-400">
                        Tip: In print settings, enable &quot;Background graphics&quot; for best results.
                    </p>
                </div>
            </div>

            {/* Printable Content Area */}
            <div className="pl-80 print:pl-0 p-8 print:p-0 max-w-5xl mx-auto print:max-w-none">
                {/* Print Filter: Only render if checked */}

                {sections.dashboard && <PrintDashboard />}
                {sections.budget && <div className="print:break-before-page"><PrintBudget /></div>}
                {sections.guests && <div className="print:break-before-page"><PrintGuests /></div>}
                {sections.vendors && <div className="print:break-before-page"><PrintVendors /></div>}
                {sections.timeline && <div className="print:break-before-page"><PrintTimeline /></div>}
                {sections.outfits && <div className="print:break-before-page"><PrintOutfits /></div>}
                {sections.moodboards && <div className="print:break-before-page"><PrintMoodBoards /></div>}

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-100 text-center text-[10px] text-gray-400 uppercase tracking-widest print:fixed print:bottom-4 print:left-0 print:w-full">
                    Planned with Digital Wedding Planner
                </div>
            </div>

            {/* Styles for print hiding of layout elements handled by global css or tailwind `print:hidden` */}
        </div>
    );
}
