import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ApiLinksPage from "./ApiLinksPage";
import App from "../App.jsx";
import CourseContent from "../components/Course/CourseContent.jsx";
import CourseGrid from "../components/Course/CourseGrid.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import StudentPage from "../pages/StudentPage.jsx";
import TestPage from "../pages/TestPage.jsx";
import AccountSettings from "./AccountSetting.jsx";
import ClassesDetails from "./Classes/ClassesDetails.jsx";
import ListClasses from "./Classes/ListClasses.jsx";
import UserDetails from "./Classes/UserDetails.jsx";
import CreateDocument from "./Document/CreateDocument.jsx";
import ListDocument from "./Document/ListDocument.jsx";
import ClassesDetailsInGrades from "./Grades/ClassesDetailsInGrades.jsx";
import CreateExxamInGrades from "./Grades/CreateExxamInGrades.jsx";
import ListClassesInGrades from "./Grades/ListClassesInGrades.jsx";
import UserDetailsInGrades from "./Grades/UserDetailsInGrades.jsx";
import ListClassesInSchedule from "./Schedule/ListClassesInSchedule.jsx";
import CreateChapter from "./Classes/CreateQuestion.jsx";
import CreateQuestion from "./Classes/CreateQuestion.jsx";

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
            <Route path="schedule" element={<ListClassesInSchedule />} />
            <Route path="classes" element={<ListClasses title="Classes" />} />
            <Route path="classes/details/:id" element={<ClassesDetails />} />
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
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
