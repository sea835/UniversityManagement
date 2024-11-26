import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../../services/apiservice";
import { IoCloudUploadOutline } from "react-icons/io5";

// {
//   id: 1,
//   title: "What is the capital of France?",
//   answer: "A",
//   question: [
//     {
//       id: "A",
//       question: "long established",
//     },
//     {
//       id: "B",
//       question: "fact that a reader",
//     },
//     {
//       id: "C",
//       question: "be distracted by",
//     },
//     {
//       id: "D",
//       question: "publishing packages and web",
//     },
//   ],
// },

const ClassesDetails = () => {
  const { id } = useParams();

  const [listChapter, setListChapter] = useState([]);
  const [classes, setClasses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [dataImage, setDataImage] = useState();
  const [dataCreate, setDataCreate] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [listQuestion, setListQuestion] = useState([
    {
      id: 1,
      title: "",
      answer: "",
      correctAnswer: "A",
      question: [
        {
          id: "A",
          question: "",
        },
        {
          id: "B",
          question: "",
        },
        {
          id: "C",
          question: "",
        },
        {
          id: "D",
          question: "",
        },
      ],
    },
  ]);

  const handleUpdateAnswer = (newAnswer, id) => {
    setListQuestion((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, answer: newAnswer } : item
      )
    );
  };

  const handleUpdateCorrectAnswer = (e, newAnswer, id) => {
    // console.log(e.target.checked);
    setListQuestion((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, correctAnswer: newAnswer } : item
      )
    );
  };

  const handleUpdateQuestion = (updatedQuestion, id, idQuestion) => {
    setListQuestion((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              question: item.question.map((q) =>
                q.id === idQuestion ? { ...q, question: updatedQuestion } : q
              ),
            }
          : item
      )
    );
  };

  const handleResetQuestion = (id) => {
    setListQuestion((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              id: item.id,
              title: "",
              answer: "",
              correctAnswer: "A",
              question: [
                { id: "A", question: "" },
                { id: "B", question: "" },
                { id: "C", question: "" },
                { id: "D", question: "" },
              ],
            }
          : item
      )
    );
  };

  useEffect(() => {
    console.log("listQuestion: ", listQuestion);
  }, [listQuestion]);

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
    console.log(e.target.files[0]);
    setDataImage(e.target.files[0]);
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

  const handleAddQuestion = () => {
    setListQuestion((prevList) => {
      // Lấy id lớn nhất hiện tại (hoặc đặt id = 1 nếu mảng trống)
      const newId =
        prevList.length > 0 ? prevList[prevList.length - 1].id + 1 : 1;

      // Tạo đối tượng câu hỏi mới
      const newQuestion = {
        id: newId,
        title: "",
        answer: "",
        correctAnswer: "A",
        question: [
          {
            id: "A",
            question: "",
          },
          {
            id: "B",
            question: "",
          },
          {
            id: "C",
            question: "",
          },
          {
            id: "D",
            question: "",
          },
        ],
      };

      // Thêm đối tượng mới vào mảng và trả về mảng mới
      return [...prevList, newQuestion];
    });
    setCurrentQuestion(listQuestion.length + 1);
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    console.log("listQuestion: ", listQuestion);
    try {
      const response = await apiService.post(`/questions`, listQuestion);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentQuestion);
  }, [currentQuestion]);

  useEffect(() => {
    handleGetListChapter(id);
  }, []);
  return (
    <>
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
                  onClick={() => setShowQuestion(true)}
                  className="px-3 py-2 mb-4 flex text-white cursor-pointer"
                  style={{
                    backgroundColor: " #388E3C",
                    marginBottom: "12px",
                    borderRadius: "4px",
                  }}
                >
                  New Question
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
                  Trở lại
                </span>
              </div>
            )}
          </div>
        </div>
        {showQuestion ? (
          <form
            onSubmit={(e) => handleCreateQuestion(e)}
            className="px-6 py-2 rounded-xl"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div
              className=""
              style={{ paddingTop: "20px", paddingBottom: "12px" }}
            >
              <h2 className="" style={{ fontSize: "20px", fontWeight: "500" }}>
                Quiz 1
              </h2>
            </div>
            <div
              className="flex items-center justify-end"
              style={{ marginBottom: "16px" }}
            >
              <select
                className=" rounded"
                style={{ backgroundColor: "#ccc", padding: "8px 12px" }}
                onChange={(e) => setCurrentQuestion(e.target.value)}
              >
                {listQuestion?.map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={item.id === currentQuestion}
                  >
                    Question {item.id}
                  </option>
                ))}
              </select>
            </div>
            {listQuestion?.map((item) => (
              <>
                {item.id == currentQuestion && (
                  <div
                    className=" rounded-xl px-10 py-10"
                    style={{ backgroundColor: "#E7E0D4" }}
                  >
                    <div
                      className="flex items-center justify-center gap-6"
                      style={{ paddingBottom: "12px" }}
                    >
                      <label
                        className=""
                        style={{ fontSize: "18px", fontWeight: "500" }}
                      >
                        Question {item.id}:
                      </label>
                      <input
                        type="text"
                        value={item.answer}
                        name="answerTitle"
                        required
                        className="py-2 px-4 rounded-xl"
                        style={{ flex: 1 }}
                        onChange={(e) =>
                          handleUpdateAnswer(e.target.value, item.id)
                        }
                        placeholder="CLICK TO THE START TYPING YOUR QUESTION"
                      />
                    </div>
                    <div className="pt-8" style={{ paddingTop: 32 }}>
                      <div
                        className="flex items-center flex-wrap"
                        // style={{ gap: 40 }}
                      >
                        {item.question.map((itemQ, key) => (
                          <div
                            className={`flex-1 px-6 relative ${
                              key >= 2 && "mt-6"
                            }`}
                            style={{ width: "50%" }}
                            key={key}
                          >
                            <input
                              className="w-full px-3 py-2 rounded-xl"
                              style={{
                                width: "100%",
                                backgroundColor: "transparent",
                                border: "2px solid #BEB29F",
                              }}
                              placeholder={`Option ${itemQ.id}`}
                              value={itemQ.question}
                              required
                              name="question"
                              onChange={(e) =>
                                handleUpdateQuestion(
                                  e.target.value,
                                  item.id,
                                  itemQ.id
                                )
                              }
                            />
                            <input
                              type="checkbox"
                              className=" absolute"
                              style={{
                                top: "50%",
                                right: "50px",
                                transform: "translateY(-50%)",
                              }}
                              checked={item.correctAnswer === itemQ.id}
                              onChange={(e) =>
                                handleUpdateCorrectAnswer(e, itemQ.id, item.id)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}

            <div
              className="flex items-center justify-end gap-5 mt-8"
              style={{ marginBottom: 16 }}
            >
              <div>
                <span
                  className="px-4 py-2 rounded-lg flex cursor-pointer"
                  style={{ fontWeight: "500" }}
                  onClick={() => handleResetQuestion(currentQuestion)}
                >
                  Clear answer
                </span>
              </div>
              <div>
                <span
                  className="px-4 py-2 rounded-lg flex cursor-pointer"
                  style={{
                    fontWeight: "500",
                    backgroundColor: "#BEB29F",
                    color: "#fff",
                  }}
                  onClick={handleAddQuestion}
                >
                  Next question
                </span>
              </div>
              <div>
                <button
                  className="px-4 py-2 rounded-lg"
                  style={{
                    fontWeight: "500",
                    backgroundColor: "#BEB29F",
                    color: "#fff",
                  }}
                >
                  Create
                </button>
              </div>
              <div></div>
            </div>
          </form>
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
                        Chapter I
                      </span>
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        paddingBottom: "40px",
                        display: "flex",
                      }}
                    >
                      <div>
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
                      </div>
                    </div>
                    <div
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
                    </div>
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
                {listChapter?.map((item, index) => (
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ margin: "24px 0" }}
                    key={index}
                  >
                    <div className="shadow-sm flex">
                      <div
                        className="px-4 py-4 flex flex-col justify-between"
                        style={{ width: "200px", backgroundColor: "#ccc" }}
                      >
                        <div className="flex flex-col">
                          <span style={{ color: "#999", fontSize: 14 }}>
                            Chapter {++index}
                          </span>
                          <span className=" font-bold" style={{ fontSize: 18 }}>
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
                          <span style={{ fontSize: "18px", fontWeight: "500" }}>
                            {item.title}
                          </span>
                        </div>
                        <div className="py-4">
                          <span>{item.text_content}</span>
                        </div>
                        <div className="flex justify-end">
                          <Link
                            className="flex px-6 py-2 rounded-3xl"
                            style={{ backgroundColor: "#000", color: "#fff" }}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ClassesDetails;
