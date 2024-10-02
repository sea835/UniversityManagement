const database = require('../database/database');

exports.getEnrollments = (req, res, next) => {
    database.query('SELECT * FROM enrollment')
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

exports.getEnrollmentById = (req, res, next) => {
    const { subject_id, student_id } = req.params;
    database.query('SELECT * FROM enrollment WHERE subject_id = ? AND student_id = ?', [subject_id, student_id])
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

exports.createEnrollment = (req, res, next) => {
    const { subject_id, student_id, result } = req.body;
    database
        .query('INSERT INTO enrollment (subject_id, student_id, result) VALUES (?, ?, ?)', [subject_id, student_id, result])
        .then(data => {
            res.status(201).json({
                message: 'Enrollment created successfully',
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

exports.updateEnrollment = (req, res, next) => {
    const { subject_id, student_id } = req.params;
    const { result } = req.body;
    database
        .query('UPDATE enrollment SET result = ? WHERE subject_id = ? AND student_id = ?', [result, subject_id, student_id])
        .then(data => {
            res.status(200).json({
                message: 'Enrollment updated successfully',
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

exports.deleteEnrollment = (req, res, next) => {
    const { subject_id, student_id } = req.params;
    database
        .query('DELETE FROM enrollment WHERE subject_id = ? AND student_id = ?', [subject_id, student_id])
        .then(data => {
            res.status(200).json({
                message: 'Enrollment deleted successfully',
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