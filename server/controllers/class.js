const database = require("../database/database");

exports.getClassForLecturer = (req, res, next) => {
  console.log("req.params.id: ", req.params.id);

  database
    .query(
      `SELECT class.*, subject.subject_name, subject.credits
          FROM class
          JOIN subject ON class.subject_id = subject.subject_id
          WHERE class.lecturer_id = '${req.params.id}'`
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

exports.getClassForStudent = (req, res, next) => {
  database
    .query(
      `SELECT *
          FROM register
          JOIN class ON register.subject_id = class.subject_id
          WHERE register.student_id = '${req.params.id}';
          `
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

exports.getClassDetails = (req, res, next) => {
  const query1 = `
      SELECT register.*, student.*
      FROM register
      JOIN student ON register.student_id = student.student_id
      WHERE register.subject_id = '${req.params.id}'
    `;

  const query2 = `
      SELECT subject.*
      FROM subject
      WHERE subject.subject_id = '${req.params.id}'
    `;

  Promise.all([database.query(query1), database.query(query2)])
    .then(([data1, data2]) => {
      res.status(200).json({
        dataUser: data1[0], // Kết quả từ truy vấn đầu tiên
        subjectDetails: data2[0], // Kết quả từ truy vấn thứ hai
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.getClasses = (req, res, next) => {
  database
    .query("SELECT * FROM class")
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

exports.getClassById = (req, res, next) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM class WHERE class_id = ?", [id])
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

exports.createClass = (req, res, next) => {
  const { class_id, start_date, end_date, schedule, subject_id, lecturer_id } =
    req.body;
  database
    .query(
      "INSERT INTO class (class_id, start_date, end_date, schedule, subject_id, lecturer_id) VALUES (?, ?, ?, ?, ?, ?)",
      [class_id, start_date, end_date, schedule, subject_id, lecturer_id]
    )
    .then((data) => {
      res.status(201).json({
        message: "Class created successfully",
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

exports.updateClass = (req, res, next) => {
  const id = req.params.id;
  const { start_date, end_date, schedule, subject_id, lecturer_id } = req.body;
  database
    .query(
      "UPDATE class SET start_date = ?, end_date = ?, schedule = ?, subject_id = ?, lecturer_id = ? WHERE class_id = ?",
      [start_date, end_date, schedule, subject_id, lecturer_id, id]
    )
    .then((data) => {
      res.status(200).json({
        message: "Class updated successfully",
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

exports.deleteClass = (req, res, next) => {
  const id = req.params.id;
  database
    .query("DELETE FROM class WHERE class_id = ?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Class deleted successfully",
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

exports.getSchedulesByStudentId = (req, res, next) => {
  const id = req.params.studentId;
  database
    .query(
      `
select 
c.class_id,
c.semester_id,
subject_name,
period,
day_of_week,
week
from student s
join participation p on p.student_id = s.student_id
join class c on c.class_id = p.class_id
join subject sub on sub.subject_id = c.subject_id
where p.student_id=?

`,
      [id]
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

exports.getClassesByStudentId = (req, res, next) => {
  const id = req.params.studentId;
  database
    .query(
      `
select 
c.class_id,
c.semester_id,
subject_name,
l.full_name,
result
from student s
join participation p on p.student_id = s.student_id
join class c on c.class_id = p.class_id
join subject sub on sub.subject_id = c.subject_id
join lecturer l on c.lecturer_id = l.lecturer_id
where p.student_id=?

`,
      [id]
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
