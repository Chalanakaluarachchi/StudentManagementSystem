// src/components/CoursePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', duration: '', teacher: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/courses/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/courses', formData);
      }
      setFormData({ title: '', duration: '', teacher: '' });
      loadCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      loadCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleEdit = (course) => {
    setFormData({ title: course.title, duration: course.duration, teacher: course.teacher });
    setEditingId(course._id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Course Management</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full md:w-auto bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600"
        >
          {editingId ? "Update" : "Add"} Course
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Duration</th>
              <th className="py-3 px-6">Teacher</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {courses.map(course => (
              <tr key={course._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{course.title}</td>
                <td className="py-3 px-6">{course.duration}</td>
                <td className="py-3 px-6">{course.teacher}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
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

export default CoursePage;
