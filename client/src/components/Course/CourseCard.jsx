import React from "react";
import { Link } from "react-router-dom";

function CourseCard({
  subject_id,
  semester_id,
  subject_name,
  full_name,
  class_id,
  learning_outcomes,
  credits,
}) {
  return (
    <Link
      to={`${subject_id}`}
      className="flex overflow-hidden flex-col grow rounded-xl min-h-[240px] hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col items-start w-full bg-white">
        <div className="flex pr-16 max-w-full w-[360px] max-md:pr-5">
          <div className="flex shrink-0 bg-neutral-200 h-[120px] w-[120px]" />
          <div className="flex shrink-0 bg-neutral-200 bg-opacity-50 h-[120px] w-[120px]" />
          <div className="flex shrink-0 w-14 bg-neutral-200 h-[120px]" />
        </div>
        <div className="flex items-start">
          <div className="flex shrink-0 bg-neutral-200 bg-opacity-50 h-[120px] w-[120px]" />
          <div className="flex shrink-0 bg-neutral-200 h-[120px] w-[120px]" />
          <div className="flex shrink-0 bg-neutral-200 bg-opacity-50 h-[120px] w-[120px]" />
        </div>
      </div>
      <div className="flex flex-col p-6 w-full bg-white max-md:px-5">
        <h3 className="text-base font-medium text-black">
          {subject_name} {credits ? <>({credits} credits)</> : <></>}
        </h3>
        <p className="mt-1 text-sm text-zinc-700 pr-2">
          {semester_id}
          {full_name ? (
            <>
              -{full_name} ({class_id})
            </>
          ) : (
            <></>
          )}
          {class_id ? <></> : <>Learning outcomes: {learning_outcomes}</>}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
