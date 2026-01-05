"use client";

import { useState } from "react";
import { useOutfits, PersonType, CeremonyType, Outfit } from "@/hooks/useOutfits";
import { OutfitCard } from "@/components/outfits/OutfitCard";
import { OutfitModal } from "@/components/outfits/OutfitModal";
import { Button } from "@/components/ui/Button";
import { Plus, Printer, Shirt } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OutfitPage() {
    const { outfits, addOutfit, updateOutfit, deleteOutfit, isLoaded } = useOutfits();
    const [activePerson, setActivePerson] = useState<PersonType>("Bride");
    const [activeCeremony, setActiveCeremony] = useState<CeremonyType>("Mehendi");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOutfit, setEditingOutfit] = useState<Outfit | undefined>(undefined);

    if (!isLoaded) return null;

    const filteredOutfits = outfits.filter(
        (o) => o.person === activePerson && o.ceremony === activeCeremony
    );

    const handleEdit = (outfit: Outfit) => {
        setEditingOutfit(outfit);
        setIsModalOpen(true);
    };

    const handleSave = (outfitData: Outfit | Omit<Outfit, "id">) => {
        if ("id" in outfitData && outfitData.id) {
            updateOutfit(outfitData.id, outfitData);
        } else {
            addOutfit(outfitData as Omit<Outfit, "id">);
        }
        setIsModalOpen(false);
        setEditingOutfit(undefined);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingOutfit(undefined);
    };

    return (
        <div className="space-y-8 animate-fade-in relative min-h-screen pb-24">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-wedding-slate">Outfit & Jewelry</h1>
                    <p className="text-wedding-slate/60">Plan every look for every ceremony</p>
                </div>
                <div className="flex space-x-3">
                    {/* Person Toggle */}
                    <div className="bg-white rounded-full p-1 border border-wedding-gold/20 flex shadow-sm">
                        {(["Bride", "Groom"] as PersonType[]).map((person) => (
                            <button
                                key={person}
                                onClick={() => setActivePerson(person)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                                    activePerson === person
                                        ? "bg-wedding-slate text-white shadow-md"
                                        : "text-wedding-slate/60 hover:text-wedding-slate"
                                )}
                            >
                                {person}
                            </button>
                        ))}
                    </div>

                    <Button variant="outline" className="hidden md:flex" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Outfit
                    </Button>
                </div>
            </div>

            {/* Ceremony Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                {(["Mehendi", "Sangeet", "Wedding", "Reception"] as CeremonyType[]).map((ceremony) => (
                    <button
                        key={ceremony}
                        onClick={() => setActiveCeremony(ceremony)}
                        className={cn(
                            "px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition-all duration-300",
                            activeCeremony === ceremony
                                ? "bg-wedding-blush text-wedding-maroon border-wedding-maroon/20 shadow-sm"
                                : "bg-white text-wedding-slate/60 border-transparent hover:bg-wedding-ivory"
                        )}
                    >
                        {ceremony}
                    </button>
                ))}
            </div>

            {/* Main Grid */}
            <div className="min-h-[400px]">
                {filteredOutfits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredOutfits.map((outfit) => (
                                <OutfitCard
                                    key={outfit.id}
                                    outfit={outfit}
                                    onEdit={handleEdit}
                                    onDelete={deleteOutfit}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                        <div className="bg-wedding-ivory rounded-full p-6 shadow-sm">
                            <Shirt className="h-12 w-12 text-wedding-gold/40" />
                        </div>
                        <div className="max-w-md">
                            <h3 className="font-serif text-xl font-medium text-wedding-slate">No outfits planned yet</h3>
                            <p className="text-wedding-slate/50 mt-1 mb-6">Start visualizing your {activePerson}'s look for the {activeCeremony}.</p>
                            <Button variant="outline" onClick={() => setIsModalOpen(true)} className="border-dashed">
                                <Plus className="mr-2 h-4 w-4" /> Add First Outfit
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden fixed bottom-24 right-6 h-14 w-14 rounded-full bg-wedding-gold text-white shadow-lg flex items-center justify-center z-40 hover:bg-wedding-gold-dark transition-colors"
            >
                <Plus className="h-6 w-6" />
            </button>

            {/* Modal */}
            <OutfitModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                initialData={editingOutfit}
                activePerson={activePerson}
                activeCeremony={activeCeremony}
            />
        </div>
    );
}
