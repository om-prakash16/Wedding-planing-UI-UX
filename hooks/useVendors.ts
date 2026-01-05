"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type VendorType = "Caterer" | "Photographer" | "Decorator" | "Makeup Artist" | "Venue" | "Other";

export interface Vendor {
    id: string;
    name: string;
    type: VendorType;
    phone: string;
    totalAmount: number;
    paidAmount: number;
    notes?: string;
}

const DEFAULT_VENDORS: Vendor[] = [
    { id: "1", name: "Spice Of India Catering", type: "Caterer", phone: "9876543210", totalAmount: 850000, paidAmount: 200000, notes: "Menu finalization pending for Reception" },
    { id: "2", name: "ShutterDown Photography", type: "Photographer", phone: "9123456780", totalAmount: 250000, paidAmount: 50000, notes: "Includes Drone coverage" },
    { id: "3", name: "Ferns N Petals Decor", type: "Decorator", phone: "8899889900", totalAmount: 400000, paidAmount: 100000, notes: "Theme: Rust & Gold" },
    { id: "4", name: "Meenakshi Dutt Makeovers", type: "Makeup Artist", phone: "7778889990", totalAmount: 45000, paidAmount: 10000, notes: "Bridal HD Makeup" },
    { id: "5", name: "Hotel Radisson Blu", type: "Venue", phone: "011-4567890", totalAmount: 600000, paidAmount: 300000, notes: "Hall B booked for Sangeet" },
];

export function useVendors() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("vendor_data");
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setVendors(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse vendor data", e);
                setVendors(DEFAULT_VENDORS);
            }
        } else {
            setVendors(DEFAULT_VENDORS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("vendor_data", JSON.stringify(vendors));
        }
    }, [vendors, isLoaded]);

    const addVendor = (vendor: Omit<Vendor, "id">) => {
        const newVendor = { ...vendor, id: uuidv4() };
        setVendors((prev) => [...prev, newVendor]);
    };

    const updateVendor = (id: string, updates: Partial<Vendor>) => {
        setVendors((prev) =>
            prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
        );
    };

    const deleteVendor = (id: string) => {
        setVendors((prev) => prev.filter((v) => v.id !== id));
    };

    // Stats
    const totals = vendors.reduce(
        (acc, v) => ({
            total: acc.total + Number(v.totalAmount || 0),
            paid: acc.paid + Number(v.paidAmount || 0),
            // pending is calculated on the fly usually, but fine to aggregate
        }),
        { total: 0, paid: 0 }
    );

    return {
        vendors,
        addVendor,
        updateVendor,
        deleteVendor,
        totals,
        isLoaded,
    };
}
