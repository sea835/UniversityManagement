const e = require('express');
const database = require('../database/database');

exports.getStudents = (req, res, next) => {
    database.query('SELECT * FROM sinh_vien')
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
    database.query('SELECT * FROM sinh_vien WHERE ma_so = ?', [id])
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
    const { studentId, username, password, email, phone, image, name } = req.body;
    database
        .query('INSERT INTO sinh_vien (ma_so, ho_ten, password, username, email, sdt, hinh_anh) VALUES (?, ?, ?, ?, ?, ?, ?)', [studentId, name, password, username, email, phone, image])
        .then(data => {
            res.status(201).json({
                message: 'Student created successfully',
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

exports.updateStudent = (req, res, next) => {
    const id = req.params.id;
    const { studentId, username, password, email, phone, image, name } = req.body;
    database
        .query('UPDATE sinh_vien SET ma_so = ?, ho_ten = ?, password = ?, username = ?, email = ?, sdt = ?, hinh_anh = ? WHERE ma_so = ?', [studentId, name, password, username, email, phone, image, id])
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
        .query('DELETE FROM sinh_vien WHERE ma_so = ?', [id])
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