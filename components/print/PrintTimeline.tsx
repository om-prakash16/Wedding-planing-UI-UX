"use client";

import { useTimeline } from "@/hooks/useTimeline";
import { Circle, CheckCircle2 } from "lucide-react";

export function PrintTimeline() {
    const { phases } = useTimeline();

    return (
        <div className="print-section break-before-page pt-8">
            <h2 className="font-serif text-2xl font-bold bg-wedding-slate/5 border-b-2 border-wedding-slate/20 p-2 mb-4">
                Wedding Timeline
            </h2>

            <div className="space-y-6">
                {phases.map(phase => (
                    <div key={phase.id} className="break-inside-avoid">
                        <h3 className="font-serif text-lg font-bold text-wedding-slate mb-2 border-b border-gray-200 pb-1">
                            {phase.title}
                        </h3>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {phase.tasks.map(task => (
                                <li key={task.id} className="flex items-start text-sm">
                                    <span className="mr-2 mt-0.5">
                                        {task.completed ? (
                                            <CheckCircle2 className="h-4 w-4 text-black" />
                                        ) : (
                                            <Circle className="h-4 w-4 text-gray-300" />
                                        )}
                                    </span>
                                    <span className={task.completed ? "line-through text-gray-500" : ""}>{task.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
