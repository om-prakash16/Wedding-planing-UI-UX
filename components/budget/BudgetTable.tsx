"use client";

import { useState } from "react";
import { BudgetItem } from "@/hooks/useBudget";
// import { Input } from "@/components/ui/Input"; // We need to create this first or inline it
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Save } from "lucide-react";
import { motion } from "framer-motion";

// Simple Input component since we missed creating it earlier in "ui"
function SimpleInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`rounded-lg border border-wedding-gold/20 bg-white px-3 py-2 text-sm text-wedding-slate shadow-sm focus:border-wedding-gold focus:outline-none focus:ring-1 focus:ring-wedding-gold ${className}`}
            {...props}
        />
    );
}

export function BudgetTable({ items, updateItem, deleteItem, addItem }: {
    items: BudgetItem[],
    updateItem: (id: string, updates: Partial<BudgetItem>) => void,
    deleteItem: (id: string) => void,
    addItem: (item: Omit<BudgetItem, "id">) => void
}) {
    const [newItem, setNewItem] = useState({ category: "", description: "", estimatedCost: 0 });
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        if (newItem.description) {
            addItem({ ...newItem, actualCost: 0, paidAmount: 0, notes: "" });
            setNewItem({ category: "", description: "", estimatedCost: 0 });
            setIsAdding(false);
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-wedding-gold/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-wedding-ivory text-wedding-slate/60">
                        <tr>
                            <th className="px-4 py-3 font-serif font-medium">Category</th>
                            <th className="px-4 py-3 font-serif font-medium">Description</th>
                            <th className="px-4 py-3 font-serif font-medium text-right">Estimated</th>
                            <th className="px-4 py-3 font-serif font-medium text-right">Actual</th>
                            <th className="px-4 py-3 font-serif font-medium text-right">Paid</th>
                            <th className="px-4 py-3 font-serif font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-wedding-gold/5">
                        {items.map((item) => (
                            <motion.tr
                                key={item.id}
                                {...({
                                    initial: { opacity: 0 },
                                    animate: { opacity: 1 }
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                } as any)}
                                layout
                                className="group hover:bg-wedding-ivory/50"
                            >
                                <td className="px-4 py-3">
                                    <SimpleInput
                                        value={item.category}
                                        onChange={(e) => updateItem(item.id, { category: e.target.value })}
                                        className="w-24 border-transparent bg-transparent focus:bg-white"
                                        placeholder="Category"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <SimpleInput
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                                        className="w-full min-w-[150px] border-transparent bg-transparent focus:bg-white"
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <SimpleInput
                                        type="number"
                                        value={item.estimatedCost}
                                        onChange={(e) => updateItem(item.id, { estimatedCost: Number(e.target.value) })}
                                        className="w-24 text-right border-transparent bg-transparent focus:bg-white"
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <SimpleInput
                                        type="number"
                                        value={item.actualCost}
                                        onChange={(e) => updateItem(item.id, { actualCost: Number(e.target.value) })}
                                        className="w-24 text-right border-transparent bg-transparent focus:bg-white"
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <SimpleInput
                                        type="number"
                                        value={item.paidAmount}
                                        onChange={(e) => updateItem(item.id, { paidAmount: Number(e.target.value) })}
                                        className="w-24 text-right border-transparent bg-transparent focus:bg-white"
                                    />
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="rounded-full p-2 text-wedding-slate/40 hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}

                        {/* Add New Row */}
                        {isAdding ? (
                            <tr className="bg-wedding-gold/5">
                                <td className="px-4 py-3">
                                    <SimpleInput
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                        placeholder="Category"
                                        className="w-24"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <SimpleInput
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                        placeholder="Description"
                                        className="w-full"
                                        autoFocus
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <SimpleInput
                                        type="number"
                                        value={newItem.estimatedCost}
                                        onChange={(e) => setNewItem({ ...newItem, estimatedCost: Number(e.target.value) })}
                                        placeholder="0"
                                        className="w-24 text-right"
                                    />
                                </td>
                                <td colSpan={2}></td>
                                <td className="px-4 py-3 text-center">
                                    <Button size="sm" onClick={handleAdd} className="rounded-full h-8 w-8 p-0">
                                        <Save className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-3 text-center">
                                    <Button variant="ghost" className="w-full border-dashed border border-wedding-gold/20" onClick={() => setIsAdding(true)}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Item
                                    </Button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
