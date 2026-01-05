"use client";

import { Vendor, VendorType } from "@/hooks/useVendors";
import { Edit2, Trash2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VendorListProps {
    vendors: Vendor[];
    onEdit: (vendor: Vendor) => void;
    onDelete: (id: string) => void;
}

export function VendorList({ vendors, onEdit, onDelete }: VendorListProps) {

    if (vendors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-wedding-gold/20 bg-wedding-ivory/30">
                <h3 className="font-serif text-lg text-wedding-slate/80">No vendors added yet</h3>
                <p className="text-sm text-wedding-slate/50">Add your first vendor to start tracking payments.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {vendors.map((vendor) => {
                const pending = vendor.totalAmount - vendor.paidAmount;
                const status = pending <= 0 ? "Paid" : vendor.paidAmount > 0 ? "Partially Paid" : "Pending";

                return (
                    <motion.div
                        key={vendor.id}
                        {...({
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            exit: { opacity: 0 }
                        } as any)}
                        className="group bg-white rounded-xl p-5 shadow-sm border border-wedding-gold/10 hover:shadow-md hover:border-wedding-gold/30 transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-serif text-lg font-bold text-wedding-slate">{vendor.name}</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-wedding-ivory border border-wedding-gold/20 text-[10px] uppercase font-medium tracking-wide text-wedding-slate/60">
                                        {vendor.type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-wedding-slate/50">
                                    {vendor.phone && (
                                        <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {vendor.phone}</span>
                                    )}
                                    {vendor.notes && (
                                        <span className="truncate max-w-[200px] hidden md:block">• {vendor.notes}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 md:gap-8 border-t md:border-t-0 border-wedding-gold/10 pt-4 md:pt-0">
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-wedding-slate/40">Total</p>
                                    <p className="font-medium text-wedding-slate">₹ {vendor.totalAmount.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-wedding-slate/40">Paid</p>
                                    <p className="font-medium text-green-600">₹ {vendor.paidAmount.toLocaleString()}</p>
                                </div>
                                <div className="text-right min-w-[80px]">
                                    <p className="text-[10px] uppercase text-wedding-slate/40">Pending</p>
                                    <p className={`font-bold ${pending > 0 ? "text-red-500" : "text-green-600"}`}>
                                        ₹ {pending.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 pl-4 border-l border-wedding-gold/10">
                                    <button
                                        onClick={() => onEdit(vendor)}
                                        className="p-2 rounded-full text-wedding-slate/40 hover:bg-wedding-ivory hover:text-wedding-slate transition-colors"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(vendor.id)}
                                        className="p-2 rounded-full text-wedding-slate/40 hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
