
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import ApiLinksPage from "./ApiLinksPage";
import App from "../App.jsx";
import CourseContent from "../components/Course/CourseContent.jsx";
import CourseGrid from "../components/Course/CourseGrid.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import TestPage from "../pages/TestPage.jsx";
// 
import StudentClasses from "../services/StudentClasses.jsx";
import StudentSchedules from "../services/StudentSchedules.jsx";
import AccountSettings from "./AccountSetting.jsx";
import { AuthProtect } from "./Auth/AuthProtect.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import AllCourses from "./Course/AllCourses.jsx";

import NotFound from "../pages/NotFound.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ClassesManagement from "./admin/ClassesManagement.jsx";
import CoursesManagement from "./admin/CoursesManagement.jsx";
import DepartmentManagement from "./admin/DepartmentManagement.jsx";
import Help from "./admin/Help.jsx";
import StudentAccounts from "./admin/StudentAccounts.jsx";
import TeacherAccounts from "./admin/TeacherAccounts.jsx";
import ListClasses from "./Classes/ListClasses.jsx";

//
import ListClassesInSchedule from "./Schedule/ListClassesInSchedule.jsx";
import ClassesDetails from "./Classes/ClassesDetails.jsx";
import ListDocument from "./Document/ListDocument.jsx";
import ClassesDetailsInGrades from "./Grades/ClassesDetailsInGrades.jsx";
import CreateExxamInGrades from "./Grades/CreateExxamInGrades.jsx";
import ListClassesInGrades from "./Grades/ListClassesInGrades.jsx";
import UserDetailsInGrades from "./Grades/UserDetailsInGrades.jsx";
import CreateChapter from "./Classes/CreateQuestion.jsx";
import CreateQuestion from "./Classes/CreateQuestion.jsx";
import ListUserinAdmin from "./Lecturer/ListUserinAdmin.jsx";
import ListTeacherinAdmin from "./Lecturer/ListTeacherinAdmin.jsx";
import ListCourseinAdmin from "./Lecturer/ListCourseinAdmin.jsx";
import ListClassinAdmin from "./Lecturer/ListClassinAdmin.jsx";
import ListClassinStudent from "./Student/ListClassinStudent.jsx";
import ListShceduleinStudent from "./Student/ListShceduleinStudent.jsx";
import UserDetails from "./Classes/UserDetails.jsx";
import CreateDocument from "./Document/CreateDocument.jsx";
// 
import StudentPage from "../pages/StudentPage.jsx";
// import CourseContent from "../components/Course/CourseContent.jsx";
// import StudentSchedules from "../services/StudentSchedules.jsx";
// import AccountSettings from "./AccountSetting.jsx";
// import AuthProvider from "./Auth/AuthProvider.jsx";
// import { AuthProtect } from "./Auth/AuthProtect.jsx";
// import AllCourses from "./Course/AllCourses.jsx";
// import StudentClasses from "../services/StudentClasses.jsx";
import { useAuth } from "./Auth/AuthProvider.jsx";

import AdminPage from "../pages/AdminPage.jsx";
// import TeacherAccounts from "./admin/TeacherAccounts.jsx";
// import StudentAccounts from "./admin/StudentAccounts.jsx";
// import CoursesManagement from "./admin/CoursesManagement.jsx";
// import ClassesManagement from "./admin/ClassesManagement.jsx";
// import Help from "./admin/Help.jsx";
// import NotFound from "../pages/NotFound.jsx";
// import RegisterPage from "../pages/RegisterPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import DepartmentsManagement from "./admin/DepartmentManagement.jsx";


const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="course" element={<AllCourses />} />

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

              {/* <Route path="classes" element={<StudentClasses />} /> */}
              {/* <Route path="schedule" element={<StudentSchedules />} /> */}

              <Route path="help" element={<Help />} />

              {/* admin pages */}
              <Route index element={<TeacherAccounts />} />
              <Route path="teacherAccounts" element={<TeacherAccounts />} />
              <Route path="studentAccounts" element={<StudentAccounts />} />
              <Route path="coursesManagement" element={<CoursesManagement />} />
              <Route path="classesManagement" element={<ClassesManagement />} />


              <Route
                path="departmentManagement"
                element={<DepartmentManagement />}

              />
              <Route path="helpAdmin" element={<Help />} />

              {/* Custom Route */}
              <Route path="schedule" element={<ListClassesInSchedule />} />
              <Route path="classes" element={<ListClasses title="Classes" />} />
              <Route path="classes/details/:id" element={<ClassesDetails />} />
              <Route
                path="classes/details/:id/grades"
                element={<ClassesDetailsInGrades />}
              />
              <Route
                path="classes/details/:id/createQuestion"
                element={<CreateQuestion />}
              />
              <Route
                path="classes/details/:id/chapter/create"
                element={<CreateChapter />}
              />

              <Route
                path="classes/details/:subject_id/User/:userId"
                element={<UserDetails />}
              />
              <Route path="document" element={<ListDocument />} />
              <Route path="document/create" element={<CreateDocument />} />
              <Route path="grades/" element={<ListClassesInGrades />} />
              <Route
                path="grades/classes/:id"
                element={<ClassesDetailsInGrades />}
              />
              <Route
                path="grades/:subject_id/user/:userId"
                element={<UserDetailsInGrades />}
              />
              <Route
                path="grades/details/create/:id"
                element={<CreateExxamInGrades />}
              />
              {/* Admin Route */}
              <Route path="listTeacher" element={<ListTeacherinAdmin />} />
              <Route path="listStudent" element={<ListUserinAdmin />} />
              <Route path="listCourse" element={<ListCourseinAdmin />} />
              <Route path="listClass" element={<ListClassinAdmin />} />
              {/* Student Route */}
              <Route path="student/classes" element={<ListClassinStudent />} />
              <Route
                path="student/schedule"
                element={<ListShceduleinStudent />}
              />

            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
