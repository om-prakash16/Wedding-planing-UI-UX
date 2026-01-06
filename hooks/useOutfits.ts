"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type PersonType = "Bride" | "Groom";
export type CeremonyType = "Mehendi" | "Sangeet" | "Wedding" | "Reception";

export interface Jewelry {
    necklace?: string;
    earrings?: string;
    bangles?: string;
    ring?: string;
    footwear?: string;
    other?: string;
}

export interface Outfit {
    id: string;
    person: PersonType;
    ceremony: CeremonyType;
    type: string; // e.g. Lehenga, Sherwani
    name: string;
    image?: string; // Data URL or Object URL (persisting Data URL is risky for size, we'll try to keep it small or handle conditionally)
    notes?: string;
    jewelry: Jewelry;
}

const DEFAULT_OUTFITS: Outfit[] = [
    {
        id: "1", person: "Bride", ceremony: "Mehendi", type: "Lehenga", name: "Green Floral Lehenga",
        notes: "Lightweight, easy to sit in. Match with floral jewellery.",
        jewelry: { necklace: "Floral Choker", earrings: "Floral Jhumkas", bangles: "Glass Bangles", footwear: "Juttis" }
    },
    {
        id: "2", person: "Bride", ceremony: "Wedding", type: "Heavy Lehenga", name: "Traditional Red Lehenga",
        notes: "Sabyasachi inspired deep red with gold zardosi.",
        jewelry: { necklace: "Polki Set", earrings: "Heavy Jhumkas", bangles: "Chooda + Kaleere", ring: "Engagement Ring" }
    },
    {
        id: "3", person: "Groom", ceremony: "Wedding", type: "Sherwani", name: "Ivory & Gold Sherwani",
        notes: "With maroon stole and safa.",
        jewelry: { necklace: "Pearl Mala", footwear: "Mojari" }
    },
    {
        id: "4", person: "Bride", ceremony: "Sangeet", type: "Gown", name: "Silver Sequin Gown",
        notes: "Indo-western style for dancing.",
        jewelry: { necklace: "Diamond String", earrings: "Diamond Studs" }
    },
];

export function useOutfits() {
    const [outfits, setOutfits] = useState<Outfit[]>(DEFAULT_OUTFITS);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const saved = localStorage.getItem("outfit_data");
            if (saved) {
                try {
                    setOutfits(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse outfit data", e);
                    setOutfits(DEFAULT_OUTFITS);
                }
            }
            setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("outfit_data", JSON.stringify(outfits));
            } catch (e) {
                console.error("Failed to save outfit data - likely storage quota exceeded if images are large", e);
                // In a real app, we'd handle this better. For now, we might need to clear images or warn user.
            }
        }
    }, [outfits, isLoaded]);

    const addOutfit = (outfit: Omit<Outfit, "id">) => {
        const newOutfit = { ...outfit, id: uuidv4() };
        setOutfits((prev) => [...prev, newOutfit]);
    };

    const updateOutfit = (id: string, updates: Partial<Outfit>) => {
        setOutfits((prev) =>
            prev.map((o) => (o.id === id ? { ...o, ...updates } : o))
        );
    };

    const deleteOutfit = (id: string) => {
        setOutfits((prev) => prev.filter((o) => o.id !== id));
    };

    return {
        outfits,
        addOutfit,
        updateOutfit,
        deleteOutfit,
        isLoaded,
    };
}
