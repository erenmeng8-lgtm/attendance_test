import React from 'react';
import { Layout } from './components/Layout';
import { StudentList } from './components/StudentList';
import { DatePicker } from './components/DatePicker';
import { AttendanceSummary } from './components/AttendanceSummary';
import { useAttendance } from './hooks/useAttendance';

function App() {
  const {
    students,
    addStudent,
    removeStudent,
    currentDate,
    setCurrentDate,
    getStatus,
    updateStatus,
    getRemarks,
    updateRemarks
  } = useAttendance();

  const counts = students.reduce((acc, student) => {
    const status = getStatus(student.id);
    if (status === 'present') acc.present++;
    if (status === 'late') acc.late++;
    if (status === 'absent') acc.absent++;
    return acc;
  }, { present: 0, late: 0, absent: 0 });

  return (
    <Layout>
      <DatePicker
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      <AttendanceSummary counts={counts} />

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Personnel List</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage attendance for your squad.
        </p>

        <StudentList
          students={students}
          getStatus={getStatus}
          updateStatus={updateStatus}
          getRemarks={getRemarks}
          updateRemarks={updateRemarks}
          removeStudent={removeStudent}
          onAddStudent={addStudent}
        />
      </div>
    </Layout>
  );
}

export default App;
