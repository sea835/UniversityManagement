import React from "react";
import Search from "./Search";
import Sort from "./Sort";

function ClassesTable() {
  const classesData = [
    {
      courseId: "SP1035",
      courseName: "Scientific Socialism",
      credits: "2",
      classId: "L01",
      dayOfWeek: "2",
      lesson: "2 3",
      campus: "1",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "CO3093",
      courseName: "Computer Networks",
      credits: "3",
      classId: "L01",
      dayOfWeek: "3",
      lesson: "2 3 4",
      campus: "2",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "CO2013",
      courseName: "Database Systems",
      credits: "4",
      classId: "L01",
      dayOfWeek: "5",
      lesson: "2 3",
      campus: "2",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "CO3001",
      courseName: "Software Engineering",
      credits: "3",
      classId: "L01",
      dayOfWeek: "2",
      lesson: "13 14",
      campus: "2",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "CO3105",
      courseName: "Programming Intergration Project",
      credits: "1",
      classId: "L01",
      dayOfWeek: "4",
      lesson: "4",
      campus: "1",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "SP1039",
      courseName: "History of Vietnamese Communist Party",
      credits: "2",
      classId: "L01",
      dayOfWeek: "5",
      lesson: "4 5",
      campus: "2",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "CO2001",
      courseName: "Professional Skills for Engineers",
      credits: "3",
      classId: "L01",
      dayOfWeek: "2",
      lesson: "2 3",
      campus: "1",
      learningWeeks: "1-2-3-4-6-7",
    },
    {
      courseId: "CO3005",
      courseName: "Principles of Programming Languages",
      credits: "4",
      classId: "L01",
      dayOfWeek: "6",
      lesson: "8 9 10",
      campus: "1",
      learningWeeks: "1-2-3-4-6-7",
    },
  ];

  return (
    <div className="flex flex-col px-12 w-[full] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
        <h2 className="self-start text-2xl font-semibold tracking-tight text-black">
          Classes
        </h2>
        <div className="flex gap-4 text-xs tracking-normal">
          <Search />
          <Sort />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 mt-10 max-w-full text-sm font-medium tracking-normal text-gray-400 w-[841px]">
        <div className="flex gap-8 self-start">
          <span>Course ID</span>
          <span>Course Name</span>
        </div>
        <div className="flex flex-auto gap-3.5">
          <span className="grow">Number of credits</span>
          <span>Class ID</span>
          <span>Day of week</span>
          <span>Lesson</span>
          <span>Campus</span>
          <span className="basis-auto">Learning Weeks</span>
        </div>
      </div>
      <hr className="shrink-0 mt-5 max-w-full h-px border border-solid border-zinc-100 w-[947px]" />
      {classesData.map((classItem, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[824px] text-sm font-medium text-zinc-800">
            <span className="tracking-normal">{classItem.courseId}</span>
            <span className="grow shrink tracking-normal w-[130px]">
              {classItem.courseName}
            </span>
            <span className="tracking-normal">{classItem.credits}</span>
            <span className="tracking-normal">{classItem.classId}</span>
            <span className="tracking-normal">{classItem.dayOfWeek}</span>
            <span className="tracking-normal">{classItem.lesson}</span>
            <span className="tracking-normal">{classItem.campus}</span>
            <span className="text-neutral-600">{classItem.learningWeeks}</span>
          </div>
          <hr className="shrink-0 mt-8 max-w-full h-px border border-solid border-zinc-100 w-[898px]" />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ClassesTable;
