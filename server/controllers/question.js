const database = require('../database/database');

exports.getQuestions = (req, res, next) => {
    database.query('SELECT * FROM question')
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

exports.getQuestionById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM question WHERE question_id = ?', [id])
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

exports.createQuestion = (req, res, next) => {
    const { question_id, exam_id, question_content, student_answer, correct_answer } = req.body;
    database
        .query('INSERT INTO question (question_id, exam_id, question_content, student_answer, correct_answer) VALUES (?, ?, ?, ?, ?)', [question_id, exam_id, question_content, student_answer, correct_answer])
        .then(data => {
            res.status(201).json({
                message: 'Question created successfully',
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

exports.updateQuestion = (req, res, next) => {
    const id = req.params.id;
    const { exam_id, question_content, student_answer, correct_answer } = req.body;
    database
        .query('UPDATE question SET exam_id = ?, question_content = ?, student_answer = ?, correct_answer = ? WHERE question_id = ?', [exam_id, question_content, student_answer, correct_answer, id])
        .then(data => {
            res.status(200).json({
                message: 'Question updated successfully',
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

exports.deleteQuestion = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM question WHERE question_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Question deleted successfully',
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