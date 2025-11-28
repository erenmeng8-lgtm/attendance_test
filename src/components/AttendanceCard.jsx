import React, { useState } from 'react';
import { Check, Clock, X, Trash2, RotateCcw, MessageSquare } from 'lucide-react';
import { RemarksModal } from './RemarksModal';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function AttendanceCard({ student, status, remarks, onUpdateStatus, onUpdateRemarks, onRemove }) {
    const [isRemarksOpen, setIsRemarksOpen] = useState(false);

    return (
        <>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 text-base">{student.name}</span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setIsRemarksOpen(true)}
                            className={clsx(
                                "transition-colors p-1 relative",
                                remarks ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                            )}
                            aria-label="Add remarks"
                            title="Add remarks"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {remarks && (
                                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-white transform translate-x-1/4 -translate-y-1/4" />
                            )}
                        </button>
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

            <RemarksModal
                isOpen={isRemarksOpen}
                onClose={() => setIsRemarksOpen(false)}
                onSave={(newRemarks) => onUpdateRemarks(student.id, newRemarks)}
                initialValue={remarks}
                studentName={student.name}
            />
        </>
    );
}

function StatusButton({ active, onClick, color, icon: Icon, label }) {
    const baseStyles = "flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all duration-200 gap-0.5";

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
            <Icon className={clsx("w-4 h-4", active && "stroke-2")} />
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
}
