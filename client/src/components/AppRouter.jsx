import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<HomePage />} />
          {/* <Route path="api-links" element={<ApiLinksPage />} /> */}
          <Route path="about" element={<div>About</div>} />
          <Route path="course" element={<CourseGrid />} />
          <Route path="contact" element={<div>Contact</div>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="test" element={<TestPage />} />

          <Route path="dashboard" element={<StudentPage />}>
            <Route path="account" element={<AccountSettings />} />
            <Route path="courses" element={<CourseGrid />} />
            <Route path="courses/:id" element={<CourseContent />}></Route>
            <Route path="courses/:id/chapter/:chapter" element={<>Chapter</>} />
            <Route
              path="courses/:id/exercises"
              element={<>Exercises</>}
            ></Route>
            <Route path="classes" element={<div>Classes</div>} />
            <Route path="schedule" element={<StudentClasses />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
