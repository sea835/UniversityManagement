import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import apiService from "../../services/apiService";
// import apiService from "../../services/apiservice";

const ListCourseinAdmin = () => {
  const [listCourse, setListCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [fillter, setFillter] = useState([]);

  const handleGetListUser = async () => {
    try {
      const response = await apiService.get(`subjects`);
      console.log(response.data);
      setListCourse(response.data);
      setFillter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const hanleSearchData = (value) => {
    setSearch(value);
    const filteredData = listCourse.filter(
      (item) =>
        item.subject_name.toLowerCase().includes(value.toLowerCase()) ||
        item.subject_id.toLowerCase().includes(value.toLowerCase())
    );
    setFillter(filteredData);
  };

  const handleChangeSort = (value) => {
    // setSearch(value);
    const sortedData = [...fillter].sort((a, b) => {
      if (value === "asc") {
        return a.subject_id.localeCompare(b.subject_id); // Tăng dần
      }
      return b.subject_id.localeCompare(a.subject_id); // Giảm dần
    });
    setFillter(sortedData);
  };

  useEffect(() => {
    handleGetListUser();
  }, []);
  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
              List Teacher
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                className="border border-[#ccc] px-4 py-2 rounded outline-none"
                style={{
                  width: "350px",
                  height: "44px",
                  backgroundColor: "#ccc",
                }}
                placeholder="Search Anything..."
                onChange={(e) => hanleSearchData(e.target.value)}
                value={search}
              />
              <i
                className="absolute"
                style={{
                  transform: "translateY(-50%)",
                  top: "50%",
                  right: "16px",
                  color: "#666",
                }}
              >
                <IoSearchSharp />
              </i>
            </div>
            <div
              className="flex items-center rounded"
              style={{
                backgroundColor: "#eee",
                height: "44px",
                padding: "0 20px",
              }}
            >
              <label style={{ color: "#999" }}>Sort by: </label>
              <select
                className="bg-transparent"
                style={{
                  fontWeight: "500",
                  padding: "0 12px",
                  outline: "none",
                }}
                onChange={(e) => handleChangeSort(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="flex">
          <Link
            className="px-3 py-2 mb-4 flex text-white"
            style={{
              backgroundColor: " #388E3C",
              marginBottom: "12px",
              borderRadius: "4px",
            }}
          >
            Tạo bài kiểm tra
          </Link>
        </div> */}
        <div className="bg-[#F3F3F3] rounded-[20px]">
          <div className="shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Subject ID</th>
                  <th className="py-3 px-6">Subject Name</th>
                  <th className="py-3 px-6">Subject Description</th>
                  <th className="py-3 px-6">Department Id</th>
                  <th className="py-3 px-6 text-center">Credits</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {fillter?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <span
                      // to={`/dashboard/grades/${classes.subject_id}/user/${item.student_id}`}
                      >
                        {item.subject_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <span
                      // to={`/dashboard/grades/${classes.subject_id}/user/${item.student_id}`}
                      >
                        {item.subject_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {item.learning_outcomes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.department_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <nav
          className="flex gap-1.5 items-start self-end mt-9 mr-5 text-sm font-semibold whitespace-nowrap text-zinc-800 max-md:mr-2.5"
          aria-label="Pagination"
        >
          <button
            className="px-1 py-2 bg-white rounded-lg min-h-[32px] text-stone-300"
            disabled
          >
            Prev
          </button>
          <button
            className="px-2.5 w-8 h-8 text-white rounded-lg bg-stone-400 min-h-[32px]"
            aria-current="page"
          >
            1
          </button>
          <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
            2
          </button>
          <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
            3
          </button>
          <span className="px-2.5 w-8 h-8 bg-white rounded-lg min-h-[32px]">
            ...
          </span>
          <button className="pr-2 pl-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
            10
          </button>
          <button className="px-1 py-2 bg-white rounded-lg min-h-[32px]">
            Next
          </button>
        </nav> */}
      </div>
    </>
  );
};

export default ListCourseinAdmin;
