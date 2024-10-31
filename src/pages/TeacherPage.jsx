// src/components/TeacherPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ name: '', subject: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teachers')
      .then(response => setTeachers(response.data))
      .catch(error => console.error("Error fetching teachers:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/teachers/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/teachers', formData);
      }
      setFormData({ name: '', subject: '' });
      loadTeachers();
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      loadTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const loadTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error("Error loading teachers:", error);
    }
  };

  const handleEdit = (teacher) => {
    setFormData({ name: teacher.name, subject: teacher.subject });
    setEditingId(teacher._id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Teacher Management</h2>

      {/* Teacher Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingId ? "Update" : "Add"} Teacher
        </button>
      </form>

      {/* Teacher Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Subject</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {teachers.map(teacher => (
              <tr key={teacher._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{teacher.name}</td>
                <td className="py-3 px-6">{teacher.subject}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
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

export default TeacherPage;
