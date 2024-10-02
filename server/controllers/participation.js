const database = require('../database/database');

exports.getParticipations = (req, res, next) => {
    database.query('SELECT * FROM participation')
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

exports.getParticipationById = (req, res, next) => {
    const { class_id, student_id } = req.params;
    database.query('SELECT * FROM participation WHERE class_id = ? AND student_id = ?', [class_id, student_id])
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

exports.createParticipation = (req, res, next) => {
    const { class_id, student_id } = req.body;
    database
        .query('INSERT INTO participation (class_id, student_id) VALUES (?, ?)', [class_id, student_id])
        .then(data => {
            res.status(201).json({
                message: 'Participation created successfully',
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

exports.updateParticipation = (req, res, next) => {
    const { class_id, student_id } = req.params;
    const { new_class_id, new_student_id } = req.body;
    database
        .query('UPDATE participation SET class_id = ?, student_id = ? WHERE class_id = ? AND student_id = ?', [new_class_id, new_student_id, class_id, student_id])
        .then(data => {
            res.status(200).json({
                message: 'Participation updated successfully',
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

exports.deleteParticipation = (req, res, next) => {
    const { class_id, student_id } = req.params;
    database
        .query('DELETE FROM participation WHERE class_id = ? AND student_id = ?', [class_id, student_id])
        .then(data => {
            res.status(200).json({
                message: 'Participation deleted successfully',
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