"use client";

import { useState } from "react";
import { useVendors, Vendor, VendorType } from "@/hooks/useVendors";
import { VendorSummary } from "@/components/vendors/VendorSummary";
import { VendorList } from "@/components/vendors/VendorList";
import { VendorModal } from "@/components/vendors/VendorModal";
import { Button } from "@/components/ui/Button";
import { Plus, Printer, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export default function VendorPage() {
    const { vendors, addVendor, updateVendor, deleteVendor, totals, isLoaded } = useVendors();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState<Vendor | undefined>(undefined);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [activeType, setActiveType] = useState<VendorType | "All">("All");
    const [paymentFilter, setPaymentFilter] = useState<"All" | "Paid" | "Pending">("All");

    if (!isLoaded) return null;

    const filteredVendors = vendors.filter((v) => {
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = activeType === "All" || v.type === activeType;

        const pending = v.totalAmount - v.paidAmount;
        let matchesPayment = true;
        if (paymentFilter === "Paid") matchesPayment = pending <= 0;
        if (paymentFilter === "Pending") matchesPayment = pending > 0;

        return matchesSearch && matchesType && matchesPayment;
    });

    const handleEdit = (vendor: Vendor) => {
        setEditingVendor(vendor);
        setIsModalOpen(true);
    };

    const handleSave = (vendorData: Vendor | Omit<Vendor, "id">) => {
        if ("id" in vendorData && vendorData.id) {
            updateVendor(vendorData.id, vendorData);
        } else {
            addVendor(vendorData as Omit<Vendor, "id">);
        }
        setIsModalOpen(false);
        setEditingVendor(undefined);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingVendor(undefined);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-wedding-slate">Vendors & Payments</h1>
                    <p className="text-wedding-slate/60">Track services and manage expenses</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" className="hidden md:flex" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Vendor
                    </Button>
                </div>
            </div>

            {/* Summary */}
            <VendorSummary totals={totals} count={vendors.length} />

            {/* Filters */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wedding-slate/40" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search vendors..."
                            className="pl-9 bg-white border-wedding-gold/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value as "All" | "Paid" | "Pending")}
                            className="h-10 rounded-xl border border-wedding-gold/20 bg-white px-3 text-sm text-wedding-slate focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        >
                            <option value="All">All Payments</option>
                            <option value="Paid">Fully Paid</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>

                {/* Type Tabs */}
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                    {["All", "Caterer", "Photographer", "Decorator", "Makeup Artist", "Venue", "Other"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type as VendorType | "All")}
                            className={cn(
                                "px-4 py-1.5 rounded-full whitespace-nowrap text-xs font-medium border transition-all duration-300",
                                activeType === type
                                    ? "bg-wedding-slate text-white border-wedding-slate shadow-sm"
                                    : "bg-white text-wedding-slate/60 border-transparent hover:bg-wedding-ivory"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <VendorList
                vendors={filteredVendors}
                onEdit={handleEdit}
                onDelete={deleteVendor}
            />

            {/* Mobile FAB */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden fixed bottom-24 right-6 h-14 w-14 rounded-full bg-wedding-gold text-white shadow-lg flex items-center justify-center z-40 hover:bg-wedding-gold-dark transition-colors"
            >
                <Plus className="h-6 w-6" />
            </button>

            {/* Modal */}
            <VendorModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                initialData={editingVendor}
            />
        </div>
    );
}
