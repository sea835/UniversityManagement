import React from "react";

const SearchSort = ({ searchTerm, handleSearch, sortField, handleSort }) => {
  return (
    <div className="flex space-x-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 border rounded-lg"
      />
      <select
        value={sortField}
        onChange={handleSort}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Sort By</option>
        <option value="lecturer_id">Lecturer ID</option>
        <option value="full_name">Full Name</option>
        <option value="email">Email</option>
        <option value="phone_number">Phone Number</option>
        <option value="specialization">Specialization</option>
      </select>
    </div>
  );
};

export default SearchSort;
