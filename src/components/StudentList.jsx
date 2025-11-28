import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AttendanceCard } from './AttendanceCard';

export function StudentList({ students, getStatus, updateStatus, getRemarks, updateRemarks, removeStudent, onAddStudent }) {
    const [newStudentName, setNewStudentName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newStudentName.trim()) {
            onAddStudent(newStudentName);
            setNewStudentName('');
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Add personnel name..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <button
                    type="submit"
                    disabled={!newStudentName.trim()}
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </form>

            <div className="space-y-3">
                {students.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                        <p>No personnel yet.</p>
                        <p className="text-sm">Add one to start tracking!</p>
                    </div>
                ) : (
                    students.map(student => (
                        <AttendanceCard
                            key={student.id}
                            student={student}
                            status={getStatus(student.id)}
                            remarks={getRemarks(student.id)}
                            onUpdateStatus={updateStatus}
                            onUpdateRemarks={updateRemarks}
                            onRemove={removeStudent}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
