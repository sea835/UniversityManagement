const database = require('../database/database');

exports.getStudents = (req, res, next) => {
    database.query('SELECT * FROM student')
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

exports.getStudentById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM student WHERE student_id = ?', [id])
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

exports.createStudent = (req, res, next) => {
    const { student_id, username, password, email, full_name, phone_number, image, address, department_id } = req.body;
    database
        .query('INSERT INTO Student (Student_ID, username, Password, Email, Full_Name, Phone_Number, Image, Address, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [student_id, username, password, email, full_name, phone_number, image, address, department_id])
        .then(data => {
            res.status(201).json({
                message: 'Student created successfully',
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

exports.updateStudent = (req, res, next) => {
    const id = req.params.id;
    const { student_id, username, password, email, full_name, phone_number, image, address } = req.body;
    database
        .query('UPDATE student SET student_id = ?, username = ?, password = ?, email = ?, full_name = ?, phone_number = ?, image = ?, address = ? WHERE student_id = ?', [student_id, username, password, email, full_name, phone_number, image, address, id])
        .then(data => {
            res.status(200).json({
                message: 'Student updated successfully',
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        });
}

exports.deleteStudent = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM student WHERE student_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Student deleted successfully',
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        });
}