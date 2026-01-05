"use client";

import { useWeddingData } from "@/hooks/useWeddingData";
import { CalendarHeart } from "lucide-react";
import { motion } from "framer-motion";

export function TimelineHeader() {
    const { data } = useWeddingData();

    const daysLeft = data.weddingDate
        ? Math.max(0, Math.ceil((+new Date(data.weddingDate) - +new Date()) / (1000 * 60 * 60 * 24)))
        : 0;

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <motion.div {...({ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } } as any)}>
                <h1 className="font-serif text-3xl font-bold text-wedding-slate">Wedding Timeline</h1>
                <p className="text-wedding-slate/60">Step-by-step planning from today to your big day</p>
            </motion.div>

            <motion.div
                {...({
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)}
                className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full border border-wedding-gold/20 shadow-sm"
            >
                <div className="bg-wedding-blush p-2 rounded-full">
                    <CalendarHeart className="h-5 w-5 text-wedding-maroon" />
                </div>
                <div>
                    <p className="text-xs text-wedding-slate/50 font-medium uppercase tracking-wider">Countdown</p>
                    <p className="text-lg font-bold text-wedding-slate leading-none">
                        {daysLeft > 0 ? `${daysLeft} days` : "Big Day!"}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
