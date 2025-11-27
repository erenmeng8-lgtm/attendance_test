import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';

export function DatePicker({ currentDate, onDateChange }) {
    const isToday = isSameDay(currentDate, new Date());

    return (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-4 sticky top-0 z-0">
            <button
                onClick={() => onDateChange(subDays(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-gray-900">
                    {format(currentDate, 'EEEE, MMM d')}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{isToday ? 'Today' : format(currentDate, 'yyyy')}</span>
                </div>
            </div>

            <button
                onClick={() => onDateChange(addDays(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
