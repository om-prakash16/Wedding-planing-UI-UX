"use client";

import { useState } from "react";
import { useMoodBoards, MoodBoard, MoodItem } from "@/hooks/useMoodBoards";
import { MoodBoardCard } from "@/components/moodboard/MoodBoardCard";
import { BoardModal } from "@/components/moodboard/BoardModal";
import { InspirationModal } from "@/components/moodboard/InspirationModal";
import { Button } from "@/components/ui/Button";
import { Plus, Printer, ArrowLeft, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodBoardPage() {
    const { boards, addBoard, deleteBoard, addInspiration, deleteInspiration, isLoaded } = useMoodBoards();
    const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);

    if (!isLoaded) return null;

    const activeBoard = boards.find(b => b.id === activeBoardId);

    const handleCreateBoard = (boardData: Omit<MoodBoard, "id" | "items">) => {
        addBoard(boardData);
    };

    const handleAddInspiration = (itemData: Omit<MoodItem, "id">) => {
        if (activeBoardId) {
            addInspiration(activeBoardId, itemData);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in relative min-h-screen pb-24">
            <AnimatePresence mode="wait">
                {!activeBoard ? (
                    /* ==================== BOARD LIST VIEW ==================== */
                    <motion.div
                        key="board-list"
                        {...({
                            // Framer Motion props cast to any to avoid TS mismatch in Vercel/Next.js builds
                            initial: { opacity: 0, x: -20 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: -20 }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any)}
                        className="space-y-8"
                    >
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div>
                                <h1 className="font-serif text-3xl font-bold text-wedding-slate">Mood Boards</h1>
                                <p className="text-wedding-slate/60">Visual inspiration for your wedding theme</p>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="outline" className="hidden md:flex" onClick={() => window.print()}>
                                    <Printer className="mr-2 h-4 w-4" /> Print
                                </Button>
                                <Button onClick={() => setIsBoardModalOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" /> Create Board
                                </Button>
                            </div>
                        </div>

                        {/* Grid */}
                        {boards.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {boards.map(board => (
                                    <MoodBoardCard
                                        key={board.id}
                                        board={board}
                                        onClick={() => setActiveBoardId(board.id)}
                                        onDelete={() => deleteBoard(board.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="bg-wedding-ivory rounded-full p-6 shadow-sm">
                                    <Plus className="h-12 w-12 text-wedding-gold/40" />
                                </div>
                                <div className="max-w-md">
                                    <h3 className="font-serif text-xl font-medium text-wedding-slate">Create your first mood board</h3>
                                    <p className="text-wedding-slate/50 mt-1 mb-6">Start visualizing your dream wedding themes and colors.</p>
                                    <Button variant="outline" onClick={() => setIsBoardModalOpen(true)} className="border-dashed">
                                        Create Board
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    /* ==================== SINGLE BOARD VIEW ==================== */
                    <motion.div
                        key="single-board"
                        {...({
                            initial: { opacity: 0, x: 20 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: 20 }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any)}
                        className="space-y-8"
                    >
                        {/* Top Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-wedding-gold/10 pb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setActiveBoardId(null)}
                                    className="p-2 rounded-full hover:bg-wedding-ivory text-wedding-slate/60 hover:text-wedding-slate transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="font-serif text-2xl font-bold text-wedding-slate">{activeBoard.title}</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-wedding-ivory border border-wedding-gold/20 text-[10px] uppercase font-medium tracking-wide text-wedding-slate/60">
                                            {activeBoard.ceremony}
                                        </span>
                                    </div>
                                    {activeBoard.description && (
                                        <p className="text-sm text-wedding-slate/50 mt-1">{activeBoard.description}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => window.print()}>
                                    <Printer className="mr-2 h-4 w-4" /> Print
                                </Button>
                                <Button onClick={() => setIsInspirationModalOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Inspiration
                                </Button>
                            </div>
                        </div>

                        {/* Inspiration Grid (Masonry-ish) */}
                        {activeBoard.items.length > 0 ? (
                            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                                {activeBoard.items.map(item => (
                                    <div key={item.id} className="break-inside-avoid group relative rounded-xl overflow-hidden bg-white shadow-sm border border-wedding-gold/10 hover:shadow-md transition-all">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt="Inspiration" className="w-full h-auto object-cover" />
                                        {item.note && (
                                            <div className="p-3 bg-white border-t border-wedding-gold/5">
                                                <p className="text-xs text-wedding-slate/70">{item.note}</p>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => deleteInspiration(activeBoard.id, item.id)}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-red-400 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 opacity-50">
                                <p className="text-wedding-slate/60">No inspiration added yet. Click &quot;Add Inspiration&quot; to start.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Buttons Mobile */}
            {!activeBoard ? (
                <button
                    onClick={() => setIsBoardModalOpen(true)}
                    className="md:hidden fixed bottom-24 right-6 h-14 w-14 rounded-full bg-wedding-gold text-white shadow-lg flex items-center justify-center z-40 hover:bg-wedding-gold-dark"
                >
                    <Plus className="h-6 w-6" />
                </button>
            ) : (
                <button
                    onClick={() => setIsInspirationModalOpen(true)}
                    className="md:hidden fixed bottom-24 right-6 h-14 w-14 rounded-full bg-wedding-gold text-white shadow-lg flex items-center justify-center z-40 hover:bg-wedding-gold-dark"
                >
                    <Plus className="h-6 w-6" />
                </button>
            )}

            {/* Modals */}
            <BoardModal
                isOpen={isBoardModalOpen}
                onClose={() => setIsBoardModalOpen(false)}
                onSave={handleCreateBoard}
            />
            <InspirationModal
                isOpen={isInspirationModalOpen}
                onClose={() => setIsInspirationModalOpen(false)}
                onSave={handleAddInspiration}
            />
        </div>
    );
}
