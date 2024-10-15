import React from "react";
import CourseCard from "./CourseCard";

function CourseGrid() {
  const courses = [
    { id: 1, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
    { id: 2, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
    { id: 3, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
    { id: 4, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
    { id: 5, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
    { id: 6, title: "Computer Networks(CO3093)", teacher: "Teacher name" },
  ];

  return (
    <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
      <div>
        <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
          My Courses
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 bg-[#F3F3F3] p-10 rounded-[20px]">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      <nav
        className="flex gap-1.5 items-start self-end mt-9 mr-5 text-sm font-semibold whitespace-nowrap text-zinc-800 max-md:mr-2.5"
        aria-label="Pagination"
      >
        <button
          className="px-1 py-2 bg-white rounded-lg min-h-[32px] text-stone-300"
          disabled
        >
          Prev
        </button>
        <button
          className="px-2.5 w-8 h-8 text-white rounded-lg bg-stone-400 min-h-[32px]"
          aria-current="page"
        >
          1
        </button>
        <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
          2
        </button>
        <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
          3
        </button>
        <span className="px-2.5 w-8 h-8 bg-white rounded-lg min-h-[32px]">
          ...
        </span>
        <button className="pr-2 pl-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
          10
        </button>
        <button className="px-1 py-2 bg-white rounded-lg min-h-[32px]">
          Next
        </button>
      </nav>
    </div>
  );
}

export default CourseGrid;
