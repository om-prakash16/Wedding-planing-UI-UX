"use client";

import { useWeddingData } from "@/hooks/useWeddingData";
import { Countdown } from "@/components/dashboard/Countdown";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { IndianRupee, Users, CalendarHeart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, updateData, isLoaded } = useWeddingData();

  if (!isLoaded) return null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ weddingDate: e.target.value });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.section
        {...({
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 }
        } as any)}
        className="flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:text-left"
      >
        <div>
          <h1 className="font-serif text-4xl font-bold text-wedding-slate md:text-5xl">
            Welcome, {data.brideName} & {data.groomName}
          </h1>
          <p className="mt-2 text-wedding-slate/60">
            Your journey to forever begins here.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            className="rounded-full border border-wedding-gold/30 bg-white px-4 py-2 text-sm text-wedding-slate focus:border-wedding-gold focus:outline-none"
            value={data.weddingDate || ""}
            onChange={handleDateChange}
          />
        </div>
      </motion.section>

      {/* Countdown Hero */}
      <section className="py-8">
        <Countdown targetDate={data.weddingDate} />
      </section>

      {/* Quick Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg hover:border-wedding-gold/30 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Budget</CardTitle>
            <IndianRupee className="h-4 w-4 text-wedding-gold-dark" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wedding-slate">₹ {data.budgetTotal.toLocaleString('en-IN')}</div>
            <p className="text-xs text-wedding-slate/50">Estimated Budget</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-wedding-gold/30 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Guest List</CardTitle>
            <Users className="h-4 w-4 text-wedding-gold-dark" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wedding-slate">0</div>
            <p className="text-xs text-wedding-slate/50">Guests Added</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-wedding-gold/30 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Days To Go</CardTitle>
            <CalendarHeart className="h-4 w-4 text-wedding-gold-dark" />
          </CardHeader>
          <CardContent>
            {/* Simple logic for days left or generic message if null */}
            <div className="text-2xl font-bold text-wedding-slate">
              {data.weddingDate
                ? Math.max(0, Math.ceil((+new Date(data.weddingDate) - +new Date()) / (1000 * 60 * 60 * 24)))
                : "-"}
            </div>
            <p className="text-xs text-wedding-slate/50">Until the big day</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions / Getting Started */}
      <section className="rounded-3xl bg-wedding-ivory p-8 mt-8 border border-wedding-gold/10">
        <h2 className="font-serif text-2xl font-semibold text-wedding-slate mb-4">Continue Planning</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/budget">
            <div className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all border border-wedding-gold/5">
              <div className="flex items-center space-x-4">
                <div className="bg-wedding-blush p-3 rounded-full">
                  <IndianRupee className="h-5 w-5 text-wedding-maroon" />
                </div>
                <div>
                  <h3 className="font-semibold text-wedding-slate">Manage Budget</h3>
                  <p className="text-sm text-wedding-slate/60">Track expenses and allocations</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-wedding-gold-dark opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>

          <Link href="/guests">
            <div className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all border border-wedding-gold/5">
              <div className="flex items-center space-x-4">
                <div className="bg-wedding-blush p-3 rounded-full">
                  <Users className="h-5 w-5 text-wedding-maroon" />
                </div>
                <div>
                  <h3 className="font-semibold text-wedding-slate">Guest List</h3>
                  <p className="text-sm text-wedding-slate/60">Manage RSVPs and Invites</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-wedding-gold-dark opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
