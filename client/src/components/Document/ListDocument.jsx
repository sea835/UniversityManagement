import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { useAuth } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";

const ListDocument = () => {
  const { user } = useAuth();
  console.log("User: ", user);
  const [listDocument, setListDocument] = useState([]);

  const handleGetAllDocument = async () => {
    try {
      const response = await apiService.get(`/materials`);
      console.log(response.data);
      setListDocument(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllDocument();
  }, []);
  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
              Material
            </h2>
          </div>
          <div className="flex">
            <Link
              to={`create`}
              className="px-3 py-2 mb-4 flex text-white"
              style={{
                backgroundColor: " #388E3C",
                marginBottom: "12px",
                borderRadius: "4px",
              }}
            >
              Thêm tài liệu mới
            </Link>
          </div>
        </div>
        <div className="bg-[#F3F3F3] rounded-[20px]">
          <div className="shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6 text-center">Material ID</th>
                  <th className="py-3 px-6 text-center">Semester ID</th>
                  <th className="py-3 px-6 text-center">Class Id</th>
                  <th className="py-3 px-6 text-center">Subject Id</th>
                  <th className="py-3 px-6 text-center">Material Name</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {listDocument?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.material_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.semester_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.class_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.subject_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-center">
                      {item.material_name}
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

export default ListDocument;
