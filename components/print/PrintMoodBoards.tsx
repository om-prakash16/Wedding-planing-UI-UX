"use client";

import { useMoodBoards } from "@/hooks/useMoodBoards";

export function PrintMoodBoards() {
    const { boards } = useMoodBoards();

    return (
        <div className="print-section break-before-page pt-8">
            <h2 className="font-serif text-2xl font-bold bg-wedding-slate/5 border-b-2 border-wedding-slate/20 p-2 mb-4">
                Mood Boards
            </h2>

            {boards.map(board => (
                <div key={board.id} className="mb-8 break-inside-avoid">
                    <div className="flex items-baseline justify-between border-b border-gray-300 pb-2 mb-4">
                        <h3 className="font-serif text-xl font-bold">{board.title}</h3>
                        <span className="text-sm uppercase text-gray-500">{board.ceremony}</span>
                    </div>
                    {board.description && <p className="text-sm italic text-gray-600 mb-4">{board.description}</p>}

                    {/* Simple Grid for Print */}
                    <div className="grid grid-cols-3 gap-4">
                        {board.items.map(item => (
                            <div key={item.id} className="border border-gray-100 rounded overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt="Inspiration" className="w-full h-32 object-cover bg-gray-50" />
                                {item.note && <p className="p-2 text-xs text-gray-500">{item.note}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
