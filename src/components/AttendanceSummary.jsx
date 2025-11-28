import React from 'react';
import { Check, Clock, X } from 'lucide-react';

export function AttendanceSummary({ counts }) {
    return (
        <div className="grid grid-cols-3 gap-2 mb-4">
            <SummaryCard
                label="Present"
                count={counts.present}
                icon={Check}
                color="green"
            />
            <SummaryCard
                label="Late"
                count={counts.late}
                icon={Clock}
                color="yellow"
            />
            <SummaryCard
                label="Absent"
                count={counts.absent}
                icon={X}
                color="red"
            />
        </div>
    );
}

function SummaryCard({ label, count, icon: Icon, color }) {
    const colorStyles = {
        green: "bg-green-50 border-green-200 text-green-700",
        yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
        red: "bg-red-50 border-red-200 text-red-700",
    };

    return (
        <div className={`flex flex-col items-center p-2 rounded-lg border ${colorStyles[color]}`}>
            <div className="flex items-center gap-1 mb-0.5">
                <Icon className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
            </div>
            <span className="text-lg font-bold leading-none">{count}</span>
        </div>
    );
}
