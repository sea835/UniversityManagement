import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../../services/apiservice";

const ClassesDetails = () => {
  const { id } = useParams();

  const [listUser, setListUser] = useState([]);
  const [classes, setClasses] = useState({});

  const handleGetClassDetails = async (id) => {
    try {
      const response = await apiService.get(`/classes/details/${id}`);
      console.log(response.data);
      setListUser(response.data?.dataUser);
      setClasses(response.data?.subjectDetails[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB").format(date); // DD/MM/YYYY
  };

  useEffect(() => {
    handleGetClassDetails(id);
  }, []);
  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
              Classes {classes.subject_name}
            </h2>
          </div>
          <div className="flex">
            <Link
              to={`/dashboard/classes/details/create/${classes.subject_id}`}
              className="px-3 py-2 mb-4 flex text-white"
              style={{
                backgroundColor: " #388E3C",
                marginBottom: "12px",
                borderRadius: "4px",
              }}
            >
              Tạo bài kiểm tra
            </Link>
          </div>
        </div>
        <div className="bg-[#F3F3F3] rounded-[20px]">
          <div className="shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Student ID</th>
                  <th className="py-3 px-6">Customer name</th>
                  <th className="py-3 px-6">Phone Number</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6 text-center">Birthday</th>
                  <th className="py-3 px-6 text-center">Gender</th>
                  <th className="py-3 px-6 text-center">Address</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {listUser?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <Link
                        to={`/dashboard/classes/details/${classes.subject_id}/User/${item.student_id}`}
                      >
                        {item.student_id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <Link
                        to={`/dashboard/classes/details/${classes.subject_id}/User/${item.student_id}`}
                      >
                        {item.full_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {item.phone_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {formatDate(item.date_of_birth)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.address}
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

export default ClassesDetails;
