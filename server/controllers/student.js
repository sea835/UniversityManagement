const database = require("../database/database");

exports.getStudents = (req, res, next) => {
  database
    .query("SELECT * FROM student")
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

exports.getStudentById = (req, res, next) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM student WHERE student_id = ?", [id])
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

exports.getStudentDetails = (req, res, next) => {
  const subjectId = req.params.subjectId;
  const studentId = req.params.studentId;

  const query1 = `
   SELECT tp.*, e.subject_id, e.exam_name
FROM test_performance tp
JOIN exam e ON tp.exam_id = e.exam_id
WHERE tp.student_id = '${studentId}' AND e.subject_id = '${subjectId}'`;

  const query2 = `
    SELECT student.*
    FROM student
    WHERE student.student_id = '${studentId}'
  `;

  const query3 = `
    SELECT subject.*
    FROM subject
    WHERE subject.subject_id = '${subjectId}'
  `;

  Promise.all([
    database.query(query1),
    database.query(query2),
    database.query(query3),
  ])
    .then(([data1, data2, data3]) => {
      res.status(200).json({
        dataCore: data1[0], // Kết quả từ truy vấn đầu tiên
        dataUser: data2[0], // Kết quả từ truy vấn thứ hai
        dataSubject: data3[0], // Kết quả từ truy vấn thứ hai
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.createStudent = (req, res, next) => {
  const {
    student_id,
    username,
    password,
    email,
    full_name,
    phone_number,
    image,
    address,
    department_id,
  } = req.body;
  database
    .query(
      "INSERT INTO Student (Student_ID, username, Password, Email, Full_Name, Phone_Number, Image, Address, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        student_id,
        username,
        password,
        email,
        full_name,
        phone_number,
        image,
        address,
        department_id,
      ]
    )
    .then((data) => {
      res.status(201).json({
        message: "Student created successfully",
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

exports.updateStudent = (req, res, next) => {
  const id = req.params.id;
  const {
    student_id,
    username,
    password,
    email,
    full_name,
    phone_number,
    image,
    address,
  } = req.body;
  database
    .query(
      "UPDATE student SET student_id = ?, username = ?, password = ?, email = ?, full_name = ?, phone_number = ?, image = ?, address = ? WHERE student_id = ?",
      [
        student_id,
        username,
        password,
        email,
        full_name,
        phone_number,
        image,
        address,
        id,
      ]
    )
    .then((data) => {
      res.status(200).json({
        message: "Student updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.deleteStudent = (req, res, next) => {
  const id = req.params.id;
  database
    .query("DELETE FROM student WHERE student_id = ?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Student deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};
