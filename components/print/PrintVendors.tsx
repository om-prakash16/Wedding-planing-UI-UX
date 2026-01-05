"use client";

import { useVendors } from "@/hooks/useVendors";

export function PrintVendors() {
    const { vendors } = useVendors();

    return (
        <div className="print-section break-before-page pt-8">
            <h2 className="font-serif text-2xl font-bold bg-wedding-slate/5 border-b-2 border-wedding-slate/20 p-2 mb-4">
                Vendors & Payments
            </h2>

            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2">Vendor</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Contact</th>
                        <th className="py-2 text-right">Total</th>
                        <th className="py-2 text-right">Paid</th>
                        <th className="py-2 text-right">Pending</th>
                        <th className="py-2 text-right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map(vendor => {
                        const pending = vendor.totalAmount - vendor.paidAmount;
                        return (
                            <tr key={vendor.id} className="border-b border-gray-200">
                                <td className="py-2 font-medium">{vendor.name}</td>
                                <td className="py-2 text-xs uppercase text-gray-600">{vendor.type}</td>
                                <td className="py-2">{vendor.phone}</td>
                                <td className="py-2 text-right">₹{vendor.totalAmount.toLocaleString()}</td>
                                <td className="py-2 text-right">₹{vendor.paidAmount.toLocaleString()}</td>
                                <td className="py-2 text-right font-medium">₹{pending.toLocaleString()}</td>
                                <td className="py-2 text-right">
                                    <span className={`px-2 py-0.5 text-[10px] uppercase border rounded ${pending <= 0 ? 'text-green-700 border-green-200' : 'text-red-600 border-red-200'}`}>
                                        {pending <= 0 ? "Paid" : "Due"}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
