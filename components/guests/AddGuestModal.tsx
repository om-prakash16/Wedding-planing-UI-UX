"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Guest, Side, RSVPStatus, FoodPref } from "@/hooks/useGuests";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddGuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (guest: Omit<Guest, "id">) => void;
}

export function AddGuestModal({ isOpen, onClose, onSave }: AddGuestModalProps) {
    const [formData, setFormData] = useState<Partial<Guest>>({
        name: "",
        phone: "",
        side: "Bride",
        rsvp: "Pending",
        food: "Veg",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name) {
            onSave(formData as Omit<Guest, "id">);
            onClose();
            setFormData({ name: "", phone: "", side: "Bride", rsvp: "Pending", food: "Veg", notes: "" });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        {...({
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any)}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-wedding-slate/20 backdrop-blur-sm"
                    />
                    <motion.div
                        {...({
                            initial: { opacity: 0, scale: 0.95, y: 20 },
                            animate: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 0.95, y: 20 }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any)}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl border border-wedding-gold/20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-2xl font-bold text-wedding-slate">Add New Guest</h2>
                            <button onClick={onClose} className="rounded-full p-1 hover:bg-wedding-ivory">
                                <X className="h-5 w-5 text-wedding-slate/60" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Full Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Ramesh Gupta"
                                    required
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Phone Number</label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+91 98765 43210"
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Side</label>
                                    <div className="mt-1 flex space-x-2">
                                        {["Bride", "Groom"].map((side) => (
                                            <button
                                                key={side}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, side: side as Side })}
                                                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${formData.side === side ? "bg-wedding-blush text-wedding-maroon border border-wedding-maroon/20" : "bg-gray-50 text-wedding-slate/60 hover:bg-gray-100"}`}
                                            >
                                                {side}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">Food</label>
                                    <div className="mt-1 flex space-x-2">
                                        {["Veg", "Non-Veg"].map((food) => (
                                            <button
                                                key={food}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, food: food as FoodPref })}
                                                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${formData.food === food ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-wedding-slate/60 hover:bg-gray-100"}`}
                                            >
                                                {food}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60">RSVP Status</label>
                                <div className="mt-1 flex space-x-2">
                                    {["Pending", "Yes", "No"].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rsvp: status as RSVPStatus })}
                                            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${formData.rsvp === status
                                                ? status === "Yes" ? "bg-green-100 text-green-800" : status === "No" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                                                : "bg-gray-50 text-wedding-slate/60 hover:bg-gray-100"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>


                            <div className="pt-4 flex justify-end space-x-3">
                                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button type="submit">Save Guest</Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
