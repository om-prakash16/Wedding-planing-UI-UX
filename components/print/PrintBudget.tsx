"use client";

import { useBudget } from "@/hooks/useBudget";

export function PrintBudget() {
    const { items, totals } = useBudget();

    return (
        <div className="print-section break-before-page pt-8">
            <h2 className="font-serif text-2xl font-bold bg-wedding-slate/5 border-b-2 border-wedding-slate/20 p-2 mb-4">
                Budget Planner
            </h2>

            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2 w-[30%]">Category / Item</th>
                        <th className="py-2 w-[30%]">Description</th>
                        <th className="py-2 text-right">Estimated</th>
                        <th className="py-2 text-right">Actual</th>
                        <th className="py-2 text-right">Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-2 font-medium">{item.category}</td>
                            <td className="py-2 italic text-gray-600">{item.description}</td>
                            <td className="py-2 text-right">₹{item.estimatedCost.toLocaleString()}</td>
                            <td className="py-2 text-right">₹{item.actualCost.toLocaleString()}</td>
                            <td className="py-2 text-right">₹{item.paidAmount.toLocaleString()}</td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-50 border-t-2 border-black">
                        <td className="py-3" colSpan={2}>TOTALS</td>
                        <td className="py-3 text-right">₹{totals.estimated.toLocaleString()}</td>
                        <td className="py-3 text-right">₹{totals.actual.toLocaleString()}</td>
                        <td className="py-3 text-right">₹{totals.paid.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
