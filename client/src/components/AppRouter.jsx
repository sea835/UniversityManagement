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
import StudentClasses from "../services/StudentClasses.jsx";
import AccountSettings from "./AccountSetting.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import { AuthProtect } from "./Auth/AuthProtect.jsx";
import AllCourses from "./Course/AllCourses.jsx";

import AdminPage from "../pages/AdminPage.jsx";
import TeacherAccounts from "./admin/TeacherAccounts.jsx";
import StudentAccounts from "./admin/StudentAccounts.jsx";
import CoursesManagement from "./admin/CoursesManagement.jsx";
import ClassesManagement from "./admin/ClassesManagement.jsx";
import Help from "./admin/Help.jsx";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<div>About</div>} />
            <Route path="course" element={<AllCourses />} />
            <Route path="contact" element={<div>Contact</div>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="test" element={<TestPage />} />

            <Route
              path="dashboard"
              element={
                <AuthProtect>
                  <StudentPage />
                </AuthProtect>
              }
            >
              <Route path="account" element={<AccountSettings />} />
              <Route path="courses" element={<CourseGrid />} />
              <Route path="courses/:id" element={<CourseContent />}></Route>
              <Route
                path="courses/:id/chapter/:chapter"
                element={<>Chapter</>}
              />
              <Route
                path="courses/:id/exercises"
                element={<>Exercises</>}
              ></Route>
              <Route path="classes" element={<div>Classes</div>} />
              <Route path="schedule" element={<StudentClasses />} />
            </Route>

            <Route path="dashboard" element={<AdminPage />}>
              <Route index element={<TeacherAccounts />} /> 
              <Route path="teacherAccounts" element={<TeacherAccounts />}/>
              <Route path="studentAccounts" element={<StudentAccounts />}/>
              <Route path="coursesManagement" element={<CoursesManagement />}/>
              <Route path="classesManagement" element={<ClassesManagement />}/>
              <Route path="helpAdmin" element={<Help />}/>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
