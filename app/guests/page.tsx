"use client";

import { useState } from "react";
import { useGuests, Side, RSVPStatus } from "@/hooks/useGuests";
import { GuestTable } from "@/components/guests/GuestTable";
import { GuestStats } from "@/components/guests/GuestStats";
import { AddGuestModal } from "@/components/guests/AddGuestModal";
import { FilterBar } from "@/components/guests/FilterBar";
import { Button } from "@/components/ui/Button";
import { Plus, Printer } from "lucide-react";

export default function GuestListPage() {
    const { guests, addGuest, updateGuest, deleteGuest, stats, isLoaded } = useGuests();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [filterSide, setFilterSide] = useState<Side | "All">("All");
    const [filterRSVP, setFilterRSVP] = useState<RSVPStatus | "All">("All");

    if (!isLoaded) return null;

    const filteredGuests = guests.filter((guest) => {
        const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.phone.includes(searchQuery);
        const matchesSide = filterSide === "All" || guest.side === filterSide;
        const matchesRSVP = filterRSVP === "All" || guest.rsvp === filterRSVP;
        return matchesSearch && matchesSide && matchesRSVP;
    });

    return (
        <div className="space-y-8 animate-fade-in relative min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-wedding-slate">Guest List</h1>
                    <p className="text-wedding-slate/60">Manage invitations, RSVPs, and attendance</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" className="hidden md:flex" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Guest
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <GuestStats stats={stats} />

            {/* Filters & Content */}
            <div className="space-y-4">
                <FilterBar
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    filterSide={filterSide} setFilterSide={setFilterSide}
                    filterRSVP={filterRSVP} setFilterRSVP={setFilterRSVP}
                />

                <div className="bg-white rounded-2xl shadow-sm border border-wedding-gold/10 overflow-hidden">
                    <div className="p-1 min-h-[400px]">
                        <GuestTable
                            guests={filteredGuests}
                            onUpdate={updateGuest}
                            onDelete={deleteGuest}
                        />
                    </div>
                    <div className="bg-wedding-ivory p-3 text-center text-xs text-wedding-slate/40 border-t border-wedding-gold/10">
                        Showing {filteredGuests.length} of {guests.length} guests
                    </div>
                </div>
            </div>

            {/* Floating Action Button for Mobile */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden fixed bottom-24 right-6 h-14 w-14 rounded-full bg-wedding-gold text-white shadow-lg flex items-center justify-center z-40 hover:bg-wedding-gold-dark transition-colors"
            >
                <Plus className="h-6 w-6" />
            </button>

            {/* Modal */}
            <AddGuestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addGuest}
            />
        </div>
    );
}
