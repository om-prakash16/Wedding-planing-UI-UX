"use client";

import { Task } from "@/hooks/useTimeline";
import { Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <motion.div
            layout
            {...({
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0 }
            } as any)}
            className="group flex items-start space-x-3 py-3"
        >
            <button
                onClick={() => onToggle(task.id)}
                className={cn(
                    "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    task.completed
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-wedding-slate/30 bg-transparent hover:border-wedding-gold"
                )}
            >
                <Check className={cn("h-3 w-3 transition-transform", task.completed ? "scale-100" : "scale-0")} />
            </button>

            <div className="flex-1">
                <p className={cn(
                    "text-sm font-medium transition-all duration-300",
                    task.completed ? "text-wedding-slate/40 line-through" : "text-wedding-slate"
                )}>
                    {task.text}
                </p>
                {task.notes && (
                    <p className="text-[11px] text-wedding-slate/40 mt-0.5">{task.notes}</p>
                )}
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-400"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </motion.div>
    );
}
