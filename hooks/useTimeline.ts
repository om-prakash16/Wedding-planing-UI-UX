"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    notes?: string;
}

export interface TimelinePhase {
    id: string;
    title: string;
    tasks: Task[];
}

const DEFAULT_TIMELINE: TimelinePhase[] = [
    {
        id: "6-months",
        title: "6 Months Before",
        tasks: [
            { id: "1", text: "Finalize Wedding Date & Venue", completed: true, notes: "Checked availability for 3 venues" },
            { id: "2", text: "Create Guest List Draft", completed: false },
            { id: "3", text: "Book Make-up Artist & Photographer", completed: false },
        ],
    },
    {
        id: "3-months",
        title: "3 Months Before",
        tasks: [
            { id: "4", text: "Send Save the Dates", completed: false },
            { id: "5", text: "Shop for Wedding Outfits", completed: false },
            { id: "6", text: "Book Caterer & Menu Tasting", completed: false },
        ],
    },
    {
        id: "1-month",
        title: "1 Month Before",
        tasks: [
            { id: "7", text: "Send Formal Invitations", completed: false },
            { id: "8", text: "Finalize Decor & Flower Arrangements", completed: false },
            { id: "9", text: "Book Sangeet Choreographer", completed: false },
        ],
    },
    {
        id: "1-week",
        title: "1 Week Before",
        tasks: [
            { id: "10", text: "Pack Wedding Essentials / Emergency Kit", completed: false },
            { id: "11", text: "Confirm Vendor Timings", completed: false },
            { id: "12", text: "Apply Mehendi", completed: false },
        ],
    },
    {
        id: "wedding-day",
        title: "The Big Day",
        tasks: [
            { id: "13", text: "Eat a good breakfast", completed: false },
            { id: "14", text: "Get Ready & Shine!", completed: false },
        ],
    },
];

export function useTimeline() {
    const [phases, setPhases] = useState<TimelinePhase[]>(DEFAULT_TIMELINE);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const saved = localStorage.getItem("timeline_data");
            if (saved) {
                try {
                    setPhases(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse timeline data", e);
                    setPhases(DEFAULT_TIMELINE);
                }
            }
            setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("timeline_data", JSON.stringify(phases));
        }
    }, [phases, isLoaded]);

    const toggleTask = (phaseId: string, taskId: string) => {
        setPhases((prev) =>
            prev.map((phase) =>
                phase.id === phaseId
                    ? {
                        ...phase,
                        tasks: phase.tasks.map((task) =>
                            task.id === taskId ? { ...task, completed: !task.completed } : task
                        ),
                    }
                    : phase
            )
        );
    };

    const addTask = (phaseId: string, text: string) => {
        const newTask: Task = { id: uuidv4(), text, completed: false };
        setPhases((prev) =>
            prev.map((phase) =>
                phase.id === phaseId ? { ...phase, tasks: [...phase.tasks, newTask] } : phase
            )
        );
    };

    const deleteTask = (phaseId: string, taskId: string) => {
        setPhases((prev) =>
            prev.map((phase) =>
                phase.id === phaseId
                    ? { ...phase, tasks: phase.tasks.filter((t) => t.id !== taskId) }
                    : phase
            )
        );
    };

    const updateTask = (phaseId: string, taskId: string, updates: Partial<Task>) => {
        setPhases((prev) =>
            prev.map((phase) =>
                phase.id === phaseId
                    ? {
                        ...phase,
                        tasks: phase.tasks.map((task) =>
                            task.id === taskId ? { ...task, ...updates } : task
                        ),
                    }
                    : phase
            )
        );
    };

    // Progress Calculation
    const allTasks = phases.flatMap((p) => p.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((t) => t.completed).length;
    const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return {
        phases,
        toggleTask,
        addTask,
        deleteTask,
        updateTask,
        progressPercentage,
        totalTasks,
        completedTasks,
        isLoaded,
    };
}
