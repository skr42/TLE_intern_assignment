
import React, { useState } from 'react';
import { addStudent } from '../utils/api';

function AddStudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cfHandle: ''
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(form);
    setForm({ name: '', email: '', phone: '', cfHandle: '' });
    onStudentAdded(); 
  };

  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 space-y-4">
      <h2 className="text-lg font-bold">➕ Add New Student</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} className="p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="phone" placeholder="Phone" required value={form.phone} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="cfHandle" placeholder="Codeforces Handle" required value={form.cfHandle} onChange={handleChange} className="p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Student</button>
    </form>
  );
}

export default AddStudentForm;
