import { useEffect, useState } from "react";
import apiService from "../../services/apiservice";
import { useAuth } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";

const ListClasses = ({ title }) => {
  const { user } = useAuth();
  const [listClass, setListClass] = useState([]);

  const handleGetAllCourse = async (id) => {
    try {
      const response = await apiService.get(`/classes/lecturer/${id}`);
      console.log(response.data);
      setListClass(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllCourse(user.lecturer_id);
  }, []);

  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div>
          <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
            {title}
          </h2>
        </div>
        <div className="bg-[#F3F3F3] rounded-[20px]">
          <div className="shadow-sm rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Course ID
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Course Name
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Number of creadits
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Semester Id
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Class ID
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Day off week
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Lesson
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Campus
                  </th>
                  <th className="py-3 px-6" style={{ color: "#ccc" }}>
                    Learning Weeks
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {listClass?.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: "#fff" }}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <Link
                        to={`/dashboard/classes/details/${item.subject_id}`}
                      >
                        {item.subject_id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <Link
                        to={`/dashboard/classes/details/${item.subject_id}`}
                      >
                        {item.subject_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.semester_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.class_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.day_of_week}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.day_of_week}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.week}
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

export default ListClasses;
