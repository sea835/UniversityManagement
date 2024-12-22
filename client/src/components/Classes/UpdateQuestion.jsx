/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";

const UpdateQuestion = (props) => {
  const { setShowQuestion, showQuestion, handleGetAllExam } = props;
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [numQuiz, setNumQuiz] = useState(1);
  const [typeUpdate, setTypeUpdate] = useState(false);
  const [listQuestionUpdate, setListQuestionUpdate] = useState([]);
  console.log("Update");

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

  //   const handleResetQuestion = (id) => {
  //     setListQuestion((prevList) =>
  //       prevList.map((item) =>
  //         item.id === id
  //           ? {
  //               id: item.id,
  //               title: "",
  //               answer: "",
  //               correctAnswer: "A",
  //               question: [
  //                 { id: "A", question: "" },
  //                 { id: "B", question: "" },
  //                 { id: "C", question: "" },
  //                 { id: "D", question: "" },
  //               ],
  //             }
  //           : item
  //       )
  //     );
  //   };

  const handleAddQuestion = () => {
    // setListQuestion((prevList) => {
    //   // Lấy id lớn nhất hiện tại (hoặc đặt id = 1 nếu mảng trống)
    //   const newId =
    //     prevList.length > 0 ? prevList[prevList.length - 1].id + 1 : 1;
    //   // Tạo đối tượng câu hỏi mới
    //   const newQuestion = {
    //     id: newId,
    //     title: "",
    //     answer: "",
    //     correctAnswer: "A",
    //     question: [
    //       {
    //         id: "A",
    //         question: "",
    //       },
    //       {
    //         id: "B",
    //         question: "",
    //       },
    //       {
    //         id: "C",
    //         question: "",
    //       },
    //       {
    //         id: "D",
    //         question: "",
    //       },
    //     ],
    //   };
    //   // Thêm đối tượng mới vào mảng và trả về mảng mới
    //   return [...prevList, newQuestion];
    // });
    // setCurrentQuestion(listQuestion.length + 1);
    setCurrentQuestion(parseInt(currentQuestion + 1));
    console.log(currentQuestion + 1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let flag = true;
    listQuestion.forEach((item, index) => {
      const duplicates = item.question.reduce((acc, item, index, array) => {
        // Kiểm tra xem question đã tồn tại trong các phần tử trước đó chưa
        const isDuplicate = array
          .slice(0, index)
          .some((el) => el.question === item.question);
        if (isDuplicate && !acc.includes(item.question)) {
          acc.push(item.question); // Lưu lại câu hỏi bị trùng
        }
        return acc;
      }, []);
      if (duplicates.length > 0) {
        alert(`Có đáp án trùng lặp ở câu ${++index}`);
        flag = false;
        return;
      }
    });

    if (flag) {
      try {
        const dataUpdate = listQuestion[currentQuestion - 1];
        await apiService.put(`/questions/${dataUpdate.id}`, {
          listQuestion: dataUpdate,
        });
        alert("Updated Successfully !");
        // if (window.confirm("Successfully created")) {
        //   setCurrentQuestion(1);
        //   setNumQuiz(1);
        //   setListQuestion([
        //     {
        //       id: 1,
        //       title: "",
        //       answer: "",
        //       correctAnswer: "A",
        //       question: [
        //         {
        //           id: "A",
        //           question: "",
        //         },
        //         {
        //           id: "B",
        //           question: "",
        //         },
        //         {
        //           id: "C",
        //           question: "",
        //         },
        //         {
        //           id: "D",
        //           question: "",
        //         },
        //       ],
        //     },
        //   ]);
        //   setShowQuestion(false);
        //   handleGetAllExam();
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChangeNumQuiz = (value) => {
    // if (value > numQuiz) {
    //   setNumQuiz(value);
    // }
  };

  const handleDeleteQuestion = (index) => {
    const newArr = listQuestion.filter((_, i) => i !== index - 1); // Loại bỏ phần tử có chỉ mục `index`
    setCurrentQuestion(currentQuestion - 1);
    setListQuestion(newArr); // Cập nhật state nếu cần
  };

  const handleGetAllQuestion = async (idExam) => {
    try {
      const respone = await apiService.get(`questions/exxam/${idExam}`);
      setListQuestionUpdate(respone.data);
      console.log(respone.data);
    } catch (error) {
      console.log(error);
      alert("False to load question !");
    }
  };

  const handleCreateCurrentQuestion = () => {
    const newListQ = listQuestionUpdate.map((item) => {
      return {
        id: item.question_id,
        title: item.question_content,
        answer: item.question_content,
        correctAnswer: item.correct_answer,
        question: [
          {
            id: "A",
            question: item.answer_a,
          },
          {
            id: "B",
            question: item.answer_b,
          },
          {
            id: "C",
            question: item.answer_c,
          },
          {
            id: "D",
            question: item.answer_d,
          },
        ],
      };
    });
    setListQuestion(newListQ);
    setNumQuiz(newListQ.length);
  };

  useEffect(() => {
    if (listQuestionUpdate.length > 0) {
      handleCreateCurrentQuestion();
    }
  }, [listQuestionUpdate]);

  useEffect(() => {
    console.log("listQuestion: ", listQuestion);
  }, [listQuestion]);

  useEffect(() => {
    handleGetAllQuestion(showQuestion);
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => handleUpdate(e)}
        className="px-6 py-2 rounded-xl"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="" style={{ paddingTop: "20px", paddingBottom: "12px" }}>
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
            onChange={(e) => setCurrentQuestion(parseInt(e.target.value))}
          >
            {listQuestion?.map((item, index) => (
              <option
                key={index}
                value={index + 1}
                selected={index + 1 === currentQuestion}
              >
                Question {index + 1}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={10}
            value={numQuiz}
            placeholder="Số lượng quiz"
            onChange={(e) => handleChangeNumQuiz(e.target.value)}
            style={{
              width: 200,
              backgroundColor: "#ccc",
              padding: "8px 12px",
              borderRadius: 4,
              outline: "none",
              marginLeft: 16,
            }}
          />
        </div>
        {listQuestion?.map((item, index) => (
          <>
            {index + 1 == currentQuestion && (
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
                    Question {index + 1}:
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
                        className={` px-6 relative ${key >= 2 && "mt-6"}`}
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
          {listQuestion.length > 1 && (
            <div>
              <span
                className="px-4 py-2 rounded-lg flex cursor-pointer"
                style={{ fontWeight: "500" }}
                onClick={() => handleDeleteQuestion(currentQuestion)}
              >
                Delete Question
              </span>
            </div>
          )}
          <div>
            <button
              className="px-4 py-2 rounded-lg"
              style={{
                fontWeight: "500",
                backgroundColor: "#BEB29F",
                color: "#fff",
              }}
            >
              Update
            </button>
          </div>
          {currentQuestion < numQuiz && (
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
          )}

          <div></div>
        </div>
      </form>
    </>
  );
};

export default UpdateQuestion;
