"use client";

import { Search } from "lucide-react";
import { Side, RSVPStatus } from "@/hooks/useGuests";
import { Input } from "@/components/ui/Input";

interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    filterSide: Side | "All";
    setFilterSide: (s: Side | "All") => void;
    filterRSVP: RSVPStatus | "All";
    setFilterRSVP: (s: RSVPStatus | "All") => void;
}

export function FilterBar({ searchQuery, setSearchQuery, filterSide, setFilterSide, filterRSVP, setFilterRSVP }: FilterBarProps) {
    return (
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wedding-slate/40" />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="pl-9 bg-white border-wedding-gold/20"
                />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-1 md:pb-0">
                <select
                    value={filterSide}
                    onChange={(e) => setFilterSide(e.target.value as Side | "All")}
                    className="h-10 rounded-xl border border-wedding-gold/20 bg-white px-3 text-sm text-wedding-slate focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                >
                    <option value="All">All Sides</option>
                    <option value="Bride">Bride&apos;s Side</option>
                    <option value="Groom">Groom&apos;s Side</option>
                </select>

                <select
                    value={filterRSVP}
                    onChange={(e) => setFilterRSVP(e.target.value as RSVPStatus | "All")}
                    className="h-10 rounded-xl border border-wedding-gold/20 bg-white px-3 text-sm text-wedding-slate focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                >
                    <option value="All">All Status</option>
                    <option value="Yes">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="No">Declined</option>
                </select>
            </div>
        </div>
    );
}
