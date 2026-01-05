"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface BudgetItem {
    id: string;
    category: string; // e.g., "Venue", "Catering"
    description: string;
    estimatedCost: number;
    actualCost: number;
    paidAmount: number;
    notes: string;
}

const DEFAULT_ITEMS: BudgetItem[] = [
    { id: "1", category: "Venue", description: "The Grand Palace Hall (Main Wedding)", estimatedCost: 500000, actualCost: 0, paidAmount: 0, notes: "Includes AC charge" },
    { id: "2", category: "Food", description: "Catering (Wedding & Reception) - 500 Pax", estimatedCost: 800000, actualCost: 0, paidAmount: 0, notes: "Pure Veg Menu + Live Stalls" },
    { id: "3", category: "Decor", description: "Mandap & Stage Decoration", estimatedCost: 350000, actualCost: 0, paidAmount: 0, notes: "Marigold & Jasmine theme" },
    { id: "4", category: "Photography", description: "Candid Photography & Cinematography", estimatedCost: 250000, actualCost: 0, paidAmount: 50000, notes: "Pre-wedding shoot included" },
    { id: "5", category: "Attire", description: "Bridal Lehenga from Chandni Chowk", estimatedCost: 150000, actualCost: 0, paidAmount: 0, notes: "Red & Gold" },
    { id: "6", category: "Attire", description: "Groom Sherwani", estimatedCost: 80000, actualCost: 0, paidAmount: 0, notes: "Cream & Maroon" },
    { id: "7", category: "Jewellery", description: "Gold Kundan Set", estimatedCost: 500000, actualCost: 0, paidAmount: 0, notes: "Purchase from Tanishq" },
    { id: "8", category: "Makeup", description: "Bridal Makeup Artist (2 Events)", estimatedCost: 40000, actualCost: 0, paidAmount: 5000, notes: "HD Makeup" },
    { id: "9", category: "Entertainment", description: "DJ & Dhol Players for Baraat", estimatedCost: 30000, actualCost: 0, paidAmount: 0, notes: "" },
    { id: "10", category: "Gifts", description: "Return Gifts for Relatives", estimatedCost: 100000, actualCost: 0, paidAmount: 0, notes: "Sweet boxes + Silver coins" },
];

export function useBudget() {
    const [items, setItems] = useState<BudgetItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("budget_items");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (error) {
                console.error("Failed to parse budget items", error);
                setItems(DEFAULT_ITEMS);
            }
        } else {
            setItems(DEFAULT_ITEMS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("budget_items", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (item: Omit<BudgetItem, "id">) => {
        const newItem = { ...item, id: uuidv4() };
        setItems((prev) => [...prev, newItem]);
    };

    const updateItem = (id: string, updates: Partial<BudgetItem>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    const deleteItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totals = items.reduce(
        (acc, item) => ({
            estimated: acc.estimated + (Number(item.estimatedCost) || 0),
            actual: acc.actual + (Number(item.actualCost) || 0),
            paid: acc.paid + (Number(item.paidAmount) || 0),
        }),
        { estimated: 0, actual: 0, paid: 0 }
    );

    return {
        items,
        addItem,
        updateItem,
        deleteItem,
        totals,
        isLoaded,
    };
}
