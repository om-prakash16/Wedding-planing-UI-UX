"use client";

import { useState, useEffect } from "react";

// Types
export interface WeddingData {
    brideName: string;
    groomName: string;
    weddingDate: string | null;
    budgetTotal: number;
}

const DEFAULT_DATA: WeddingData = {
    brideName: "Bride",
    groomName: "Groom",
    weddingDate: null, // User needs to set this
    budgetTotal: 2000000, // 20 Lakhs default
};

export function useWeddingData() {
    const [data, setData] = useState<WeddingData>(DEFAULT_DATA);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("wedding_data");
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wedding data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever data changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("wedding_data", JSON.stringify(data));
        }
    }, [data, isLoaded]);

    const updateData = (updates: Partial<WeddingData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    return {
        data,
        updateData,
        isLoaded,
    };
}
