// import React from "react";
// import CourseCard from "./CourseCard";

// function CourseGrid() {
//   const courses = [
//     { id: 1, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
//     { id: 2, title: "Software Project Management(CO3011)", teacher: "Teacher name" },
//     { id: 3, title: "Compiler Construction(CO3013)", teacher: "Teacher name" },
//     { id: 4, title: "Software Testing(CO3015)", teacher: "Teacher name" },
//     { id: 5, title: "Software Architecture(CO3017)", teacher: "Teacher name" },
//     { id: 6, title: "Database Management Systems(CO3021)", teacher: "Teacher name" },
//     { id: 7, title: "Distributed and Object-Oriented Databases(CO3023)", teacher: "Teacher name" },
//     { id: 8, title: "Electronic Commerce(CO3027)", teacher: "Teacher name" },
//     { id: 9, title: "Data Mining(CO3029)", teacher: "Teacher name" },
//     { id: 10, title: "Algorithms-Design and Analysis(CO3031)", teacher: "Teacher name" },
//     { id: 11, title: "Information System Security(CO3033)", teacher: "Teacher name" },
//     { id: 12, title: "Real-Time Systems(CO3035)", teacher: "Teacher name" },
//     { id: 13, title: "Internet of Things Application Development(CO3037)", teacher: "Teacher name" },
//     { id: 14, title: "Intelligent Systems(CO3041)", teacher: "Teacher name" },
//     { id: 15, title: "Mobile Application Development(CO3043)", teacher: "Teacher name" },
//     { id: 16, title: "Game Programming(CO3045)", teacher: "Teacher name" },
//     { id: 17, title: "Advanced Computer Networks(CO3047)", teacher: "Teacher name" },
//     { id: 18, title: "Web Programming(CO3049)", teacher: "Teacher name" },
//     { id: 19, title: "Mobile Systems(CO3051)", teacher: "Teacher name" },
//     { id: 20, title: "Digital Image Processing and Computer Vision(CO3057)", teacher: "Teacher name" },
//     { id: 21, title: "Computer Graphics(CO3059)", teacher: "Teacher name" },
//     { id: 22, title: "Introduction to Artificial Intelligence(CO3061)", teacher: "Teacher name" },
//     { id: 23, title: "Advanced Software Engineering(CO3065)", teacher: "Teacher name" },
//     { id: 24, title: "Parallel Computing(CO3067)", teacher: "Teacher name" },
//     { id: 25, title: "Cryptography and Network Security(CO3069)", teacher: "Teacher name" },
//     { id: 26, title: "Distributed Systems(CO3071)", teacher: "Teacher name" },
//     { id: 27, title: "Advance Cryptography and Coding Theory(CO3083)", teacher: "Teacher name" },
//     { id: 28, title: "Natural Language Processing(CO3085)", teacher: "Teacher name" },
//     { id: 29, title: "Selected Topics in High Performance Computing(CO3089)", teacher: "Teacher name" },
//     { id: 30, title: "Systems Analysis and Design(CO3115)", teacher: "Teacher name" },
//     { id: 31, title: "Information and Social Networks(CO4025)", teacher: "Teacher name" },
//     { id: 32, title: "Machine Learning(CO3117)", teacher: "Teacher name" },
//     { id: 33, title: "Data Warehouses and Decision Support Systems(CO4031)", teacher: "Teacher name" },
//     { id: 34, title: "Big Data Analytics and Business Intelligence(CO4033)", teacher: "Teacher name" },
//     { id: 35, title: "Enterprise Resource Planning Systems(CO4035)", teacher: "Teacher name" },
//     { id: 36, title: "Management Information Systems(CO4037)", teacher: "Teacher name" },
//     { id: 37, title: "Biometric Security(CO4039)", teacher: "Teacher name" },
//   ];

//   return (
//     <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
//       <div>
//         <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
//           My Courses
//         </h2>
//       </div>
//       <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 bg-[#F3F3F3] p-10 rounded-[20px]">
//         {courses.map((course) => (
//           <CourseCard key={course.id} {...course} />
//         ))}
//       </div>
//       <nav
//         className="flex gap-1.5 items-start self-end mt-9 mr-5 text-sm font-semibold whitespace-nowrap text-zinc-800 max-md:mr-2.5"
//         aria-label="Pagination"
//       >
//         <button
//           className="px-1 py-2 bg-white rounded-lg min-h-[32px] text-stone-300"
//           disabled
//         >
//           Prev
//         </button>
//         <button
//           className="px-2.5 w-8 h-8 text-white rounded-lg bg-stone-400 min-h-[32px]"
//           aria-current="page"
//         >
//           1
//         </button>
//         <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
//           2
//         </button>
//         <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
//           3
//         </button>
//         <span className="px-2.5 w-8 h-8 bg-white rounded-lg min-h-[32px]">
//           ...
//         </span>
//         <button className="pr-2 pl-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
//           10
//         </button>
//         <button className="px-1 py-2 bg-white rounded-lg min-h-[32px]">
//           Next
//         </button>
//       </nav>
//     </div>
//   );
// }

// export default CourseGrid;

import React, { useState } from "react";
import CourseCard from "./CourseCard";

function CourseGrid() {
  const courses = [
    { id: 1, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
    { id: 2, title: "Software Project Management(CO3011)", teacher: "Teacher name" },
    { id: 3, title: "Compiler Construction(CO3013)", teacher: "Teacher name" },
    { id: 4, title: "Software Testing(CO3015)", teacher: "Teacher name" },
    { id: 5, title: "Software Architecture(CO3017)", teacher: "Teacher name" },
    { id: 6, title: "Database Management Systems(CO3021)", teacher: "Teacher name" },
    { id: 7, title: "Distributed and Object-Oriented Databases(CO3023)", teacher: "Teacher name" },
    { id: 8, title: "Electronic Commerce(CO3027)", teacher: "Teacher name" },
    { id: 9, title: "Data Mining(CO3029)", teacher: "Teacher name" },
    { id: 10, title: "Algorithms-Design and Analysis(CO3031)", teacher: "Teacher name" },
    { id: 11, title: "Information System Security(CO3033)", teacher: "Teacher name" },
    { id: 12, title: "Real-Time Systems(CO3035)", teacher: "Teacher name" },
    { id: 13, title: "Internet of Things Application Development(CO3037)", teacher: "Teacher name" },
    { id: 14, title: "Intelligent Systems(CO3041)", teacher: "Teacher name" },
    { id: 15, title: "Mobile Application Development(CO3043)", teacher: "Teacher name" },
    { id: 16, title: "Game Programming(CO3045)", teacher: "Teacher name" },
    { id: 17, title: "Advanced Computer Networks(CO3047)", teacher: "Teacher name" },
    { id: 18, title: "Web Programming(CO3049)", teacher: "Teacher name" },
    { id: 19, title: "Mobile Systems(CO3051)", teacher: "Teacher name" },
    { id: 20, title: "Digital Image Processing and Computer Vision(CO3057)", teacher: "Teacher name" },
    { id: 21, title: "Computer Graphics(CO3059)", teacher: "Teacher name" },
    { id: 22, title: "Introduction to Artificial Intelligence(CO3061)", teacher: "Teacher name" },
    { id: 23, title: "Advanced Software Engineering(CO3065)", teacher: "Teacher name" },
    { id: 24, title: "Parallel Computing(CO3067)", teacher: "Teacher name" },
    { id: 25, title: "Cryptography and Network Security(CO3069)", teacher: "Teacher name" },
    { id: 26, title: "Distributed Systems(CO3071)", teacher: "Teacher name" },
    { id: 27, title: "Advance Cryptography and Coding Theory(CO3083)", teacher: "Teacher name" },
    { id: 28, title: "Natural Language Processing(CO3085)", teacher: "Teacher name" },
    { id: 29, title: "Selected Topics in High Performance Computing(CO3089)", teacher: "Teacher name" },
    { id: 30, title: "Systems Analysis and Design(CO3115)", teacher: "Teacher name" },
    { id: 31, title: "Information and Social Networks(CO4025)", teacher: "Teacher name" },
    { id: 32, title: "Machine Learning(CO3117)", teacher: "Teacher name" },
    { id: 33, title: "Data Warehouses and Decision Support Systems(CO4031)", teacher: "Teacher name" },
    { id: 34, title: "Big Data Analytics and Business Intelligence(CO4033)", teacher: "Teacher name" },
    { id: 35, title: "Enterprise Resource Planning Systems(CO4035)", teacher: "Teacher name" },
    { id: 36, title: "Management Information Systems(CO4037)", teacher: "Teacher name" },
    { id: 37, title: "Biometric Security(CO4039)", teacher: "Teacher name" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
      <div>
        <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
          My Courses
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 bg-[#F3F3F3] p-10 rounded-[20px]">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      <nav
        className="flex gap-1.5 items-start self-end mt-9 mr-5 text-sm font-semibold whitespace-nowrap text-zinc-800 max-md:mr-2.5"
        aria-label="Pagination"
      >
        <button
          className="px-1 py-2 bg-white rounded-lg min-h-[32px] text-stone-300"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-2.5 w-8 h-8 rounded-lg ${currentPage === index + 1 ? 'bg-stone-400 text-white' : 'bg-white border border-solid border-zinc-100'}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-1 py-2 bg-white rounded-lg min-h-[32px]"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default CourseGrid;

