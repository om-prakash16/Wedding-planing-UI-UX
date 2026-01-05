"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Vendor, VendorType } from "@/hooks/useVendors";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vendor: Omit<Vendor, "id"> | Vendor) => void;
    initialData?: Vendor;
}

const VENDOR_TYPES: VendorType[] = ["Caterer", "Photographer", "Decorator", "Makeup Artist", "Venue", "Other"];

export function VendorModal({ isOpen, onClose, onSave, initialData }: VendorModalProps) {
    const [formData, setFormData] = useState<Partial<Vendor>>({
        name: "",
        type: "Other",
        phone: "",
        totalAmount: 0,
        paidAmount: 0,
        notes: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", type: "Other", phone: "", totalAmount: 0, paidAmount: 0, notes: "" });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name) {
            // Logic same as Outfit modal: blind pass
            onSave(formData as Vendor);
            onClose();
        }
    };

    const pendingAmount = (formData.totalAmount || 0) - (formData.paidAmount || 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-wedding-slate/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl border border-wedding-gold/20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-2xl font-bold text-wedding-slate">{initialData ? "Edit Vendor" : "Add Vendor"}</h2>
                            <button onClick={onClose} className="rounded-full p-1 hover:bg-wedding-ivory">
                                <X className="h-5 w-5 text-wedding-slate/60" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Vendor Name</label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Royal Decorators"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Type</label>
                                    <select
                                        className="h-10 w-full mt-1 rounded-xl border border-wedding-gold/20 bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as VendorType })}
                                    >
                                        {VENDOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Phone</label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91..."
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Total Cost</label>
                                    <Input
                                        type="number"
                                        value={formData.totalAmount}
                                        onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Paid So Far</label>
                                    <Input
                                        type="number"
                                        value={formData.paidAmount}
                                        onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="col-span-2 bg-wedding-ivory p-3 rounded-lg border border-wedding-gold/10 flex justify-between items-center">
                                    <span className="text-sm font-medium text-wedding-slate/60">Pending Amount</span>
                                    <span className={`text-lg font-bold ${pendingAmount > 0 ? "text-red-500" : "text-green-600"}`}>
                                        ₹ {pendingAmount.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Notes</label>
                                    <Input
                                        value={formData.notes || ""}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Payment terms, deadlines..."
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end space-x-3 border-t border-wedding-gold/10">
                                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button type="submit">Save Vendor</Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
