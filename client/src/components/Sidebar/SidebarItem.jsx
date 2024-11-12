import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ icon, text, path, active, onClick }) {
  const baseClasses =
    "flex gap-5 justify-between px-3 py-2 mt-3 w-full cursor-pointer transition-all duration-300 ease-in-out";
  const activeClasses = active
    ? "text-white rounded-lg"
    : "text-slate-400 bg-transparent";

  return (
    <Link
      to={path}
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
      style={{ backgroundColor: active ? "#BEB29F" : "" }}
    >
      <div className="flex gap-2">
        {/* You can add icon rendering here if needed */}
        <div className="basis-auto">{text}</div>
      </div>
    </Link>
  );
}

export default SidebarItem;
