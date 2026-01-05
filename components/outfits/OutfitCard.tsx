"use client";

import { Outfit, PersonType } from "@/hooks/useOutfits";
import { Edit2, Trash2, Camera, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface OutfitCardProps {
    outfit: Outfit;
    onEdit: (outfit: Outfit) => void;
    onDelete: (id: string) => void;
}

export function OutfitCard({ outfit, onEdit, onDelete }: OutfitCardProps) {
    return (
        <motion.div
            {...({
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 }
            } as any)}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-wedding-gold/10"
        >
            {/* Actions Overlay */}
            <div className="absolute top-3 right-3 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(outfit)}
                    className="rounded-full bg-white/90 p-2 text-wedding-slate shadow-md hover:text-wedding-gold-dark backdrop-blur-sm"
                >
                    <Edit2 className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onDelete(outfit.id)}
                    className="rounded-full bg-white/90 p-2 text-red-400 shadow-md hover:text-red-600 backdrop-blur-sm"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            {/* Image Section */}
            <div className="relative aspect-[3/4] w-full bg-wedding-ivory flex items-center justify-center overflow-hidden">
                {outfit.image ? (
                    // Using standard img for user-uploaded base64/blob to avoid Next.js Image config complexity with dynamic sources
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-wedding-gold/30">
                        <Camera className="h-12 w-12 mb-2" />
                        <span className="text-xs uppercase tracking-widest">No Image</span>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-white backdrop-blur-md border border-white/10 uppercase tracking-wider">
                            {outfit.type}
                        </span>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-4">
                <h3 className="font-serif text-lg font-bold text-wedding-slate">{outfit.name}</h3>
                {outfit.notes ? (
                    <p className="text-xs text-wedding-slate/60 mt-1 line-clamp-2">{outfit.notes}</p>
                ) : (
                    <p className="text-xs text-wedding-slate/40 mt-1 italic">No notes added</p>
                )}

                {/* Jewelry Summary */}
                <div className="mt-4 pt-3 border-t border-wedding-gold/10 flex flex-wrap gap-2">
                    {outfit.jewelry.necklace && <span className="text-[10px] px-2 py-1 bg-wedding-ivory rounded-md text-wedding-slate/70">Necklace</span>}
                    {outfit.jewelry.earrings && <span className="text-[10px] px-2 py-1 bg-wedding-ivory rounded-md text-wedding-slate/70">Earrings</span>}
                    {/* Only show few */}
                    {Object.keys(outfit.jewelry).length === 0 && (
                        <span className="text-[10px] text-wedding-slate/30 italic">No accessories</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
