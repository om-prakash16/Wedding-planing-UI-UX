"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Outfit, PersonType, CeremonyType, Jewelry } from "@/hooks/useOutfits";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface OutfitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (outfit: Omit<Outfit, "id"> | Outfit) => void;
    initialData?: Outfit;
    activePerson: PersonType;
    activeCeremony: CeremonyType;
}

export function OutfitModal({ isOpen, onClose, onSave, initialData, activePerson, activeCeremony }: OutfitModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<Partial<Outfit>>({
        name: "",
        type: "",
        notes: "",
        image: "",
        jewelry: {},
        person: activePerson,
        ceremony: activeCeremony,
    });

    // Load initial data if editing, else reset to props default
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                type: "",
                notes: "",
                image: "",
                jewelry: {},
                person: activePerson,
                ceremony: activeCeremony,
            });
        }
    }, [initialData, isOpen, activePerson, activeCeremony]); // Reset when opening fresh

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB Check
                alert("Image too large. Please use an image under 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name) {
            // If we have an ID (initialData), we pass it all back (though hook handles this, let's just pass form data)
            // The parent handler will decide if it calls add or update based on if ID exists.
            // But here we need to be careful. The hook's `addOutfit` expects Omit<Outfit, 'id'>, `updateOutfit` expects ID.
            // We will blindly pass the data and let the page handler sort it out.
            onSave(formData as Outfit);
            onClose();
        }
    };

    const updateJewelry = (key: keyof Jewelry, value: string) => {
        setFormData(prev => ({
            ...prev,
            jewelry: { ...prev.jewelry, [key]: value }
        }));
    };

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
                        className="fixed left-1/2 top-[5%] bottom-[5%] z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl bg-white shadow-2xl border border-wedding-gold/20 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-wedding-gold/10">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-wedding-slate">{initialData ? "Edit Outfit" : "New Outfit"}</h2>
                                <p className="text-sm text-wedding-slate/50">{activePerson} • {activeCeremony}</p>
                            </div>
                            <button onClick={onClose} className="rounded-full p-2 hover:bg-wedding-ivory transition-colors">
                                <X className="h-5 w-5 text-wedding-slate/60" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            <form id="outfit-form" onSubmit={handleSave} className="space-y-6">
                                {/* Image Upload Area */}
                                <div className="flex justify-center">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={cn(
                                            "relative h-64 w-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-wedding-ivory overflow-hidden",
                                            formData.image ? "border-transparent" : "border-wedding-gold/30"
                                        )}
                                    >
                                        {formData.image ? (
                                            <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="bg-wedding-blush p-4 rounded-full mb-3">
                                                    <Upload className="h-6 w-6 text-wedding-maroon" />
                                                </div>
                                                <p className="text-sm font-medium text-wedding-slate/60">Upload Photo</p>
                                                <p className="text-[10px] text-wedding-slate/40 mt-1">Max 2MB</p>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 mb-1 block">Outfit Name</label>
                                            <Input
                                                required
                                                placeholder="e.g. Royal Red Lehenga"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 mb-1 block">Type / Style</label>
                                            <Input
                                                placeholder="e.g. Silk Saree, Sherwani"
                                                value={formData.type}
                                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 mb-1 block">Ceremony</label>
                                            <select
                                                className="h-10 w-full rounded-xl border border-wedding-gold/20 bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                                                value={formData.ceremony}
                                                onChange={e => setFormData({ ...formData, ceremony: e.target.value as CeremonyType })}
                                            >
                                                {["Mehendi", "Sangeet", "Wedding", "Reception"].map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium uppercase tracking-wide text-wedding-slate/60 mb-1 block">Notes</label>
                                            <textarea
                                                className="w-full rounded-xl border border-wedding-gold/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-wedding-gold min-h-[42px] resize-none"
                                                placeholder="Styling details..."
                                                rows={2}
                                                value={formData.notes || ""}
                                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Jewelry Section */}
                                <div className="pt-6 border-t border-wedding-gold/10">
                                    <h3 className="font-serif text-lg font-bold text-wedding-slate mb-4 flex items-center">
                                        <span className="bg-wedding-gold/10 p-1.5 rounded-full mr-2">
                                            <ImageIcon className="h-4 w-4 text-wedding-gold-dark" /> {/* Using generic icon as placeholder for jewelry */}
                                        </span>
                                        Jewelry & Accessories
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {["Necklace", "Earrings", "Bangles", "Ring", "Footwear", "Other"].map((item) => (
                                            <div key={item}>
                                                <label className="text-[10px] font-medium uppercase tracking-wide text-wedding-slate/40 mb-1 block">{item}</label>
                                                <Input
                                                    className="h-8 text-xs bg-gray-50/50"
                                                    placeholder={`Add ${item}...`}
                                                    value={formData.jewelry?.[item.toLowerCase() as keyof Jewelry] || ""}
                                                    onChange={e => updateJewelry(item.toLowerCase() as keyof Jewelry, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-wedding-gold/10 bg-wedding-ivory/50 flex justify-end space-x-3">
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                            <Button type="submit" form="outfit-form">Save Outfit</Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
