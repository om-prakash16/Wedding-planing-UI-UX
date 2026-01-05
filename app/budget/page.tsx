"use client";

import { useBudget } from "@/hooks/useBudget";
import { BudgetTable } from "@/components/budget/BudgetTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { IndianRupee, TrendingDown, TrendingUp, Wallet } from "lucide-react";
// import { motion } from "framer-motion";

export default function BudgetPage() {
    const { items, addItem, updateItem, deleteItem, totals, isLoaded } = useBudget();

    if (!isLoaded) return null;

    const variance = totals.estimated - totals.actual;
    const isUnderBudget = variance >= 0;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-wedding-slate">Budget Tracker</h1>
                    <p className="text-wedding-slate/60">Manage your seamless wedding finances</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card className="bg-wedding-ivory">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-wedding-slate/60">Estimated Cost</CardTitle>
                        <Wallet className="h-4 w-4 text-wedding-gold-dark" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-wedding-slate">₹ {totals.estimated.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-wedding-slate/60">Actual Spend</CardTitle>
                        <IndianRupee className="h-4 w-4 text-wedding-slate" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-wedding-slate">₹ {totals.actual.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-wedding-slate/60">Paid So Far</CardTitle>
                        <IndianRupee className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">₹ {totals.paid.toLocaleString('en-IN')}</div>
                        <p className="text-xs text-muted-foreground">Pending: ₹ {(totals.actual - totals.paid).toLocaleString('en-IN')}</p>
                    </CardContent>
                </Card>

                <Card className={isUnderBudget ? "bg-green-50" : "bg-red-50"}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-wedding-slate/60">Variance</CardTitle>
                        {isUnderBudget ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${isUnderBudget ? "text-green-700" : "text-red-700"}`}>
                            {isUnderBudget ? "+" : ""} ₹ {variance.toLocaleString('en-IN')}
                        </div>
                        <p className="text-xs text-wedding-slate/50">{isUnderBudget ? "Under Budget" : "Over Budget"}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Table */}
            <BudgetTable
                items={items}
                updateItem={updateItem}
                deleteItem={deleteItem}
                addItem={addItem}
            />
        </div>
    );
}
