import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const STORAGE_KEY_STUDENTS = 'attendance_students';
const STORAGE_KEY_ATTENDANCE = 'attendance_records';

export function useAttendance() {
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
        return saved ? JSON.parse(saved) : [];
    });

    const [attendance, setAttendance] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_ATTENDANCE);
        return saved ? JSON.parse(saved) : {};
    });

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    }, [students]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(attendance));
    }, [attendance]);

    const addStudent = (name) => {
        if (!name.trim()) return;
        const newStudent = { id: crypto.randomUUID(), name: name.trim() };
        setStudents([...students, newStudent]);
    };

    const removeStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
        // Optional: Cleanup attendance records for this student? 
        // For MVP, keeping it simple.
    };

    const dateKey = format(currentDate, 'yyyy-MM-dd');

    const getStatus = (studentId) => {
        const record = attendance[dateKey]?.[studentId];
        if (!record) return null;
        // Handle both old (string) and new (object) formats
        return typeof record === 'string' ? record : record.status;
    };

    const getRemarks = (studentId) => {
        const record = attendance[dateKey]?.[studentId];
        if (!record || typeof record === 'string') return '';
        return record.remarks || '';
    };

    const updateStatus = (studentId, status) => {
        setAttendance(prev => {
            const currentRecord = prev[dateKey]?.[studentId];
            const currentRemarks = (currentRecord && typeof currentRecord !== 'string')
                ? currentRecord.remarks
                : '';

            return {
                ...prev,
                [dateKey]: {
                    ...prev[dateKey],
                    [studentId]: {
                        status,
                        remarks: currentRemarks
                    }
                }
            };
        });
    };

    const updateRemarks = (studentId, remarks) => {
        setAttendance(prev => {
            const currentRecord = prev[dateKey]?.[studentId];
            // If no record exists, we can't really add remarks easily without a status, 
            // but let's assume we can have remarks with null status.
            // Or better, preserve existing status if any.

            const currentStatus = (currentRecord && typeof currentRecord === 'string')
                ? currentRecord
                : (currentRecord?.status || null);

            return {
                ...prev,
                [dateKey]: {
                    ...prev[dateKey],
                    [studentId]: {
                        status: currentStatus,
                        remarks
                    }
                }
            };
        });
    };

    return {
        students,
        addStudent,
        removeStudent,
        currentDate,
        setCurrentDate,
        getStatus,
        updateStatus,
        getRemarks,
        updateRemarks,
        dateKey
    };
}
