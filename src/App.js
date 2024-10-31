// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import CoursePage from './pages/CoursePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Router>
      {/* Navigation Header */}
      <nav className="bg-blue-600 p-4 shadow-lg fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            Admin Portal
          </div>
          <div className="flex space-x-4">
            <Link to="/dashboard" className="text-white hover:text-blue-200 px-3 py-2 rounded-md">Dashboard</Link>
            <Link to="/students" className="text-white hover:text-blue-200 px-3 py-2 rounded-md">Students</Link>
            <Link to="/teachers" className="text-white hover:text-blue-200 px-3 py-2 rounded-md">Teachers</Link>
            <Link to="/courses" className="text-white hover:text-blue-200 px-3 py-2 rounded-md">Courses</Link>
            <Link to="/login" className="text-white hover:text-blue-200 px-3 py-2 rounded-md">Login</Link>
            <Link to="/register" className="text-white hover:text-blue-200 px-3 py-2 rounded-md">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/teachers" element={<TeacherPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
