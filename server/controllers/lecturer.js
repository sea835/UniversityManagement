const e = require('express');
const database = require('../database/database');

exports.getLecturers = (req, res, next) => {
    database.query('SELECT * FROM lecturer')
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

exports.getLecturerById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM lecturer WHERE lecturer_id = ?', [id])
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

// "lecturer_id": "GV001",
// "username": "nguyenvanA",
// "password": "password1",
// "email": "nva@gmail.com",
// "address": "Hà Nội",
// "full_name": "Nguyễn Văn A",
// "phone_number": "0988000001",
// "image": "nva.jpg",
// "specialization": "Kỹ thuật phần mềm",
// "department_id": "K01"

exports.createLecturer = (req, res, next) => {
    const { lecturer_id, username, password, email, address, full_name, phone_number, image, specialization, department_id } = req.body;
    database
        .query('INSERT INTO lecturer (lecturer_id, username, password, email, address, full_name, phone_number, image, specialization, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [lecturer_id, username, password, email, address, full_name, phone_number, image, specialization, department_id])
        .then(data => {
            res.status(201).json({
                message: 'Lecturer created successfully',
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

exports.updateLecturer = (req, res, next) => {
    const id = req.params.id;
    const { lecturer_id, username, password, email, address, full_name, phone_number, image, specialization, department_id } = req.body;
    database
        .query('UPDATE lecturer SET lecturer_id = ?, username = ?, password = ?, email = ?, address = ?, full_name = ?, phone_number = ?, image = ?, specialization = ?, department_id = ? WHERE lecturer_id = ?', [lecturer_id, username, password, email, address, full_name, phone_number, image, specialization, department_id, id])
        .then(data => {
            res.status(200).json({
                message: 'Lecturer updated successfully',
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

exports.deleteLecturer = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM lecturer WHERE lecturer_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Lecturer deleted successfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
}