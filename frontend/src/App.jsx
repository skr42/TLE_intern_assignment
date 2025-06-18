import React from 'react';
import StudentTable from './components/StudentTable';

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="absolute top-2 right-2 p-2 border rounded"
      >Dark Mode</button>
      <StudentTable />
    </div>
  );
}
export default App;