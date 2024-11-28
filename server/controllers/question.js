const database = require("../database/database");

exports.getQuestions = (req, res, next) => {
  database
    .query("SELECT * FROM question")
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.getQuestionById = (req, res, next) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM question WHERE question_id = ?", [id])
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.getQuestionByExamId = (req, res, next) => {
  const id = req.params.id;

  database
    .query("SELECT * FROM question WHERE exam_id = ?", [id])
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

const handleInsertQuestions = (req, res, questions, exam_id) => {
  // Lặp qua từng câu hỏi trong mảng
  const insertPromises = questions.map((question) => {
    // const question_id = question.id; // ID của câu hỏi
    const question_content = question.answer; // Nội dung câu hỏi
    const questionArr = question.question; // Đáp án đúng
    const qe = question.correctAnswer; // Đáp án đúng
    console.log(questionArr[0]);
    const questionA = questionArr[0].question;
    const questionB = questionArr[1].question;
    const questionC = questionArr[2].question;
    const questionD = questionArr[3].question;

    const question_id = Math.floor(1000 + Math.random() * 9000);
    // Chèn câu hỏi vào DB
    return database
      .query(
        "INSERT INTO question (question_id, exam_id, question_content, answer_a, answer_b, answer_c, answer_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
        [
          question_id,
          exam_id,
          question_content,
          questionA,
          questionB,
          questionC,
          questionD,
          qe,
        ]
      )
      .then((data) => {
        console.log(`Question ${question_id} inserted successfully.`);
        return data;
      })
      .catch((err) => {
        console.error(`Failed to insert question ${question_id}:`, err);
        throw err; // Quăng lỗi để Promise.all bắt lỗi
      });
  });

  // Xử lý tất cả các truy vấn song song
  Promise.all(insertPromises)
    .then(() => {
      console.log("All questions inserted successfully.");
      res.status(201).json({
        message: "Question created successfully",
      });
    })
    .catch((err) => {
      console.error("Error inserting questions:", err);
      res.status(400).json({
        message: "Question created False",
      });
    });
};
exports.createQuestion = (req, res, next) => {
  console.log(req.body);
  const dataBody = req.body;
  if (dataBody && dataBody.length > 0) {
    // database
    //   .query(
    //     "INSERT INTO question (question_id, exam_id, question_content, student_answer, correct_answer) VALUES (?, ?, ?, ?, ?)",
    //     [question_id, exam_id, question_content, student_answer, correct_answer]
    //   )
    //   .then((data) => {
    //     res.status(201).json({
    //       message: "Question created successfully",
    //       data: data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({
    //       message: err,
    //     });
    //   });
    handleInsertQuestions(req, res, dataBody, "BKT001");
  }
};

// exports.createQuestion = (req, res, next) => {
//     const { question_id, exam_id, question_content, student_answer, correct_answer } = req.body;
//     database
//         .query('INSERT INTO question (question_id, exam_id, question_content, student_answer, correct_answer) VALUES (?, ?, ?, ?, ?)', [question_id, exam_id, question_content, student_answer, correct_answer])
//         .then(data => {
//             res.status(201).json({
//                 message: 'Question created successfully',
//                 data: data
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 message: err
//             });
//         });
// }

exports.updateQuestion = (req, res, next) => {
  const id = req.params.id;
  const { exam_id, question_content, student_answer, correct_answer } =
    req.body;
  database
    .query(
      "UPDATE question SET exam_id = ?, question_content = ?, student_answer = ?, correct_answer = ? WHERE question_id = ?",
      [exam_id, question_content, student_answer, correct_answer, id]
    )
    .then((data) => {
      res.status(200).json({
        message: "Question updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};

exports.deleteQuestion = (req, res, next) => {
  const id = req.params.id;
  database
    .query("DELETE FROM question WHERE question_id = ?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Question deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};
