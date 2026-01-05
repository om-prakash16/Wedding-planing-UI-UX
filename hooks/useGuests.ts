"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type Side = "Bride" | "Groom";
export type RSVPStatus = "Yes" | "No" | "Pending";
export type FoodPref = "Veg" | "Non-Veg";

export interface Guest {
    id: string;
    name: string;
    phone: string;
    side: Side;
    rsvp: RSVPStatus;
    food: FoodPref;
    notes?: string;
}

const DEFAULT_GUESTS: Guest[] = [
    { id: "1", name: "Rahul Sharma", phone: "9876543210", side: "Groom", rsvp: "Yes", food: "Veg", notes: "Groom's Brother" },
    { id: "2", name: "Anjali Gupta", phone: "9123456780", side: "Bride", rsvp: "Yes", food: "Non-Veg", notes: "Bride's Sister" },
    { id: "3", name: "Mr. & Mrs. Malhotra", phone: "9988776655", side: "Groom", rsvp: "Pending", food: "Veg", notes: "Family Friends from Delhi" },
    { id: "4", name: "Vikram & Family", phone: "8899001122", side: "Bride", rsvp: "No", food: "Veg", notes: "Unavailable" },
    { id: "5", name: "Priya Singh", phone: "7766554433", side: "Bride", rsvp: "Yes", food: "Veg", notes: "College Friend" },
    { id: "6", name: "Amit Verma", phone: "9000010000", side: "Groom", rsvp: "Pending", food: "Non-Veg", notes: "Office Colleague" },
];

export function useGuests() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("guest_list");
        if (saved) {
            try {
                setGuests(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse guest list", e);
                setGuests(DEFAULT_GUESTS);
            }
        } else {
            setGuests(DEFAULT_GUESTS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("guest_list", JSON.stringify(guests));
        }
    }, [guests, isLoaded]);

    const addGuest = (guest: Omit<Guest, "id">) => {
        const newGuest = { ...guest, id: uuidv4() };
        setGuests((prev) => [...prev, newGuest]);
    };

    const updateGuest = (id: string, updates: Partial<Guest>) => {
        setGuests((prev) =>
            prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
        );
    };

    const deleteGuest = (id: string) => {
        setGuests((prev) => prev.filter((g) => g.id !== id));
    };

    // Derived Stats
    const stats = {
        total: guests.length,
        confirmed: guests.filter((g) => g.rsvp === "Yes").length,
        pending: guests.filter((g) => g.rsvp === "Pending").length,
        declined: guests.filter((g) => g.rsvp === "No").length,
        brideSide: guests.filter((g) => g.side === "Bride").length,
        groomSide: guests.filter((g) => g.side === "Groom").length,
        veg: guests.filter((g) => g.food === "Veg").length,
        nonVeg: guests.filter((g) => g.food === "Non-Veg").length,
    };

    return {
        guests,
        addGuest,
        updateGuest,
        deleteGuest,
        stats,
        isLoaded,
    };
}
