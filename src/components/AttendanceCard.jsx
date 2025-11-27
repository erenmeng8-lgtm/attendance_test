import React from 'react';
import { Check, Clock, X, Trash2, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function AttendanceCard({ student, status, onUpdateStatus, onRemove }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 text-lg">{student.name}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onUpdateStatus(student.id, null)}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                        aria-label="Reset status"
                        title="Reset status"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onRemove(student.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove student"
                        title="Remove student"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <StatusButton
                    active={status === 'present'}
                    onClick={() => onUpdateStatus(student.id, 'present')}
                    color="green"
                    icon={Check}
                    label="Present"
                />
                <StatusButton
                    active={status === 'late'}
                    onClick={() => onUpdateStatus(student.id, 'late')}
                    color="yellow"
                    icon={Clock}
                    label="Late"
                />
                <StatusButton
                    active={status === 'absent'}
                    onClick={() => onUpdateStatus(student.id, 'absent')}
                    color="red"
                    icon={X}
                    label="Absent"
                />
            </div>
        </div>
    );
}

function StatusButton({ active, onClick, color, icon: Icon, label }) {
    const baseStyles = "flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 gap-1";

    const colorStyles = {
        green: active
            ? "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500"
            : "border-gray-200 text-gray-500 hover:border-green-200 hover:bg-green-50/50",
        yellow: active
            ? "bg-yellow-50 border-yellow-500 text-yellow-700 ring-1 ring-yellow-500"
            : "border-gray-200 text-gray-500 hover:border-yellow-200 hover:bg-yellow-50/50",
        red: active
            ? "bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500"
            : "border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50/50",
    };

    return (
        <button
            onClick={onClick}
            className={twMerge(baseStyles, colorStyles[color])}
        >
            <Icon className={clsx("w-5 h-5", active && "stroke-2")} />
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
}
