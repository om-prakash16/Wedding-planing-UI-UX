"use client";

import { Guest, Side, RSVPStatus, FoodPref } from "@/hooks/useGuests";
import { Trash2, Phone, User, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GuestTableProps {
    guests: Guest[];
    onUpdate: (id: string, updates: Partial<Guest>) => void;
    onDelete: (id: string) => void;
}

export function GuestTable({ guests, onUpdate, onDelete }: GuestTableProps) {

    const getRSVPBadge = (status: RSVPStatus) => {
        switch (status) {
            case "Yes": return "bg-green-100 text-green-700 border-green-200";
            case "No": return "bg-red-50 text-red-600 border-red-100";
            default: return "bg-orange-50 text-orange-600 border-orange-100";
        }
    };

    if (guests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-wedding-gold/20 bg-wedding-ivory/30">
                <User className="h-12 w-12 text-wedding-gold/40 mb-3" />
                <h3 className="font-serif text-lg text-wedding-slate/80">No guests found</h3>
                <p className="text-sm text-wedding-slate/50">Add your first guest to get started</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:gap-0">

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-wedding-gold/10 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-wedding-ivory text-wedding-slate/60 border-b border-wedding-gold/10">
                        <tr>
                            <th className="px-6 py-4 font-serif font-medium">Guest Name</th>
                            <th className="px-6 py-4 font-serif font-medium">Contact</th>
                            <th className="px-6 py-4 font-serif font-medium">Side</th>
                            <th className="px-6 py-4 font-serif font-medium">RSVP</th>
                            <th className="px-6 py-4 font-serif font-medium">Food</th>
                            <th className="px-6 py-4 font-serif font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-wedding-gold/5">
                        <AnimatePresence>
                            {guests.map((guest) => (
                                <motion.tr
                                    key={guest.id}
                                    {...({
                                        initial: { opacity: 0 },
                                        animate: { opacity: 1 },
                                        exit: { opacity: 0 }
                                    } as any)}
                                    layout
                                    className="group hover:bg-wedding-ivory/30 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-wedding-slate">{guest.name}</div>
                                        {guest.notes && <div className="text-[10px] text-wedding-slate/40 truncate max-w-[150px]">{guest.notes}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-wedding-slate/60 select-all">{guest.phone || "-"}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                                            guest.side === "Bride" ? "bg-wedding-blush text-wedding-maroon border-wedding-maroon/10" : "bg-blue-50 text-blue-700 border-blue-100"
                                        )}>
                                            {guest.side}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={guest.rsvp}
                                            onChange={(e) => onUpdate(guest.id, { rsvp: e.target.value as RSVPStatus })}
                                            className={cn(
                                                "cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold border focus:outline-none focus:ring-1 focus:ring-wedding-gold/50",
                                                getRSVPBadge(guest.rsvp)
                                            )}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => onUpdate(guest.id, { food: "Veg" })}
                                                className={cn("h-4 w-4 rounded-full border flex items-center justify-center", guest.food === "Veg" ? "border-green-600 bg-green-50" : "border-gray-200")}
                                                title="Veg"
                                            >
                                                <div className={cn("h-2 w-2 rounded-full", guest.food === "Veg" ? "bg-green-600" : "bg-transparent")} />
                                            </button>
                                            <button
                                                onClick={() => onUpdate(guest.id, { food: "Non-Veg" })}
                                                className={cn("h-4 w-4 rounded-full border flex items-center justify-center", guest.food === "Non-Veg" ? "border-red-600 bg-red-50" : "border-gray-200")}
                                                title="Non-Veg"
                                            >
                                                <div className={cn("h-2 w-2 rounded-full", guest.food === "Non-Veg" ? "bg-red-600" : "bg-transparent")} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onDelete(guest.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2 text-wedding-slate/40 hover:bg-red-50 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                <AnimatePresence>
                    {guests.map((guest) => (
                        <motion.div
                            key={guest.id}
                            {...({
                                initial: { opacity: 0, y: 10 },
                                animate: { opacity: 1, y: 0 },
                                exit: { opacity: 0 }
                            } as any)}
                            layout
                            className="bg-white rounded-xl p-4 shadow-sm border border-wedding-gold/10 flex flex-col space-y-3"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-wedding-slate">{guest.name}</h3>
                                    <p className="text-xs text-wedding-slate/50 flex items-center mt-1">
                                        <Phone className="h-3 w-3 mr-1" /> {guest.phone}
                                    </p>
                                </div>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                                    guest.side === "Bride" ? "bg-wedding-blush text-wedding-maroon border-wedding-maroon/10" : "bg-blue-50 text-blue-700 border-blue-100"
                                )}>
                                    {guest.side}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                                <select
                                    value={guest.rsvp}
                                    onChange={(e) => onUpdate(guest.id, { rsvp: e.target.value as RSVPStatus })}
                                    className={cn(
                                        "rounded-lg px-2 py-1 text-xs font-semibold border appearance-none",
                                        getRSVPBadge(guest.rsvp)
                                    )}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>

                                <div className="flex items-center space-x-3">
                                    <span className={cn("text-xs font-medium", guest.food === "Veg" ? "text-green-600" : "text-red-600")}>
                                        {guest.food}
                                    </span>
                                    <button
                                        onClick={() => onDelete(guest.id)}
                                        className="text-gray-300 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
