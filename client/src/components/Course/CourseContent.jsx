import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CourseContent() {
  const { id } = useParams(); // Extract courseId from the URL
  //console.log(id); // Log courseId to the console
  const [view, setView] = useState("course"); // State to toggle between Course and Grade

  const chapters = [
    {
      chapter_order: 1,
      material_id: "TL001",
      class_id: "L01",
      title: "Chương 1",
      text_content: "Văn bản 1",
      video_content: "Video 1",
      image_content: "Hình ảnh 1",
    },
    {
      chapter_order: 2,
      material_id: "TL002",
      class_id: "L02",
      title: "Chương 2",
      text_content: "Văn bản 2",
      video_content: "Video 2",
      image_content: "Hình ảnh 2",
    },
  ];

  return (
    <section className="flex flex-col grow px-5 py-8 w-full bg-white rounded-3xl">
      <h2 className="self-start text-2xl font-semibold tracking-wide text-black">
        Computer Networks (CO3093) - Teacher Name
      </h2>

      {/* Toggle buttons */}
      <div className="flex space-x-4 mt-5">
        <button
          onClick={() => setView("course")}
          className={`px-4 py-2 rounded-full ${
            view === "course" ? "bg-white text-primary" : "bg-white text-black"
          }`}
        >
          Course
        </button>
        <button
          onClick={() => setView("grade")}
          className={`px-4 py-2 rounded-full ${
            view === "grade" ? "bg-white text-primary" : "bg-white text-black"
          }`}
        >
          Grade
        </button>
      </div>

      {/* Render based on selected view */}
      <div className="flex flex-col items-start py-9 px-10 mt-7 w-full rounded-xl bg-zinc-100 max-md:pl-5 max-md:max-w-full">
        {view === "course" ? (
          <div className="flex flex-wrap gap-2 self-stretch mt-7">
            <ExercisesSection />
            {chapters.map((chapter) => (
              <ChapterSection
                key={chapter.chapter_order}
                name={chapter.title}
                // score={chapter.class_id}
                order={chapter.chapter_order}
                content={chapter.text_content}
              />
            ))}
          </div>
        ) : (
          <GradeSection />
        )}
      </div>
    </section>
  );
}

// Remaining components (ExercisesSection, ChapterSection, GradeSection) unchanged

function ExercisesSection() {
  return (
    <Link to={`exercises`} className="w-full">
      <div className="flex flex-col grow shrink-0 basis-0 w-full">
        <div className="flex overflow-hidden flex-col justify-center px-8 py-6 bg-white rounded-xl min-h-[149px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <h3 className="text-lg font-medium text-black">Exercises</h3>
            <div className="flex flex-col mt-5 max-w-full w-[780px]">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex flex-col bg-neutral-200 bg-opacity-80 max-md:pr-5 max-md:max-w-full">
                  <div className="flex shrink-0 h-1.5 bg-zinc-700 max-md:max-w-full" />
                </div>
              </div>
              <div className="text-xs text-stone-500 text-opacity-80">
                95/100
              </div>
            </div>
            <p className="mt-5 text-base text-stone-500 max-md:max-w-full">
              Please add your content here. Keep it short and simple. And smile
              :)
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ChapterSection({ name, order, content }) {
  return (
    <Link to={`chapter/${order}`} className="w-full">
      <div className="flex overflow-hidden flex-row mt-7 bg-white rounded-xl w-full">
        <div className="flex overflow-hidden flex-col p-6 w-36 bg-neutral-200 max-md:px-5">
          <div className="flex flex-col justify-center self-start">
            <div className="self-start text-xs text-center text-stone-500">
              {name}
            </div>
            <div className="text-lg font-medium tracking-wider text-neutral-900">
              Name
            </div>
          </div>
          <div className="mt-20 text-xs text-zinc-700 max-md:mt-10">
            Something here
          </div>
        </div>
        <div className="flex flex-col self-start py-6 w-full ">
          <div className="flex flex-col px-6 w-full max-md:pl-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
              <h4 className="text-lg font-medium text-black">{name}</h4>
              <div className="flex flex-col"></div>
            </div>
            <p className="self-start mt-9 text-sm text-stone-500 max-md:max-w-full">
              {content}
            </p>
            <button className="gap-2.5 w-20 self-end px-3 py-2 mt-7 text-xs text-white whitespace-nowrap border border-solid bg-zinc-700 border-zinc-700 rounded-[100px] max-md:mr-2.5">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function GradeSection() {
  return (
    <div className="flex flex-col w-full bg-white p-6 rounded-xl">
      <h3 className="text-lg font-medium text-black">Grades</h3>
      <p className="mt-5 text-base text-stone-500">
        Your grades for the course are: 95/100.
      </p>
    </div>
  );
}

export default CourseContent;