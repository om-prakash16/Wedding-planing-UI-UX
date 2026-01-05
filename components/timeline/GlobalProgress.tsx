"use client";

import { motion } from "framer-motion";

interface GlobalProgressProps {
    percentage: number;
    remainingTasks: number;
}

export function GlobalProgress({ percentage, remainingTasks }: GlobalProgressProps) {
    return (
        <div className="rounded-2xl bg-gradient-to-r from-wedding-slate to-wedding-slate/90 p-6 text-white shadow-lg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-lg font-medium">Preparation Progress</h2>
                    <p className="text-white/60 text-sm">
                        {percentage === 100
                            ? "You are fully prepared! Relax and enjoy."
                            : `${remainingTasks} tasks remaining to reach your dream wedding.`}
                    </p>
                </div>
                <div className="text-3xl font-bold font-serif">{percentage}%</div>
            </div>

            <div className="relative mt-6 h-2 w-full rounded-full bg-white/20">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full rounded-full bg-wedding-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
            </div>
        </div>
    );
}
