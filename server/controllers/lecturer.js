const express = require('express');
const database = require('../database/database');

// Helper function to format date to 'YYYY-MM-DD'
const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return [year, month, day].join('-');
};

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

exports.createLecturer = (req, res, next) => {
    const { lecturer_id, username, password, email, address, full_name, phone_number, image, gender, date_of_birth, specialization, department_id } = req.body;
    const formattedDate = formatDate(date_of_birth);
    database
        .query('INSERT INTO lecturer (lecturer_id, username, password, email, address, full_name, phone_number, image, gender, date_of_birth, specialization, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [lecturer_id, username, password, email, address, full_name, phone_number, image, gender, formattedDate, specialization, department_id])
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
    const { lecturer_id, username, password, email, address, full_name, phone_number, image, gender, date_of_birth, specialization, department_id } = req.body;
    const formattedDate = formatDate(date_of_birth);
    database
        .query('UPDATE lecturer SET lecturer_id = ?, username = ?, password = ?, email = ?, address = ?, full_name = ?, phone_number = ?, image = ?, gender = ?, date_of_birth = ?, specialization = ?, department_id = ? WHERE lecturer_id = ?', [lecturer_id, username, password, email, address, full_name, phone_number, image, gender, formattedDate, specialization, department_id, id])
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