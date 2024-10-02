const database = require('../database/database');

exports.getClasses = (req, res, next) => {
    database.query('SELECT * FROM class')
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

exports.getClassById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM class WHERE class_id = ?', [id])
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

exports.createClass = (req, res, next) => {
    const { class_id, start_date, end_date, schedule, subject_id, lecturer_id } = req.body;
    database
        .query('INSERT INTO class (class_id, start_date, end_date, schedule, subject_id, lecturer_id) VALUES (?, ?, ?, ?, ?, ?)', [class_id, start_date, end_date, schedule, subject_id, lecturer_id])
        .then(data => {
            res.status(201).json({
                message: 'Class created successfully',
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

exports.updateClass = (req, res, next) => {
    const id = req.params.id;
    const { start_date, end_date, schedule, subject_id, lecturer_id } = req.body;
    database
        .query('UPDATE class SET start_date = ?, end_date = ?, schedule = ?, subject_id = ?, lecturer_id = ? WHERE class_id = ?', [start_date, end_date, schedule, subject_id, lecturer_id, id])
        .then(data => {
            res.status(200).json({
                message: 'Class updated successfully',
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

exports.deleteClass = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM class WHERE class_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Class deleted successfully',
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