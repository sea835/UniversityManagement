import React from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import { useEffect, useState } from "react";
import SearchSort from "./SearchSort";

const ClassesManagement = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [classToEdit, setClassToEdit] = useState(null);
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const itemsPerPage = 10;

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/api/classes`, {
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

  const fetchStudentsData = (classId) => {
    axios
      .get(`http://localhost:4000/api/students/class/${classId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudentsData(res.data);
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

  const handleEdit = (classItem) => {
    setClassToEdit(classItem);
    setShowEditModal(true);
  };

  const handleDelete = (classId) => {
    axios
      .delete(`http://localhost:4000/api/classes/${classId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(`Deleted class with ID: ${classId}`);
        setData(data.filter((c) => c.class_id !== classId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmDelete = (classId) => {
    setClassToDelete(classId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setClassToEdit(null);
    setShowEditModal(true);
  };

  const handleSave = (classItem) => {
    if (classToEdit) {
      axios
        .put(
          `http://localhost:4000/api/classes/${classItem.class_id}`,
          classItem,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(`Updated class with ID: ${classItem.class_id}`);
          fetchData();
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add new class
      axios
        .post(`http://localhost:4000/api/classes`, classItem, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("Added new class");
          setData([...data, res.data]);
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClassClick = (classItem) => {
    if (expandedClassId === classItem.class_id) {
      setExpandedClassId(null);
      setStudentsData([]);
    } else {
      setExpandedClassId(classItem.class_id);
      fetchStudentsData(classItem.class_id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginatedData = data
    .filter((classItem) =>
      classItem.class_id?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white rounded-[30px] h-fit p-6 shadow-lg relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Classes Management
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
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lecturer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day of Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((classItem) => (
              <React.Fragment key={classItem.class_id}>
                <tr
                  className="hover:bg-gray-100 transition duration-300 cursor-pointer"
                  onClick={() => handleClassClick(classItem)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {classItem.class_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {classItem.semester_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {classItem.subject_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {classItem.lecturer_id}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(classItem);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(classItem.class_id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedClassId === classItem.class_id && (
                  <tr>
                    <td colSpan="8" className="px-6 py-4">
                      <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Student ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Full Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Phone Number
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Address
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-300">
                            {studentsData.map((student) => (
                              <tr
                                key={student.student_id}
                                className="hover:bg-gray-50 transition duration-300"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {student.student_id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {student.full_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {student.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {student.phone_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {student.address}
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
              <td colSpan="8" className="px-6 py-3 text-right">
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
            <p>Are you sure you want to delete this class?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(classToDelete)}
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
              {classToEdit ? "Edit Class" : "Add Class"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(classToEdit);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Class ID
                </label>
                <input
                  type="text"
                  value={classToEdit ? classToEdit.class_id : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      class_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Semester ID
                </label>
                <input
                  type="text"
                  value={classToEdit ? classToEdit.semester_id : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      semester_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subject ID
                </label>
                <input
                  type="text"
                  value={classToEdit ? classToEdit.subject_id : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      subject_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lecturer ID
                </label>
                <input
                  type="text"
                  value={classToEdit ? classToEdit.lecturer_id : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      lecturer_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Period
                </label>
                <input
                  type="number"
                  value={classToEdit ? classToEdit.period : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      period: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Day of Week
                </label>
                <input
                  type="number"
                  value={classToEdit ? classToEdit.day_of_week : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      day_of_week: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Week
                </label>
                <input
                  type="number"
                  value={classToEdit ? classToEdit.week : ""}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      week: e.target.value,
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

export default ClassesManagement;
