"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MoodItem } from "@/hooks/useMoodBoards";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InspirationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Omit<MoodItem, "id">) => void;
}

export function InspirationModal({ isOpen, onClose, onSave }: InspirationModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState("");
    const [note, setNote] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image too large. Max 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
            onSave({ image, note });
            onClose();
            setImage("");
            setNote("");
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
                        } as any)}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-wedding-slate/40 backdrop-blur-sm"
                    />
                    <motion.div
                        {...({
                            initial: { opacity: 0, scale: 0.95, y: 20 },
                            animate: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 0.95, y: 20 }
                        } as any)}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl border border-wedding-gold/20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-2xl font-bold text-wedding-slate">Add Inspiration</h2>
                            <button onClick={onClose} className="rounded-full p-1 hover:bg-wedding-ivory">
                                <X className="h-5 w-5 text-wedding-slate/60" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={cn(
                                        "relative h-48 w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-wedding-ivory overflow-hidden",
                                        image ? "border-transparent" : "border-wedding-gold/30"
                                    )}
                                >
                                    {image ? (
                                        <img src={image} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <>
                                            <div className="bg-wedding-blush p-4 rounded-full mb-3">
                                                <Upload className="h-6 w-6 text-wedding-maroon" />
                                            </div>
                                            <p className="text-sm font-medium text-wedding-slate/60">Upload Image</p>
                                            <p className="text-[10px] text-wedding-slate/40 mt-1">PNG, JPG up to 2MB</p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 block mb-1">Notes / Caption</label>
                                <Input
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="e.g. Love this color combination"
                                />
                            </div>

                            <div className="pt-2 flex justify-end space-x-3">
                                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button type="submit" disabled={!image}>Save Item</Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
