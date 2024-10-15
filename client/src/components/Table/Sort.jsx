import React from "react";

const Sort = () => {
  return (
    <div className="flex gap-4 px-4 py-3 rounded-xl bg-slate-50 text-zinc-500">
      <span className="basis-auto">
        Sort by :{" "}
        <select className="font-semibold text-zinc-700 bg-slate-50">
          <option value="newest" selected>
            Newest
          </option>
          <option value="first-year">First Year</option>
          <option value="first-year">Seccond Year</option>
          <option value="first-year">Third Year</option>
          <option value="first-year">Fourth Year</option>
        </select>
      </span>
    </div>
  );
};

export default Sort;
