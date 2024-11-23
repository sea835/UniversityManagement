import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiservice";

const CreateDocument = () => {
  const [listClass, setListClass] = useState([]);

  const [dataCreate, setDataCreate] = useState({
    material_id: "",
    class_id: "",
    semester_id: "HK241",
    material_name: "",
  });

  const handleGetAllClass = async () => {
    try {
      const response = await apiService.get(`/classes`);
      console.log("Class: ", response.data);
      setListClass(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function generateRandomString() {
    const prefix = "TL";
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Tạo số ngẫu nhiên trong khoảng 100-999
    return `${prefix}${randomNumbers.toString().substring(0, 3)}`; // Lấy 2 chữ số đầu tiên
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataSend = { ...dataCreate };
    dataSend.material_id = generateRandomString();
    try {
      const result = await apiService.post("materials", dataSend);
      console.log(result);

      alert("Thêm tài liệu thành công !");
    } catch (error) {
      console.error(error);
      alert("Thêm tài liệu không thành công, vui lòng kiểm tra lại dữ liệu !");
    }
    console.log("dataSend: ", dataSend);
  };

  useEffect(() => {
    handleGetAllClass();
  }, []);
  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div className="flex">
          <Link
            to={`/dashboard/document`}
            className="px-3 py-2 mb-4 flex text-white"
            style={{
              backgroundColor: "#A8A29E",
              marginBottom: "12px",
              borderRadius: "4px",
            }}
          >
            Quay trở lại
          </Link>
        </div>
        <div>
          <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
            Thêm tài liệu mới
          </h2>
        </div>
        <div className="bg-[#F3F3F3] rounded-[20px]">
          <div className="shadow-sm border rounded-lg overflow-x-auto py-8">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="w-1/2 px-6 py-4 mx-auto">
                <div className="flex flex-col">
                  <label
                    className=""
                    style={{ paddingBottom: "12px", outline: "none" }}
                  >
                    Tên tài liệu
                  </label>
                  <input
                    placeholder="Tên tài liệu"
                    name="material_name"
                    required
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        material_name: e.target.value,
                      }))
                    }
                    style={{ padding: "6px 12px", borderRadius: 4 }}
                  />
                </div>
                <div className="flex flex-col mt-6">
                  <label className="" style={{ paddingBottom: "12px" }}>
                    Lớp học
                  </label>
                  <select
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      outline: "none",
                    }}
                    required
                    name="class_id"
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        class_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">Chọn lớp học</option>
                    {listClass?.map((item, index) => (
                      <option value={item.class_id} key={index}>
                        {item?.class_id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center w-full justify-center mt-6">
                <button
                  style={{
                    backgroundColor: "#388E3C",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                  type="submit"
                >
                  Thêm bài kiểm tra
                </button>
              </div>
            </form>
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

export default CreateDocument;
