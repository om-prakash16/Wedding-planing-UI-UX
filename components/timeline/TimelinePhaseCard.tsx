"use client";

import { useState } from "react";
import { TimelinePhase } from "@/hooks/useTimeline";
import { TaskItem } from "./TaskItem";
import { ChevronDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

interface TimelinePhaseCardProps {
    phase: TimelinePhase;
    onToggleTask: (phaseId: string, taskId: string) => void;
    onAddTask: (phaseId: string, text: string) => void;
    onDeleteTask: (phaseId: string, taskId: string) => void;
    isActive?: boolean;
}

export function TimelinePhaseCard({ phase, onToggleTask, onAddTask, onDeleteTask, isActive = false }: TimelinePhaseCardProps) {
    const [isExpanded, setIsExpanded] = useState(isActive);
    const [newTaskText, setNewTaskText] = useState("");

    const completedCount = phase.tasks.filter(t => t.completed).length;
    const totalCount = phase.tasks.length;
    const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            onAddTask(phase.id, newTaskText);
            setNewTaskText("");
        }
    };

    return (
        <div className="relative pl-8 md:pl-0">
            {/* Desktop Vertical Line Element (Visual only, managed by global/page layout usually, but we can put markers here) */}

            <div className={cn(
                "rounded-2xl border bg-white transition-shadow duration-300 overflow-hidden",
                isExpanded ? "shadow-md border-wedding-gold/20" : "shadow-sm border-transparent hover:shadow"
            )}>
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between p-5 cursor-pointer select-none bg-wedding-ivory/20"
                >
                    <div className="flex flex-col">
                        <h3 className="font-serif text-lg font-semibold text-wedding-slate">{phase.title}</h3>
                        <p className="text-xs text-wedding-slate/50 mt-1">
                            {completedCount}/{totalCount} completed
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* Circular Mini Progress */}
                        <div className="relative h-8 w-8 rounded-full border-2 border-wedding-gold/10 flex items-center justify-center">
                            <div
                                className="absolute inset-0 rounded-full border-2 border-wedding-gold border-t-transparent -rotate-90 transition-all duration-500"
                                style={{
                                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, // Simpler circular progress via conic gradient might be better next time, this is pseudo
                                    borderColor: progress === 100 ? '#22c55e' : 'var(--color-wedding-gold)'
                                }}
                            />
                            {/* Actually let's just use text or full color if 100% */}
                            {progress === 100 && <div className="h-2 w-2 rounded-full bg-green-500" />}
                        </div>

                        <ChevronDown className={cn("h-5 w-5 text-wedding-slate/40 transition-transform duration-300", isExpanded && "rotate-180")} />
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            {...({
                                initial: { height: 0 },
                                animate: { height: "auto" },
                                exit: { height: 0 }
                            } as any)}
                            className="overflow-hidden"
                        >
                            <div className="p-5 pt-0 border-t border-dashed border-wedding-gold/10">
                                <div className="space-y-1 mt-4">
                                    {phase.tasks.map(task => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onToggle={(taskId) => onToggleTask(phase.id, taskId)}
                                            onDelete={(taskId) => onDeleteTask(phase.id, taskId)}
                                        />
                                    ))}
                                </div>

                                <form onSubmit={handleAddTask} className="mt-4 flex items-center space-x-2">
                                    <Plus className="h-4 w-4 text-wedding-gold/60" />
                                    <input
                                        className="flex-1 bg-transparent text-sm placeholder:text-wedding-slate/30 focus:outline-none"
                                        placeholder="Add a new task..."
                                        value={newTaskText}
                                        onChange={(e) => setNewTaskText(e.target.value)}
                                    />
                                    <button type="submit" disabled={!newTaskText.trim()} className="text-xs font-medium text-wedding-gold disabled:opacity-0 hover:text-wedding-gold-dark">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
