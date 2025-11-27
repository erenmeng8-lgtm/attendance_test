import React from 'react';
import { Layout } from './components/Layout';
import { StudentList } from './components/StudentList';
import { DatePicker } from './components/DatePicker';
import { useAttendance } from './hooks/useAttendance';

function App() {
  const {
    students,
    addStudent,
    removeStudent,
    currentDate,
    setCurrentDate,
    getStatus,
    updateStatus
  } = useAttendance();

  return (
    <Layout>
      <DatePicker
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Personnel List</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage attendance for your squad.
        </p>

        <StudentList
          students={students}
          getStatus={getStatus}
          updateStatus={updateStatus}
          removeStudent={removeStudent}
          onAddStudent={addStudent}
        />
      </div>
    </Layout>
  );
}

export default App;
