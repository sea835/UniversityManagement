import React from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import { useEffect, useState } from "react";
import SearchSort from "./SearchSort";

const DepartmentsManagement = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [expandedDepartmentId, setExpandedDepartmentId] = useState(null);
  const [subjectsData, setSubjectsData] = useState([]);
  const itemsPerPage = 10;

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/api/departments`, {
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

  const fetchSubjectsData = (departmentId) => {
    axios
      .get(`http://localhost:4000/api/subjects/department/${departmentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSubjectsData(res.data);
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

  const handleEdit = (department) => {
    setDepartmentToEdit(department);
    setShowEditModal(true);
  };

  const handleDelete = (departmentId) => {
    axios
      .delete(`http://localhost:4000/api/departments/${departmentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(`Deleted department with ID: ${departmentId}`);
        setData(data.filter((d) => d.department_id !== departmentId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmDelete = (departmentId) => {
    setDepartmentToDelete(departmentId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setDepartmentToEdit(null);
    setShowEditModal(true);
  };

  const handleSave = (department) => {
    if (departmentToEdit) {
      // Update existing department
      axios
        .put(
          `http://localhost:4000/api/departments/${department.department_id}`,
          department,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(
            `Updated department with ID: ${department.department_id}`
          );
          fetchData();
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add new department
      axios
        .post(`http://localhost:4000/api/departments`, department, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("Added new department");
          setData([...data, res.data]);
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDepartmentClick = (department) => {
    if (expandedDepartmentId === department.department_id) {
      setExpandedDepartmentId(null);
      setSubjectsData([]);
    } else {
      setExpandedDepartmentId(department.department_id);
      fetchSubjectsData(department.department_id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginatedData = data
    .filter((department) =>
      department.department_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
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
            Departments Management
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
                Department ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((department) => (
              <React.Fragment key={department.department_id}>
                <tr
                  className="hover:bg-gray-100 transition duration-300 cursor-pointer"
                  onClick={() => handleDepartmentClick(department)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {department.department_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {department.department_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(department);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(department.department_id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedDepartmentId === department.department_id && (
                  <tr>
                    <td colSpan="3" className="px-6 py-4">
                      <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Subject ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Subject Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Credits
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Prerequisites
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Learning Outcomes
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-300">
                            {subjectsData.map((subject) => (
                              <tr
                                key={subject.subject_id}
                                className="hover:bg-gray-50 transition duration-300"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {subject.subject_id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {subject.subject_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {subject.credits}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {subject.prerequisites}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {subject.learning_outcomes}
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
              <td colSpan="3" className="px-6 py-3 text-right">
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
            <p>Are you sure you want to delete this department?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(departmentToDelete)}
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
              {departmentToEdit ? "Edit Department" : "Add Department"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(departmentToEdit);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Department ID
                </label>
                <input
                  type="text"
                  value={departmentToEdit ? departmentToEdit.department_id : ""}
                  onChange={(e) =>
                    setDepartmentToEdit({
                      ...departmentToEdit,
                      department_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  value={
                    departmentToEdit ? departmentToEdit.department_name : ""
                  }
                  onChange={(e) =>
                    setDepartmentToEdit({
                      ...departmentToEdit,
                      department_name: e.target.value,
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

export default DepartmentsManagement;
