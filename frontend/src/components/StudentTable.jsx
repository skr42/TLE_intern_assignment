import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent } from '../utils/api';
import StudentProfile from './StudentProfile';
import { FaEye, FaTrash } from 'react-icons/fa';

import AddStudentForm from './AddStudentForm';
import DownloadCSV from './downloadCSV';    


function StudentTable() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);


  useEffect(() => {
    async function fetch() {
      const res = await getStudents();
      setStudents(res.data);
    }
    fetch();
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-extrabold mb-6 text-center">📊 Student CodeForces Dashboard</h1>
        <DownloadCSV students={students} />
      <div className="overflow-x-auto">
        <AddStudentForm onStudentAdded={() => window.location.reload()} />
        <table className="min-w-full shadow-md rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Handle</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Max</th>
              <th className="px-4 py-2">Last Sync</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {students.map((s) => (
              <tr key={s._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-2 font-medium">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">{s.cfHandle}</td>
                <td className="px-4 py-2">{s.currentRating}</td>
                <td className="px-4 py-2">{s.maxRating}</td>
                <td className="px-4 py-2">{new Date(s.lastSynced).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => setSelectedStudent(s)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteStudent(s._id).then(() => window.location.reload())}
                    title="Delete Student"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {selectedStudent && <StudentProfile student={selectedStudent} />}
    </div>
  );
}




export default StudentTable;
