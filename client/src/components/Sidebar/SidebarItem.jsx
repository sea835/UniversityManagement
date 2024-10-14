import React from "react";

function SidebarItem({ icon, text, active }) {
  const baseClasses = "flex gap-5 justify-between px-3 py-2 mt-3 w-full";
  const activeClasses = active
    ? "text-white rounded-lg bg-stone-400"
    : "text-slate-400";

  return (
    <div className={`${baseClasses} ${activeClasses}`}>
      <div className="flex gap-2">
        <div className="basis-auto">{text}</div>
      </div>
    </div>
  );
}

export default SidebarItem;
