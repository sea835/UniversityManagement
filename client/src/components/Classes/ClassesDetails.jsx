import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import { IoCloudUploadOutline } from "react-icons/io5";
import CreateQuestion from "./CreateQuestion";
import UpdateQuestion from "./UpdateQuestion";

const ClassesDetails = () => {
  const { id } = useParams();

  const [listChapter, setListChapter] = useState([]);
  const [classes, setClasses] = useState({});
  const [listExam, setListExam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreateQ, setShowModalCreateQ] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [typeUpdateQ, setTypeUpdateQ] = useState(false);

  const [previewUrl, setPreviewUrl] = useState("");
  const [showViewFile, setShowViewFile] = useState({
    status: false,
    items: {},
  });
  const [dataImage, setDataImage] = useState();
  const [dataShow, setDataShow] = useState(1);
  const [dataCreate, setDataCreate] = useState();
  const [dataCreateExam, setDataCreateExam] = useState({
    exam_id: "",
    subject_id: "MH001",
    class_id: "L01",
    semester_id: "HK241",
    material_id: "TL010",
    chapter_id: "08",
    exam_name: "",
  });

  // const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleGetListChapter = async (id) => {
    try {
      const response = await apiService.get(`/chapters/list/${id}`);
      setListChapter(response.data?.listChapter);
      setClasses(response.data?.classInfo[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckValue = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowUploadFile(true);
  };

  const handleUpdateImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
      } else {
        setPreviewUrl(file.name);
      }
    }
    setDataImage(file);
  };

  const handleCheckFile = (dataImage) => {
    if (dataImage.type.startsWith("image/")) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreateChapter = async (e) => {
    e.preventDefault();
    if (!dataImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", dataImage);
    for (const key in dataCreate) {
      formData.append(key, dataCreate[key]);
    }

    try {
      const response = await apiService.post(`/chapters`, formData);
      alert("Successfully created");
      console.log(response);
      setShowUploadFile(false);
      handleGetListChapter(id);
      setPreviewUrl("");
      setDataImage("");
    } catch (error) {
      console.error(error);
      alert("Failed to create");
    }
  };

  useEffect(() => {
    setDataCreate({
      title: "",
      text_content: "",
      video_content: "Video mẫu",
      subject_id: classes.subject_id,
      semester_id: "HK232",
      material_id: "TL001",
    });
  }, [classes]);

  const handleShowViewChapter = (item) => {
    // setShowViewFile
    setShowQuestion(false);
    setShowUploadFile(false);
    setShowViewFile((prev) => ({ ...prev, status: true, items: item }));
  };

  const handleGetAllQuestions = async () => {
    try {
      const response = await apiService.get(`/questions/exxam/213`);
      console.log(response);
      setListDataQuestion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function generateRandomString() {
    const prefix = "BKT";
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Tạo số ngẫu nhiên trong khoảng 100-999
    return `${prefix}${randomNumbers.toString().substring(0, 3)}`; // Lấy 2 chữ số đầu tiên
  }

  const handleSubmitCreateExam = async (e) => {
    e.preventDefault();

    const dataSend = { ...dataCreateExam };
    dataSend.exam_id = generateRandomString();
    dataSend.subject_id = classes.subject_id;
    try {
      const result = await apiService.post("exams", dataSend);
      setShowModalCreateQ(false);
      setShowQuestion(dataSend.exam_id);
    } catch (error) {
      console.error(error);
      alert("Failed to create !");
    }
  };

  const handleUpdateQuestion = (idExam) => {
    setShowQuestion(idExam);
  };

  const handleDeleteChapter = async (idDelete) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await apiService.delete(`/chapters/${idDelete}`);
        alert("Deleted successfully!");
        handleGetListChapter(id);
      } catch (error) {
        console.error(error);
        alert("Failed to delete!");
      }
    }
  };

  const handleDeleteExam = async (idDelete) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await apiService.delete(`/exams/${idDelete}`);
        alert("Deleted successfully!");
        handleGetAllExam();
      } catch (error) {
        console.error(error);
        alert("Failed to delete!");
      }
    }
  };

  const handleGetAllExam = async () => {
    try {
      const response = await apiService.get(
        `/exams/subject/${classes.subject_id}`
      );
      setListExam(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetAllExam();
  }, [classes]);

  useEffect(() => {
    handleGetAllExam();
    handleGetListChapter(id);
  }, []);

  return (
    <>
      {showViewFile.status && (
        <div
          className="flex items-center justify-center"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        >
          <div
            className=" rounded-xl px-6 py-8"
            style={{ width: "500px", backgroundColor: "#fff" }}
          >
            <div>
              <div>
                <div style={{ marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18, fontWeight: "bold" }}>
                    {showViewFile?.items.title}
                  </h3>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <p> {showViewFile?.items.text_content}</p>
                </div>
                <div style={{ marginBottom: 12 }}>
                  {showViewFile?.items?.image_content ? (
                    <img
                      style={{ width: "100%", height: 250, objectFit: "cover" }}
                      src={`http://localhost:4000/api/${showViewFile?.items?.image_content}`}
                    />
                  ) : (
                    // <p>{`http://localhost:4000/api/${showViewFile?.items?.fileUrl}`}</p>
                    <a
                      href={`http://localhost:4000/api/${showViewFile?.items?.fileUrl}`}
                      download
                      style={{ color: "blue" }}
                    >
                      Download file
                    </a>
                  )}
                </div>
              </div>
              <div
                style={{
                  paddingTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  onClick={() =>
                    setShowViewFile((prev) => ({
                      ...prev,
                      status: false,
                      items: {},
                    }))
                  }
                  className="px-4 py-1 rounded cursor-pointer"
                  style={{
                    border: "3px solid #BEB29F",
                    backgroundColor: "#fff",
                  }}
                >
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="flex items-center justify-center"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        >
          <form
            onSubmit={(e) => handleCheckValue(e)}
            className=" rounded-xl px-6 py-8"
            style={{ width: "500px", backgroundColor: "#fff" }}
          >
            <div className="py-6">
              <h2 className="m-0 font-bold" style={{ fontSize: "20px" }}>
                New Chapter
              </h2>
            </div>
            <div
              className="mt-4"
              // method="GET"
              // action={`${classes.subject_id}/chapter/create`}
            >
              <div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500" }}>
                    Chapter Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="px-3 py-2 rounded"
                    required
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    value={dataCreate.title}
                    name="chapterName"
                    style={{ width: "100%", backgroundColor: "#f5f5f5" }}
                  />
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500" }}>
                    Description
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="px-3 py-2 rounded"
                    required
                    value={dataCreate.text_content}
                    onChange={(e) =>
                      setDataCreate((prev) => ({
                        ...prev,
                        text_content: e.target.value,
                      }))
                    }
                    name="desc"
                    style={{ width: "100%", backgroundColor: "#f5f5f5" }}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8 gap-6">
                <span
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1 rounded cursor-pointer"
                  style={{
                    border: "3px solid #BEB29F",
                    backgroundColor: "#fff",
                  }}
                >
                  Close
                </span>
                <button
                  className="px-4 py-1 rounded"
                  style={{
                    backgroundColor: "#E7E0D4",
                    border: "3px solid #E7E0D4",
                    color: "#3F3B35",
                  }}
                >
                  Add chapter
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {showModalCreateQ && (
        <div
          className="flex items-center justify-center"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        >
          <form
            onSubmit={(e) => handleSubmitCreateExam(e)}
            className=" rounded-xl px-6 py-8"
            style={{ width: "500px", backgroundColor: "#fff" }}
          >
            <div className="py-6">
              <h2 className="m-0 font-bold" style={{ fontSize: "20px" }}>
                New Exam
              </h2>
            </div>
            <div
              className="mt-4"
              // method="GET"
              // action={`${classes.subject_id}/chapter/create`}
            >
              <div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500" }}>
                    Exam Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="px-3 py-2 rounded"
                    required
                    onChange={(e) =>
                      setDataCreateExam((prev) => ({
                        ...prev,
                        exam_name: e.target.value,
                      }))
                    }
                    value={dataCreateExam.exam_name}
                    name="chapterName"
                    style={{ width: "100%", backgroundColor: "#f5f5f5" }}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8 gap-6">
                <span
                  onClick={() => setShowModalCreateQ(false)}
                  className="px-4 py-1 rounded cursor-pointer"
                  style={{
                    border: "3px solid #BEB29F",
                    backgroundColor: "#fff",
                  }}
                >
                  Close
                </span>
                <button
                  className="px-4 py-1 rounded"
                  style={{
                    backgroundColor: "#E7E0D4",
                    border: "3px solid #E7E0D4",
                    color: "#3F3B35",
                  }}
                >
                  Add Exam
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
              {classes.subject_name} - {classes.subject_id}
            </h2>
          </div>
          <div className="flex gap-6  ">
            {!showQuestion && (
              <div className="flex">
                <span
                  onClick={() => {
                    setShowModalCreateQ(true);
                    setTypeUpdateQ(false);
                  }}
                  className="px-3 py-2 mb-4 flex text-white cursor-pointer"
                  style={{
                    backgroundColor: " #388E3C",
                    marginBottom: "12px",
                    borderRadius: "4px",
                  }}
                >
                  New Exam
                </span>
              </div>
            )}
            {!showUploadFile ? (
              <div className="flex">
                <span
                  onClick={() => setShowModal(true)}
                  className="px-3 py-2 mb-4 flex text-white cursor-pointer"
                  style={{
                    backgroundColor: " #388E3C",
                    marginBottom: "12px",
                    borderRadius: "4px",
                  }}
                >
                  New Chapter
                </span>
              </div>
            ) : (
              <div className="flex">
                <span
                  onClick={() => setShowUploadFile(false)}
                  className="px-3 py-2 mb-4 flex text-white cursor-pointer"
                  style={{
                    backgroundColor: " #388E3C",
                    marginBottom: "12px",
                    borderRadius: "4px",
                  }}
                >
                  Back
                </span>
              </div>
            )}
          </div>
        </div>

        {showQuestion ? (
          <>
            {typeUpdateQ ? (
              <UpdateQuestion
                showQuestion={showQuestion}
                setShowQuestion={setShowQuestion}
                handleGetAllExam={handleGetAllExam}
              />
            ) : (
              <>
                <CreateQuestion
                  showQuestion={showQuestion}
                  setShowQuestion={setShowQuestion}
                  handleGetAllExam={handleGetAllExam}
                />
              </>
            )}
          </>
        ) : (
          <>
            {showUploadFile ? (
              <form onSubmit={(e) => handleCreateChapter(e)}>
                <div
                  className="px-6 py-6 rounded-xl"
                  style={{ backgroundColor: "#efefef", width: "100%" }}
                >
                  <div
                    className="py-6 px-8"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div className="py-4">
                      <span style={{ fontSize: "22px", fontWeight: "500" }}>
                        {dataCreate.title}
                      </span>
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        paddingBottom: 0,
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "40px",
                        }}
                      >
                        <label
                          htmlFor="fileCtrl"
                          className="flex items-center gap-8 cursor-pointer"
                        >
                          <i
                            className=" rounded-full"
                            style={{
                              width: 60,
                              height: 46,
                              border: "2px solid #ccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <IoCloudUploadOutline size={30} className="" />
                          </i>
                          <div className="flex flex-col">
                            <span
                              className="flex"
                              style={{ fontSize: "18px", marginBottom: "2px" }}
                            >
                              Upload Files
                            </span>
                            <span
                              className="flex"
                              style={{ fontSize: "14px", color: "#999" }}
                            >
                              Select and upload File
                            </span>
                          </div>
                        </label>
                        <input
                          id="fileCtrl"
                          onChange={(e) => handleUpdateImage(e)}
                          hidden
                          type="file"
                        />
                        <div>
                          {dataImage && (
                            <>
                              {handleCheckFile(dataImage) ? (
                                <img
                                  style={{
                                    width: "160px",
                                    height: "90px",
                                    objectFit: "cover",
                                  }}
                                  src={previewUrl}
                                />
                              ) : (
                                <span>{previewUrl}</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="py-5 "
                      style={{
                        width: "70%",
                        borderWidth: "2px 0",
                        padding: "28px 0",
                      }}
                    >
                      <span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </span>
                    </div> */}
                    <div className="py-4 mt-8 flex">
                      <button
                        className="px-3 py-2 rounded"
                        style={{ backgroundColor: "#BEB29F" }}
                      >
                        Add Chapter
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div
                className="px-6 py-2 rounded-xl"
                style={{ backgroundColor: "#efefef" }}
              >
                <div style={{ display: "flex", gap: 20 }}>
                  <div>
                    <Link
                      to={""}
                      style={{
                        padding: "4px 12px",
                        display: "flex",
                        borderBottom: "1px solid #B9977B",
                      }}
                    >
                      Course
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/dashboard/classes/details/${classes.subject_id}/grades`}
                      style={{
                        padding: "4px 12px",
                        display: "flex",
                      }}
                    >
                      Grades
                    </Link>
                  </div>
                </div>
                <div>
                  {dataShow === 1 ? (
                    <div>
                      <div
                        style={{
                          paddingTop: 20,
                          borderBottom: "1px solid #ccc",
                          paddingBottom: 12,
                          display: "flex",
                          gap: 40,
                        }}
                      >
                        <span
                          onClick={() => setDataShow(1)}
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${dataShow === 1 ? "#333" : "#ccc"}`,
                          }}
                        >
                          Exam
                        </span>
                        <span
                          onClick={() => setDataShow(2)}
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${dataShow === 2 ? "#333" : "#ccc"}`,
                          }}
                        >
                          Chapter
                        </span>
                      </div>

                      <div style={{ paddingTop: 20 }}>
                        {listExam.map((item, index) => (
                          <div
                            className="rounded-xl overflow-hidden"
                            style={{ margin: "24px 0" }}
                            key={index}
                          >
                            <div className="shadow-sm flex">
                              <div
                                className="px-4 py-4 flex flex-col justify-between"
                                style={{
                                  width: "200px",
                                  backgroundColor: "#ccc",
                                }}
                              >
                                <div className="flex flex-col">
                                  <span
                                    style={{ color: "#999", fontSize: 14 }}
                                  ></span>
                                  <span
                                    className=" font-bold"
                                    style={{ fontSize: 16 }}
                                  >
                                    Mã bài: {item.exam_id}
                                  </span>
                                </div>
                              </div>
                              <div
                                className="px-4 py-4"
                                style={{ flex: 1, backgroundColor: "#fff" }}
                              >
                                <div>
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {item.exam_name}
                                  </span>
                                </div>

                                <div className="flex justify-end">
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="flex px-6 py-2 rounded-3xl"
                                      onClick={() =>
                                        handleDeleteExam(item.exam_id)
                                      }
                                      style={{
                                        backgroundColor: "#DC364C",
                                        color: "#fff",
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleUpdateQuestion(item.exam_id);
                                        setTypeUpdateQ(true);
                                      }}
                                      className="flex px-6 py-2 rounded-3xl"
                                      style={{
                                        backgroundColor: "#388E3C",
                                        color: "#fff",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ paddingTop: 20, display: "flex", gap: 40 }}>
                        <span
                          onClick={() => setDataShow(1)}
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${dataShow === 1 ? "#333" : "#ccc"}`,
                          }}
                        >
                          Exam
                        </span>
                        <span
                          onClick={() => setDataShow(2)}
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${dataShow === 2 ? "#333" : "#ccc"}`,
                          }}
                        >
                          Chapter
                        </span>
                      </div>
                      {listChapter?.map((item, index) => (
                        <div
                          className="rounded-xl overflow-hidden"
                          style={{ margin: "24px 0" }}
                          key={index}
                        >
                          <div className="shadow-sm flex">
                            <div
                              className="px-4 py-4 flex flex-col justify-between"
                              style={{
                                width: "200px",
                                backgroundColor: "#ccc",
                              }}
                            >
                              <div className="flex flex-col">
                                <span style={{ color: "#999", fontSize: 14 }}>
                                  Chapter {++index}
                                </span>
                                <span
                                  className=" font-bold"
                                  style={{ fontSize: 18 }}
                                >
                                  {item.title}
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    color: "#999",
                                    fontSize: 14,
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  Something here
                                </span>
                              </div>
                            </div>
                            <div
                              className="px-4 py-4"
                              style={{ flex: 1, backgroundColor: "#fff" }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {item.title}
                                </span>
                              </div>
                              <div className="py-4">
                                <span>{item.text_content}</span>
                              </div>
                              <div className="flex justify-end">
                                <div className="flex items-center gap-6">
                                  <button
                                    onClick={() =>
                                      handleDeleteChapter(item.chapter_id)
                                    }
                                    className="flex px-6 py-2 rounded-3xl"
                                    style={{
                                      backgroundColor: "#DC364C",
                                      color: "#fff",
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() => handleShowViewChapter(item)}
                                    className="flex px-6 py-2 rounded-3xl"
                                    style={{
                                      backgroundColor: "#000",
                                      color: "#fff",
                                    }}
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ClassesDetails;
