"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CountdownProps {
    targetDate: string | null;
}

export function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<{
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!targetDate) return;

        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                return {
                    months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
                    days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!targetDate) {
        return (
            <div className="flex h-32 w-full flex-col items-center justify-center rounded-3xl bg-wedding-gold/5 p-6 text-center text-wedding-gold-dark">
                <p className="font-serif text-lg">Set your wedding date to see the countdown</p>
            </div>
        );
    }

    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-wedding-gold/10 md:h-20 md:w-20">
                <span className="font-serif text-2xl font-bold text-wedding-gold-dark md:text-4xl">
                    {value}
                </span>
            </div>
            <span className="mt-2 text-xs font-medium uppercase tracking-wider text-wedding-slate/60 md:text-sm">
                {label}
            </span>
        </div>
    );

    return (
        <motion.div
            {...({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
            } as any)}
            className="flex w-full justify-center space-x-3 md:space-x-8"
        >
            <TimeBox value={timeLeft.months} label="Months" />
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            {/* <TimeBox value={timeLeft.minutes} label="Mins" /> */}
        </motion.div>
    );
}
