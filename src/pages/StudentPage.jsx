// src/components/StudentPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', course: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch students
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  // Handle form submit for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/students/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
      }
      setFormData({ name: '', age: '', course: '' });
      loadStudents();  // Reload students after submission
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      loadStudents();  // Reload students after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Load students to refresh data
  const loadStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  // Handle edit
  const handleEdit = (student) => {
    setFormData({ name: student.name, age: student.age, course: student.course });
    setEditingId(student._id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Student Management</h2>

      {/* Student Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingId ? "Update" : "Add"} Student
        </button>
      </form>

      {/* Student Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Age</th>
              <th className="py-3 px-6">Course</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {students.map(student => (
              <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{student.name}</td>
                <td className="py-3 px-6">{student.age}</td>
                <td className="py-3 px-6">{student.course}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPage;
