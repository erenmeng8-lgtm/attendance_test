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
        return attendance[dateKey]?.[studentId] || null;
    };

    const updateStatus = (studentId, status) => {
        setAttendance(prev => ({
            ...prev,
            [dateKey]: {
                ...prev[dateKey],
                [studentId]: status
            }
        }));
    };

    return {
        students,
        addStudent,
        removeStudent,
        currentDate,
        setCurrentDate,
        getStatus,
        updateStatus,
        dateKey
    };
}
