const database = require("../database/database");

exports.getTestPerformances = (req, res, next) => {
  database
    .query("SELECT * FROM test_performance")
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

exports.getTestPerformanceById = (req, res, next) => {
  const { student_id, exam_id } = req.params;
  database
    .query(
      "SELECT * FROM test_performance WHERE student_id = ? AND exam_id = ?",
      [student_id, exam_id]
    )
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

exports.createTestPerformance = (req, res, next) => {
  const { student_id, exam_id, score, test_date } = req.body;
  database
    .query(
      "INSERT INTO test_performance (student_id, exam_id, score, test_date) VALUES (?, ?, ?, ?)",
      [student_id, exam_id, score, test_date]
    )
    .then((data) => {
      res.status(201).json({
        message: "Test performance created successfully",
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

exports.updateTestPerformance = (req, res, next) => {
  const { studentId, examId } = req.params;
  const { score } = req.body;
  console.log(studentId, examId);

  database
    .query(
      "UPDATE test_performance SET score = ? WHERE student_id = ? AND exam_id = ?",
      [score, studentId, examId]
    )
    .then((data) => {
      res.status(200).json({
        message: "Test performance updated successfully",
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

exports.deleteTestPerformance = (req, res, next) => {
  const { student_id, exam_id } = req.params;
  database
    .query(
      "DELETE FROM test_performance WHERE student_id = ? AND exam_id = ?",
      [student_id, exam_id]
    )
    .then((data) => {
      res.status(200).json({
        message: "Test performance deleted successfully",
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
