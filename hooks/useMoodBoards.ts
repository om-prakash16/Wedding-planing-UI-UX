"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type BoardType = "Mehendi" | "Sangeet" | "Wedding" | "Reception" | "General";

export interface MoodItem {
    id: string;
    image: string;
    note?: string;
}

export interface MoodBoard {
    id: string;
    title: string;
    ceremony: BoardType;
    description?: string;
    items: MoodItem[];
}

const DEFAULT_BOARDS: MoodBoard[] = [
    {
        id: "1", title: "Mehendi Vibe", ceremony: "Mehendi", description: "Bright pinks, oranges, and genda phool decor.", items: []
    },
    {
        id: "2", title: "Royal Wedding Decor", ceremony: "Wedding", description: "Deep Reds, Gold, and velvety textures.", items: []
    }
];

export function useMoodBoards() {
    const [boards, setBoards] = useState<MoodBoard[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("moodboard_data");
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setBoards(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse moodboard data", e);
                setBoards(DEFAULT_BOARDS);
            }
        } else {
            setBoards(DEFAULT_BOARDS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("moodboard_data", JSON.stringify(boards));
            } catch (e) {
                console.error("Failed to save moodboard data - storage quota likely exceeded", e);
            }
        }
    }, [boards, isLoaded]);

    const addBoard = (board: Omit<MoodBoard, "id" | "items">) => {
        const newBoard = { ...board, id: uuidv4(), items: [] };
        setBoards((prev) => [...prev, newBoard]);
    };

    const deleteBoard = (id: string) => {
        setBoards((prev) => prev.filter((b) => b.id !== id));
    };

    const addInspiration = (boardId: string, item: Omit<MoodItem, "id">) => {
        const newItem = { ...item, id: uuidv4() };
        setBoards((prev) =>
            prev.map((b) =>
                b.id === boardId ? { ...b, items: [newItem, ...b.items] } : b
            )
        );
    };

    const deleteInspiration = (boardId: string, itemId: string) => {
        setBoards((prev) =>
            prev.map((b) =>
                b.id === boardId
                    ? { ...b, items: b.items.filter((i) => i.id !== itemId) }
                    : b
            )
        );
    };

    return {
        boards,
        addBoard,
        deleteBoard,
        addInspiration,
        deleteInspiration,
        isLoaded,
    };
}
