import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import apiService from "../../services/apiservice";

const CreateQuestion = () => {
  const { id } = useParams();
  const location = useLocation();

  // Phân tích query string
  const queryParams = new URLSearchParams(location.search);
  const chapterName = queryParams.get("chapterName");
  const desc = queryParams.get("desc");
  console.log(chapterName, desc);

  const [supject, setSubject] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [classes, setClasses] = useState({});
  const [listChapter, setListChapter] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [dataCreate, setDataCreate] = useState({
    exam_id: "",
    subject_id: "",
    class_id: "",
    semester_id: "HK241",
    material_id: "",
    chapter_id: "",
    exam_name: "",
  });

  const handleGetAllChapter = async () => {
    try {
      const response = await apiService.get(`/chapters`);
      console.log(response.data);
      setListChapter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetMaterial = async () => {
    try {
      const response = await apiService.get(`/materials`);
      console.log(response.data);
      setListMaterial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetClassDetails = async (id) => {
    try {
      const responseGetClass = await apiService.get(`/classesBySubject/${id}`);
      const response = await apiService.get(`/classes/details/${id}`);
      console.log(responseGetClass.data);
      setClasses(responseGetClass.data[0]);
      setSubject(response.data?.subjectDetails[0]);
      setDataCreate((prev) => ({
        ...prev,
        subject_id: response.data?.subjectDetails[0]?.subject_id,
        class_id: responseGetClass.data[0]?.class_id,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  function generateRandomString() {
    const prefix = "BKT";
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Tạo số ngẫu nhiên trong khoảng 100-999
    return `${prefix}${randomNumbers.toString().substring(0, 3)}`; // Lấy 2 chữ số đầu tiên
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataSend = { ...dataCreate };
    dataSend.exam_id = generateRandomString();
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await apiService.post("exams", dataSend);
      alert("Thêm bài kiểm tra thành công !");
    } catch (error) {
      console.error(error);
      alert(
        "Thêm bài kiểm tra không thành công, vui lòng kiểm tra lại dữ liệu !"
      );
    }
    console.log("dataSend: ", dataSend);
  };

  useEffect(() => {
    handleGetClassDetails(id);
    handleGetAllChapter();
    handleGetMaterial();
  }, []);
  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div className="flex">
          <Link
            to={`/dashboard/classes/details/${supject?.subject_id}`}
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
            {supject?.subject_name} - {supject?.subject_id}
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
                    Tiêu đề
                  </label>
                  <input
                    placeholder="Tiêu đề"
                    name="exam_name"
                    required
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        exam_name: e.target.value,
                      }))
                    }
                    style={{ padding: "6px 12px", borderRadius: 4 }}
                  />
                </div>
                <div className="flex flex-col mt-6">
                  <label
                    className=""
                    style={{ paddingBottom: "12px", outline: "none" }}
                  >
                    Nội dung
                  </label>
                  <textarea
                    placeholder="Tiêu đề"
                    name="exam_name"
                    required
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        exam_name: e.target.value,
                      }))
                    }
                    style={{ padding: "6px 12px", borderRadius: 4 }}
                  ></textarea>
                </div>
                <div className="flex flex-col mt-6">
                  <label className="" style={{ paddingBottom: "12px" }}>
                    Tài liệu bài học
                  </label>
                  <select
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      outline: "none",
                    }}
                    required
                    name="material_id"
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        material_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">Chọn tài liệu bài học</option>
                    {listMaterial?.map((item, index) => (
                      <option value={item.material_id} key={index}>
                        {item?.material_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mt-6">
                  <label className="" style={{ paddingBottom: "12px" }}>
                    Chương bài học
                  </label>
                  <select
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      outline: "none",
                    }}
                    name="chapter_id"
                    required
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        chapter_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">Chọn tài liệu bài học</option>
                    {listChapter?.map((item, index) => (
                      <option value={item.chapter_id} key={index}>
                        {item?.title}
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

export default CreateQuestion;
