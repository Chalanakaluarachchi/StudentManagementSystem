// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:5000/api/students');
        const teachersResponse = await axios.get('http://localhost:5000/api/teachers');
        const coursesResponse = await axios.get('http://localhost:5000/api/courses');

        setStats({
          students: studentsResponse.data.length,
          teachers: teachersResponse.data.length,
          courses: coursesResponse.data.length,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">Number of Students</h3>
          <p className="text-4xl font-bold text-blue-500 mt-4">{stats.students}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">Number of Teachers</h3>
          <p className="text-4xl font-bold text-green-500 mt-4">{stats.teachers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">Number of Courses</h3>
          <p className="text-4xl font-bold text-purple-500 mt-4">{stats.courses}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
