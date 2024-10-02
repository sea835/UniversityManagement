const database = require('../database/database');

exports.getMultipleChoiceOptions = (req, res, next) => {
    database.query('SELECT * FROM multiple_choice_option')
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

exports.getMultipleChoiceOptionById = (req, res, next) => {
    const { question_id, exam_id, option_id } = req.params;
    database.query('SELECT * FROM multiple_choice_option WHERE question_id = ? AND exam_id = ? AND option_id = ?', [question_id, exam_id, option_id])
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

exports.createMultipleChoiceOption = (req, res, next) => {
    const { question_id, exam_id, option_id, option_a, option_b, option_c, option_d } = req.body;
    database
        .query('INSERT INTO multiple_choice_option (question_id, exam_id, option_id, option_a, option_b, option_c, option_d) VALUES (?, ?, ?, ?, ?, ?, ?)', [question_id, exam_id, option_id, option_a, option_b, option_c, option_d])
        .then(data => {
            res.status(201).json({
                message: 'Multiple choice option created successfully',
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

exports.updateMultipleChoiceOption = (req, res, next) => {
    const { question_id, exam_id, option_id } = req.params;
    const { option_a, option_b, option_c, option_d } = req.body;
    database
        .query('UPDATE multiple_choice_option SET option_a = ?, option_b = ?, option_c = ?, option_d = ? WHERE question_id = ? AND exam_id = ? AND option_id = ?', [option_a, option_b, option_c, option_d, question_id, exam_id, option_id])
        .then(data => {
            res.status(200).json({
                message: 'Multiple choice option updated successfully',
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

exports.deleteMultipleChoiceOption = (req, res, next) => {
    const { question_id, exam_id, option_id } = req.params;
    database
        .query('DELETE FROM multiple_choice_option WHERE question_id = ? AND exam_id = ? AND option_id = ?', [question_id, exam_id, option_id])
        .then(data => {
            res.status(200).json({
                message: 'Multiple choice option deleted successfully',
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