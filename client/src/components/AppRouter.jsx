import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import ApiLinksPage from "./ApiLinksPage";
import App from "../App.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import CourseGrid from "../components/Course/CourseGrid.jsx";
import TestPage from "../pages/TestPage.jsx";
import StudentPage from "../pages/StudentPage.jsx";
import CourseContent from "../components/Course/CourseContent.jsx";
import StudentSchedules from "../services/StudentSchedules.jsx";
import AccountSettings from "./AccountSetting.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import { AuthProtect } from "./Auth/AuthProtect.jsx";
import AllCourses from "./Course/AllCourses.jsx";
import StudentClasses from "../services/StudentClasses.jsx";
import { useAuth } from "./Auth/AuthProvider.jsx";

import AdminPage from "../pages/AdminPage.jsx";
import TeacherAccounts from "./admin/TeacherAccounts.jsx";
import StudentAccounts from "./admin/StudentAccounts.jsx";
import CoursesManagement from "./admin/CoursesManagement.jsx";
import ClassesManagement from "./admin/ClassesManagement.jsx";
import DepartmentManagement from "./admin/DepartmentManagement.jsx";
import Help from "./admin/Help.jsx";
import NotFound from "../pages/NotFound.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<div className="p-4">About</div>} />
            <Route path="course" element={<AllCourses />} />
            <Route
              path="contact"
              element={<div className="p-4">Contact</div>}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="test" element={<TestPage />} />

            <Route path="dashboard" element={<AuthProtect />}>
              {/* student pages */}
              <Route index element={<AccountSettings />} />
              <Route path="account" element={<AccountSettings />} />
              <Route path="courses" element={<CourseGrid />} />
              <Route path="courses/:id" element={<CourseContent />}></Route>
              <Route
                path="courses/:id/chapter/:chapter"
                element={<div className="p-4">Chapter</div>}
              />
              <Route
                path="courses/:id/exercises"
                element={<div className="p-4">Exercises</div>}
              ></Route>
              <Route path="classes" element={<StudentClasses />} />
              <Route path="schedule" element={<StudentSchedules />} />
              <Route path="help" element={<Help />} />

              {/* admin pages */}
              <Route index element={<TeacherAccounts />} />
              <Route path="teacherAccounts" element={<TeacherAccounts />} />
              <Route path="studentAccounts" element={<StudentAccounts />} />
              <Route path="coursesManagement" element={<CoursesManagement />} />
              <Route path="classesManagement" element={<ClassesManagement />} />
              <Route path="departmentManagement" element={<DepartmentManagement />} />
              <Route path="helpAdmin" element={<Help />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
