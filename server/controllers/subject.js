const database = require('../database/database');
const { get } = require('../routers/routes');

exports.getSubjects = (req, res, next) => {
    database.query('SELECT * FROM subject')
        .then(data => {
            res.status(200).json(data[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        });
}

exports.getSubjectById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM subject WHERE subject_id = ?', [id])
        .then(data => {
            res.status(200).json(data[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        });
}

exports.createSubject = (req, res, next) => {
    const { subject_id, subject_name, credits, prerequisites, learning_outcomes, department_id } = req.body;
    database
        .query('INSERT INTO subject (subject_id, subject_name, credits, prerequisites, learning_outcomes, department_id) VALUES (?, ?, ?, ?, ?, ?)', [subject_id, subject_name, credits, prerequisites, learning_outcomes, department_id])
        .then(data => {
            res.status(201).json({
                message: 'Subject created successfully',
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
}

exports.updateSubject = (req, res, next) => {
    const id = req.params.id;
    const { subject_name, credits, prerequisites, learning_outcomes, department_id } = req.body;
    database
        .query('UPDATE subject SET subject_name = ?, credits = ?, prerequisites = ?, learning_outcomes = ?, department_id = ? WHERE subject_id = ?', [subject_name, credits, prerequisites, learning_outcomes, department_id, id])
        .then(data => {
            res.status(200).json({
                message: 'Subject updated successfully',
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
}

exports.deleteSubject = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM subject WHERE subject_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Subject deleted successfully',
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
}

exports.getSubjectByEnrollments = (req, res, next) => {
    const studentId = req.params.id;
    database.query(`
        select 
c.class_id,
c.semester_id,
c.subject_id,
c.lecturer_id,
l.full_name,
subject_name
from student s
join participation p on p.student_id = s.student_id
join class c on c.class_id = p.class_id
join subject sub on sub.subject_id = c.subject_id
join lecturer l on c.lecturer_id = l.lecturer_id
where s.student_id=?
`, [studentId])
        .then(data => {
            res.status(200).json(data[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `An error occurred: ${err}`
            });
        });
}

exports.getSubjectByDepartmentId = (req, res, next) => {
    const departmentId = req.params.id;
    database.query(`
        select
*
from subject
where department_id = ?
`, [departmentId])
        .then(data => {
            res.status(200).json(data[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `An error occurred: ${err}`
            });
        });
}