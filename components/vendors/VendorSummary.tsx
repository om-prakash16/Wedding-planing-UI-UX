"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Store, IndianRupee, Wallet } from "lucide-react";

interface VendorSummaryProps {
    totals: {
        total: number;
        paid: number;
    };
    count: number;
}

export function VendorSummary({ totals, count }: VendorSummaryProps) {
    const pending = totals.total - totals.paid;

    return (
        <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-wedding-ivory border-l-4 border-l-wedding-gold">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Total Vendors</CardTitle>
                    <Store className="h-4 w-4 text-wedding-gold-dark" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-wedding-slate">{count}</div>
                </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-wedding-slate">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Total Cost</CardTitle>
                    <Wallet className="h-4 w-4 text-wedding-slate" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-wedding-slate">₹ {totals.total.toLocaleString('en-IN')}</div>
                </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Paid Amount</CardTitle>
                    <IndianRupee className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-green-700">₹ {totals.paid.toLocaleString('en-IN')}</div>
                </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-red-400">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-wedding-slate/60">Pending</CardTitle>
                    <IndianRupee className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-red-600">₹ {pending.toLocaleString('en-IN')}</div>
                </CardContent>
            </Card>
        </div>
    );
}
