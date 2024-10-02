const database = require('../database/database');

exports.getExams = (req, res, next) => {
    database.query('SELECT * FROM exam')
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

exports.getExamById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM exam WHERE exam_id = ?', [id])
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

exports.createExam = (req, res, next) => {
    const { exam_id, exam_name } = req.body;
    database
        .query('INSERT INTO exam (exam_id, exam_name) VALUES (?, ?)', [exam_id, exam_name])
        .then(data => {
            res.status(201).json({
                message: 'Exam created successfully',
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

exports.updateExam = (req, res, next) => {
    const id = req.params.id;
    const { exam_name } = req.body;
    database
        .query('UPDATE exam SET exam_name = ? WHERE exam_id = ?', [exam_name, id])
        .then(data => {
            res.status(200).json({
                message: 'Exam updated successfully',
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

exports.deleteExam = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM exam WHERE exam_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Exam deleted successfully',
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