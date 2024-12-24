const database = require("../database/database");

exports.getExams = (req, res, next) => {
  database
    .query("SELECT * FROM exam")
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

exports.getExamById = (req, res, next) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM exam WHERE exam_id = ?", [id])
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

exports.getExamBySubjectId = (req, res, next) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM exam WHERE subject_id = ?", [id])
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

// exports.createExam = (req, res, next) => {
//   const {
//     exam_id,
//     exam_name,
//     subject_id,
//     class_id,
//     semester_id,
//     material_id,
//     chapter_id,
//   } = req.body;

//   database
//     .query(
//       "INSERT INTO exam (exam_id, exam_name, subject_id, class_id, semester_id, material_id, chapter_id) VALUES (?, ?, ?, ?, ?, ?, ? )",
//       [
//         exam_id,
//         exam_name,
//         subject_id,
//         class_id,
//         semester_id,
//         material_id,
//         chapter_id,
//       ]
//     )
//     .then(() => {
//       // Sau khi thêm thành công exam, tìm các bản ghi trong register có cùng subject_id
//       return database.query(
//         "SELECT student_id FROM register WHERE subject_id = ?",
//         [subject_id]
//       );
//     })
//     .then((students) => {
//       if (students.length > 0) {
//         // Tạo danh sách các bản ghi cần chèn vào bảng test_performance
//         const testPerformanceData = students[0].map((student) => [
//           student.student_id,
//           exam_id,
//           new Date(), // test_date: Lấy ngày hiện tại, hoặc thay bằng giá trị khác nếu có
//           0, // score ban đầu là 0
//         ]);
//         console.log(students);

//         // Thêm dữ liệu vào bảng test_performance
//         return database.query(
//           "INSERT INTO test_performance (student_id, exam_id, test_date, score) VALUES ?",
//           [testPerformanceData]
//         );
//       } else {
//         return Promise.resolve(); // Không có dữ liệu trong register
//       }
//     })
//     .then(() => {
//       res.status(201).json({
//         message:
//           "Exam created successfully and test performance data inserted.",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "An error occurred.",
//         error: err,
//       });
//     });
// };

exports.createExam = (req, res, next) => {
  const {
    exam_id,
    exam_name,
    subject_id,
    semester_id,
    material_id,
    chapter_id,
  } = req.body;

  // Truy vấn để lấy class_id từ bảng class dựa trên subject_id
  database
    .query("SELECT class_id FROM class WHERE subject_id = ?", [subject_id])
    .then((classes) => {
      if (classes.length === 0) {
        throw new Error("No class found for the provided subject_id.");
      }

      // Lấy class_id đầu tiên (nếu có nhiều kết quả, bạn có thể tùy chỉnh logic)
      const class_id = classes[0][0].class_id;

      // Chèn dữ liệu vào bảng exam
      return database.query(
        "INSERT INTO exam (exam_id, exam_name, subject_id, class_id, semester_id, material_id, chapter_id) VALUES (?, ?, ?, ?, ?, ?, ? )",
        [
          exam_id,
          exam_name,
          subject_id,
          class_id,
          semester_id,
          material_id,
          chapter_id,
        ]
      );
    })
    .then(() => {
      // Sau khi thêm thành công exam, tìm các bản ghi trong register có cùng subject_id
      return database.query(
        "SELECT student_id FROM register WHERE subject_id = ?",
        [subject_id]
      );
    })

    .then((students) => {
      if (students[0].length > 0) {
        // Tạo danh sách các bản ghi cần chèn vào bảng test_performance
        const testPerformanceData = students[0].map((student) => [
          student.student_id,
          exam_id,
          new Date(), // test_date: Lấy ngày hiện tại, hoặc thay bằng giá trị khác nếu có
          0, // score ban đầu là 0
        ]);

        // Thêm dữ liệu vào bảng test_performance
        return database.query(
          "INSERT INTO test_performance (student_id, exam_id, test_date, score) VALUES ?",
          [testPerformanceData]
        );
      } else {
        return Promise.resolve(); // Không có dữ liệu trong register
      }
    })
    .then(() => {
      res.status(201).json({
        message:
          "Exam created successfully and test performance data inserted.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred.",
        error: err.message || err,
      });
    });
};

exports.updateExam = (req, res, next) => {
  const id = req.params.id;
  const { exam_name } = req.body;
  database
    .query("UPDATE exam SET exam_name = ? WHERE exam_id = ?", [exam_name, id])
    .then((data) => {
      res.status(200).json({
        message: "Exam updated successfully",
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

// exports.deleteExam = (req, res, next) => {
//   const id = req.params.id;
//   database
//     .query("DELETE FROM exam WHERE exam_id = ?", [id])
//     .then((data) => {
//       res.status(200).json({
//         message: "Exam deleted successfully",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: err,
//       });
//     });
// };

exports.deleteExam = (req, res, next) => {
  const id = req.params.id;

  const deleteQuestionsQuery = database.query(
    "DELETE FROM question WHERE exam_id = ?",
    [id]
  );
  const deleteTestQuery = database.query(
    "DELETE FROM test_performance WHERE exam_id = ?",
    [id]
  );
  const deleteExamQuery = database.query("DELETE FROM exam WHERE exam_id = ?", [
    id,
  ]);

  Promise.all([deleteQuestionsQuery, deleteTestQuery, deleteExamQuery])
    .then((results) => {
      res.status(200).json({
        message: "Exam and related questions deleted successfully",
        data: results,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: err.message || "An error occurred",
      });
    });
};
