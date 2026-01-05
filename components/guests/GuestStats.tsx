"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, CheckCircle, Clock, Utensils } from "lucide-react";
// import { RSVPStatus } from "@/hooks/useGuests";

interface GuestStatsProps {
    stats: {
        total: number;
        confirmed: number;
        pending: number;
        declined: number;
        veg: number;
        nonVeg: number;
    };
}

export function GuestStats({ stats }: GuestStatsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="border-l-4 border-l-wedding-gold bg-wedding-ivory shadow-sm hover:-translate-y-1 transition-transform">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Total Guests</CardTitle>
                    <Users className="h-4 w-4 text-wedding-gold-dark" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-wedding-slate">{stats.total}</div>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 bg-white shadow-sm hover:-translate-y-1 transition-transform">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Confirmed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-green-700">{stats.confirmed}</div>
                    <p className="text-[10px] text-green-600/60 mt-1">RSVP Yes</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-400 bg-white shadow-sm hover:-translate-y-1 transition-transform">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Pending</CardTitle>
                    <Clock className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                    <p className="text-[10px] text-orange-600/60 mt-1">Awaiting Reply</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-wedding-slate bg-white shadow-sm hover:-translate-y-1 transition-transform">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    {/* Veg/Non-Veg Split or Declined? Let's show Veg/NonVeg split since it's more actionable for catering */}
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Food Pref</CardTitle>
                    <Utensils className="h-4 w-4 text-wedding-slate" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-end">
                        <div className="text-sm font-semibold text-green-600">Veg: {stats.veg}</div>
                        <div className="text-sm font-semibold text-red-600">Non: {stats.nonVeg}</div>
                    </div>
                    <p className="text-[10px] text-wedding-slate/40 mt-1">Based on confirmed/pending</p>
                </CardContent>
            </Card>
        </div>
    );
}
