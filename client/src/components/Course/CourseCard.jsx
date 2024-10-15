import React from "react";

function CourseCard({ title, teacher }) {
  return (
    <div className="flex overflow-hidden flex-col grow rounded-xl min-h-[240px]">
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
        <h3 className="text-base font-medium text-black">{title}</h3>
        <p className="mt-1 text-sm text-zinc-700">{teacher}</p>
      </div>
    </div>
  );
}

export default CourseCard;
