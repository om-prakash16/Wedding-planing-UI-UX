"use client";

import { useWeddingData } from "@/hooks/useWeddingData";
import { useBudget } from "@/hooks/useBudget";
import { useGuests } from "@/hooks/useGuests";
import { useVendors } from "@/hooks/useVendors";
import { format } from "date-fns";

export function PrintDashboard() {
    const { data } = useWeddingData();
    const { totals: budgetTotals } = useBudget();
    const { stats: guestStats } = useGuests();
    const { totals: vendorTotals, vendors } = useVendors();

    const formattedDate = data.date
        ? format(new Date(data.date), "MMMM do, yyyy")
        : "Date Not Set";

    const variance = budgetTotals.estimated - budgetTotals.actual;

    return (
        <div className="print-section mb-12">
            <div className="text-center mb-10 border-b-2 border-wedding-slate/10 pb-6">
                <h1 className="font-serif text-5xl font-bold text-wedding-slate mb-2">
                    {data.coupleName || "Our Wedding"}
                </h1>
                <p className="font-serif text-xl italic text-wedding-slate/70">{formattedDate}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="p-4 border border-wedding-slate/20 rounded-lg">
                    <h3 className="font-serif text-lg font-bold mb-1">Budget Overview</h3>
                    <div className="flex justify-between text-sm py-1 border-b border-wedding-slate/10">
                        <span>Estimate:</span>
                        <span className="font-bold">₹{budgetTotals.estimated.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-wedding-slate/10">
                        <span>Actual:</span>
                        <span className="font-bold">₹{budgetTotals.actual.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 pt-2">
                        <span>Variance:</span>
                        <span className={`${variance < 0 ? 'text-red-700' : 'text-green-700'} font-bold`}>
                            ₹{variance.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="p-4 border border-wedding-slate/20 rounded-lg">
                    <h3 className="font-serif text-lg font-bold mb-1">Guest Summary</h3>
                    <div className="flex justify-between text-sm py-1 border-b border-wedding-slate/10">
                        <span>Total Invited:</span>
                        <span className="font-bold">{guestStats.total}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-wedding-slate/10">
                        <span>Confirmed:</span>
                        <span className="font-bold">{guestStats.confirmed}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 pt-2">
                        <span>Pending:</span>
                        <span className="font-bold">{guestStats.pending}</span>
                    </div>
                </div>

                <div className="p-4 border border-wedding-slate/20 rounded-lg">
                    <h3 className="font-serif text-lg font-bold mb-1">Vendors</h3>
                    <div className="flex justify-between text-sm py-1 border-b border-wedding-slate/10">
                        <span>Hired:</span>
                        <span className="font-bold">{vendors.length}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-wedding-slate/10">
                        <span>Total Cost:</span>
                        <span className="font-bold">₹{vendorTotals.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 pt-2">
                        <span>Due:</span>
                        <span className="font-bold text-red-700">₹{(vendorTotals.total - vendorTotals.paid).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
