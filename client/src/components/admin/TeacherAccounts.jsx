import React from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import { useEffect, useState } from "react";
import SearchSort from "./SearchSort";

const TeacherAccounts = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [lecturerToDelete, setLecturerToDelete] = useState(null);
  const [lecturerToEdit, setLecturerToEdit] = useState(null);
  const itemsPerPage = 10;

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/api/lecturers`, {
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

  const getLastName = (fullName) => {
    return fullName.split(" ").slice(-1)[0];
  };

  const truncateEmail = (email) => {
    const maxLength = 20;
    return email.length > maxLength ? email.slice(0, maxLength) + "..." : email;
  };

  const handleEdit = (lecturer) => {
    setLecturerToEdit(lecturer);
    setShowEditModal(true);
  };

  const handleDelete = (lecturerId) => {
    axios
      .delete(`http://localhost:4000/api/lecturers/${lecturerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(`Deleted lecturer with ID: ${lecturerId}`);
        setData(data.filter((teacher) => teacher.lecturer_id !== lecturerId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmDelete = (lecturerId) => {
    setLecturerToDelete(lecturerId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setLecturerToEdit(null);
    setShowEditModal(true);
  };

  const handleSave = (lecturer) => {
    if (lecturerToEdit) {
      // Update existing lecturer
      axios
        .put(
          `http://localhost:4000/api/lecturers/${lecturer.lecturer_id}`,
          lecturer,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(`Updated lecturer with ID: ${lecturer.lecturer_id}`);
          setData(
            data.map((teacher) =>
              teacher.lecturer_id === lecturer.lecturer_id ? res.data : teacher
            )
          );
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add new lecturer
      axios
        .post(`http://localhost:4000/api/lecturers`, lecturer, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("Added new lecturer");
          setData([...data, res.data]);
          setShowEditModal(false);
          setCurrentPage(1); // Reset to the first page
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [handleSave, handleDelete, handleAdd]);

  const paginatedData = data
    .filter((teacher) =>
      teacher.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === "full_name") {
        const lastNameA = getLastName(a.full_name);
        const lastNameB = getLastName(b.full_name);
        if (lastNameA < lastNameB) return -1;
        if (lastNameA > lastNameB) return 1;
        return 0;
      }
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
            Lecturer Accounts
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
                Lecturer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((teacher) => (
              <tr
                key={teacher.lecturer_id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.lecturer_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {truncateEmail(teacher.email)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.specialization}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(teacher.lecturer_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
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
            <p>Are you sure you want to delete this lecturer?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(lecturerToDelete)}
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
              {lecturerToEdit ? "Edit Lecturer" : "Add Lecturer"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(lecturerToEdit);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lecturer ID
                </label>
                <input
                  type="text"
                  value={lecturerToEdit ? lecturerToEdit.lecturer_id : ""}
                  onChange={(e) =>
                    setLecturerToEdit({
                      ...lecturerToEdit,
                      lecturer_id: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={lecturerToEdit ? lecturerToEdit.full_name : ""}
                  onChange={(e) =>
                    setLecturerToEdit({
                      ...lecturerToEdit,
                      full_name: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={lecturerToEdit ? lecturerToEdit.email : ""}
                  onChange={(e) =>
                    setLecturerToEdit({
                      ...lecturerToEdit,
                      email: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={lecturerToEdit ? lecturerToEdit.phone_number : ""}
                  onChange={(e) =>
                    setLecturerToEdit({
                      ...lecturerToEdit,
                      phone_number: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  value={lecturerToEdit ? lecturerToEdit.specialization : ""}
                  onChange={(e) =>
                    setLecturerToEdit({
                      ...lecturerToEdit,
                      specialization: e.target.value,
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

export default TeacherAccounts;
