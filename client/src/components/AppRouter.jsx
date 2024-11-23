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
import ListClasses from "./Classes/ListClasses.jsx";
import ClassesDetails from "./Classes/ClassesDetails.jsx";
import UserDetails from "./Classes/UserDetails.jsx";
import CreateExxam from "./Classes/CreateExxam.jsx";
import ListDocument from "./Document/ListDocument.jsx";
import CreateDocument from "./Document/CreateDocument.jsx";

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
            <Route index element={<CourseGrid />} />
            <Route index path="courses" element={<CourseGrid />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="courses/:id" element={<CourseContent />}></Route>
            <Route path="courses/:id/chapter/:chapter" element={<>Chapter</>} />
            <Route
              path="courses/:id/exercises"
              element={<>Exercises</>}
            ></Route>
            <Route path="schedule" element={<ListClasses title="Schedule" />} />
            <Route path="classes" element={<ListClasses title="Classes" />} />
            <Route path="classes/details/:id" element={<ClassesDetails />} />
            <Route
              path="classes/details/create/:id"
              element={<CreateExxam />}
            />
            <Route
              path="classes/details/:subject_id/User/:userId"
              element={<UserDetails />}
            />
            <Route path="document" element={<ListDocument />} />
            <Route path="document/create" element={<CreateDocument />} />
            <Route path="grades/" element={<ListClasses title="Grades" />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
