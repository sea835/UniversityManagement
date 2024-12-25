import React from "react";

const SearchSort = ({ searchTerm, handleSearch, sortField, handleSort, sortType }) => {

  const optionType = (type) => {
    if (type === "lecturer") {
      return (
        <>
          <option value="lecturer_id">Lecturer ID</option>
          <option value="full_name">Name</option>
          <option value="email">Email</option>
          <option value="phone_number">Phone number</option>
          <option value="specialization">Specialization</option>
        </>
      );
    }
    else if (type === "student") {
      return (
        <>
          <option value="student_id">Student ID</option>
          <option value="full_name">Name</option>
          <option value="email">Email</option>
          <option value="phone_number">Phone number</option>
          <option value="address">Batch</option>
        </>
      );
    } 
    else if (type === "course") {
      return (
        <>
          <option value="course_id">Course ID</option>
          <option value="course_name">Course Name</option>
          <option value="credits">Credit Hour</option>
          <option value="prerequisites">Prerequisites</option>
          <option value="learning_outcomes">Learning Outcomes</option>
        </>
      );
    }
    else if (type === "department") {
      return (
        <>
          <option value="department_id">Department ID</option>
          <option value="department_name">Department Name</option>
        </>
      );
    }
    else if (type === "class") {
      return (
        <>
          <option value="class_id">Class ID</option>
          <option value="semester_id">Semester ID</option>
          <option value="subject_id">Subject ID</option>
          <option value="lecturer_id">Lecturer ID</option>
          <option value="period">Period</option>
          <option value="day_of_week">Day of week</option>
          <option value="week">Week</option>
        </>
      );
    }
  };
 
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
        {optionType(sortType)}
      </select>
    </div>
  );
};

export default SearchSort;
