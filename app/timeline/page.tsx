"use client";

import { useTimeline } from "@/hooks/useTimeline";
import { TimelineHeader } from "@/components/timeline/TimelineHeader";
import { GlobalProgress } from "@/components/timeline/GlobalProgress";
import { TimelinePhaseCard } from "@/components/timeline/TimelinePhaseCard";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TimelinePage() {
    const {
        phases, toggleTask, addTask, deleteTask, updateTask,
        progressPercentage, totalTasks, completedTasks, isLoaded
    } = useTimeline();

    if (!isLoaded) return null;

    return (
        <div className="space-y-8 animate-fade-in pb-20">

            {/* Header & Global Progress */}
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <TimelineHeader />
                    </div>
                    <Button variant="outline" className="hidden md:flex ml-4" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>

                <GlobalProgress percentage={progressPercentage} remainingTasks={totalTasks - completedTasks} />
            </div>

            {/* Timeline Phases */}
            <div className="relative space-y-8 mt-12">
                {/* Vertical Guide Line (Desktop) */}
                <div className="hidden md:block absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-wedding-gold/40 via-wedding-gold/20 to-transparent" />

                {phases.map((phase, index) => (
                    <div key={phase.id} className="relative">
                        {/* Phase Dot Marker */}
                        <div className="hidden md:block absolute left-0 top-6 h-8 w-8 rounded-full bg-wedding-ivory border-2 border-wedding-gold z-10 shadow-sm flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-wedding-gold" />
                        </div>

                        {/* Mobile Dot Marker */}
                        <div className="md:hidden flex items-center mb-2 space-x-2">
                            <div className="h-3 w-3 rounded-full bg-wedding-gold" />
                            <span className="text-xs font-bold text-wedding-gold uppercase tracking-wider">Phase {index + 1}</span>
                        </div>

                        <div className="md:pl-12">
                            <TimelinePhaseCard
                                phase={phase}
                                onToggleTask={toggleTask}
                                onAddTask={addTask}
                                onDeleteTask={deleteTask}
                                isActive={index === 0} // Expand first item by default
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Floating Action Button (Optional - maybe for quick add task globally? But per phase is better) */}

        </div>
    );
}
