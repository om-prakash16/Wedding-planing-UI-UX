"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MoodBoard, BoardType } from "@/hooks/useMoodBoards";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BoardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (board: Omit<MoodBoard, "id" | "items">) => void;
}

const CEREMONY_TYPES: BoardType[] = ["General", "Mehendi", "Sangeet", "Wedding", "Reception"];

export function BoardModal({ isOpen, onClose, onSave }: BoardModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        ceremony: "General" as BoardType,
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title) {
            onSave(formData);
            onClose();
            setFormData({ title: "", ceremony: "General", description: "" });
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
                        className="fixed inset-0 z-50 bg-wedding-slate/40 backdrop-blur-sm"
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
                            <h2 className="font-serif text-2xl font-bold text-wedding-slate">New Mood Board</h2>
                            <button onClick={onClose} className="rounded-full p-1 hover:bg-wedding-ivory">
                                <X className="h-5 w-5 text-wedding-slate/60" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 block mb-1">Board Title</label>
                                <Input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Pastel Floral Décor"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 block mb-1">Ceremony</label>
                                <select
                                    className="h-10 w-full rounded-xl border border-wedding-gold/20 bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                                    value={formData.ceremony}
                                    onChange={(e) => setFormData({ ...formData, ceremony: e.target.value as BoardType })}
                                >
                                    {CEREMONY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 block mb-1">Description</label>
                                <textarea
                                    className="w-full rounded-xl border border-wedding-gold/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-wedding-gold min-h-[80px] resize-none"
                                    placeholder="Ideas about colors, flowers, etc."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex justify-end space-x-3">
                                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button type="submit">Create Board</Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
