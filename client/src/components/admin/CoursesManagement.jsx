import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import SearchSort from "./SearchSort";
import TableHeader from "../Table/TableHeader";
import Caret from "../Table/Caret";

import "./Caret.css";

const CoursesManagement = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [classesData, setClassesData] = useState([]);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
    const [sort, setSort] = useState({keyToSort: "course id", direction: "ASC"});
  const itemsPerPage = 10;

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/api/subjects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchClassesData = (subjectId) => {
    axios
      .get(`http://localhost:4000/api/classes/subject/${subjectId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setClassesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortField(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEdit = (course) => {
    setCourseToEdit(course);
    setShowEditModal(true);
  };

  const handleDelete = (courseId) => {
    axios
      .delete(`http://localhost:4000/api/subjects/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(`Deleted course with ID: ${courseId}`);
        setData(data.filter((c) => c.subject_id !== courseId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setCourseToEdit(null);
    setShowEditModal(true);
  };

  const handleSave = (course) => {
    if (courseToEdit) {
      // Update existing course
      axios
        .put(
          `http://localhost:4000/api/subjects/${course.subject_id}`,
          course,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(`Updated course with ID: ${course.subject_id}`);
          fetchData();
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add new course
      axios
        .post(`http://localhost:4000/api/subjects`, course, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("Added new course");
          setData([...data, res.data]);
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCourseClick = (course) => {
    if (expandedCourseId === course.subject_id) {
      setExpandedCourseId(null);
      setClassesData([]);
    } else {
      setExpandedCourseId(course.subject_id);
      fetchClassesData(course.subject_id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginatedData = data
    .filter((course) =>
      course.subject_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleHeaderClick = (header) => {
    setSort({
      keyToSort: header,
      direction: 
        header === sort.keyToSort ? sort.direction === "ASC" ? "DESC" : "ASC" : "DESC",
    });
  };
    
  const headers = ["course id", "course name", "credits", "prerequisites", "learning outcomes"];

  return (
    <div className="bg-white rounded-[30px] h-fit p-6 shadow-lg relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Courses Management
          </h1>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add New
          </button>
        </div>
        <SearchSort
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          sortField={sortField}
          handleSort={handleSort}
          sortType="course"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-row"
                  onClick={() => handleHeaderClick(header)}
                >
                  <div 
                    className="flex items-center space-x-1 cursor-pointer"
                  >
                    <span>
                      {header.charAt(0).toUpperCase() +
                      header.slice(1).replace(/([A-Z])/g, " $1")}
                    </span>
                    {header === sort.keyToSort && (
                      <Caret direction={sort.keyToSort === header ? sort.direction : "ASC"} />
                    )}
                    </div>
                </th>
              ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span>Action</span>
                </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((course) => (
              <React.Fragment key={course.subject_id}>
                <tr
                  className="hover:bg-gray-100 transition duration-300 cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.subject_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.subject_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.prerequisites}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.learning_outcomes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(course);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(course.subject_id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedCourseId === course.subject_id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4">
                      <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Class ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Semester ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Lecturer Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Period
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Day of Week
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Week
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-300">
                            {classesData.map((classItem) => (
                              <tr
                                key={classItem.class_id}
                                className="hover:bg-gray-50 transition duration-300"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classItem.class_id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classItem.semester_id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classItem.full_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classItem.period}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classItem.day_of_week}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classItem.week}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className="px-6 py-3 text-right">
                <div className="flex justify-end items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-200 transition duration-300"
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from(
                    { length: Math.ceil(data.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 border rounded-lg transition duration-300 ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    onClick={handleNextPage}
                    className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-200 transition duration-300"
                    disabled={
                      currentPage === Math.ceil(data.length / itemsPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this course?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(courseToDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {courseToEdit ? "Edit Course" : "Add Course"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(courseToEdit);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course ID
                </label>
                <input
                  type="text"
                  value={courseToEdit ? courseToEdit.subject_id : ""}
                  onChange={(e) =>
                    setCourseToEdit({
                      ...courseToEdit,
                      subject_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  value={courseToEdit ? courseToEdit.subject_name : ""}
                  onChange={(e) =>
                    setCourseToEdit({
                      ...courseToEdit,
                      subject_name: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  value={courseToEdit ? courseToEdit.credits : ""}
                  onChange={(e) =>
                    setCourseToEdit({
                      ...courseToEdit,
                      credits: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Prerequisites
                </label>
                <input
                  type="text"
                  value={courseToEdit ? courseToEdit.prerequisites : ""}
                  onChange={(e) =>
                    setCourseToEdit({
                      ...courseToEdit,
                      prerequisites: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Learning Outcomes
                </label>
                <input
                  type="text"
                  value={courseToEdit ? courseToEdit.learning_outcomes : ""}
                  onChange={(e) =>
                    setCourseToEdit({
                      ...courseToEdit,
                      learning_outcomes: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;
