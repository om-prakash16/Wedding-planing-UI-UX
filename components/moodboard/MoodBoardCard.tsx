"use client";

import { MoodBoard } from "@/hooks/useMoodBoards";
import { Trash2, Palette } from "lucide-react";
import { motion } from "framer-motion";

interface MoodBoardCardProps {
    board: MoodBoard;
    onClick: () => void;
    onDelete: (e: React.MouseEvent) => void;
}

export function MoodBoardCard({ board, onClick, onDelete }: MoodBoardCardProps) {
    const coverImage = board.items.length > 0 ? board.items[0].image : null;

    return (
        <motion.div
            {...({
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group cursor-pointer rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-wedding-gold/10 overflow-hidden relative"
        >
            {/* Cover Image */}
            <div className="relative aspect-[4/3] bg-wedding-ivory flex items-center justify-center overflow-hidden">
                {coverImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={coverImage} alt={board.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <div className="flex flex-col items-center justify-center text-wedding-gold/30">
                        <Palette className="h-10 w-10 mb-2" />
                        <span className="text-[10px] uppercase tracking-widest">No Items</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-serif text-lg font-bold text-wedding-slate">{board.title}</h3>
                        <p className="text-xs text-wedding-slate/60 mt-0.5">{board.items.length} inspirations</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-wedding-ivory border border-wedding-gold/20 text-[10px] uppercase font-medium tracking-wide text-wedding-slate/60">
                        {board.ceremony}
                    </span>
                </div>

                {board.description && (
                    <p className="text-xs text-wedding-slate/50 mt-2 line-clamp-2">{board.description}</p>
                )}
            </div>

            {/* Delete Action (visible on hover) */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(e); }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-400 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-red-600"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </motion.div>
    );
}
