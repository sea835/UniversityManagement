import React from "react";

const Search = () => {
  return (
    <div className="flex gap-2 px-2.5 py-2 text-gray-400 rounded-xl bg-slate-50">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e87f70725125a819a3946e873cda17d20afe79a1932b6dbe4456efc847a02ed4?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
        alt=""
        className="object-contain shrink-0 aspect-[1.04] w-[25px]"
      />
      <input
        className="basis-auto self-center bg-slate-50"
        placeholder="Search Course ID"
      />
    </div>
  );
};

export default Search;
