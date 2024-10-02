const database = require('../database/database');

exports.getSubjects = (req, res, next) => {
    database.query('SELECT * FROM subject')
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

exports.getSubjectById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM subject WHERE subject_id = ?', [id])
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

exports.createSubject = (req, res, next) => {
    const { subject_id, subject_name, credits, prerequisites, learning_outcomes, department_id } = req.body;
    database
        .query('INSERT INTO subject (subject_id, subject_name, credits, prerequisites, learning_outcomes, department_id) VALUES (?, ?, ?, ?, ?, ?)', [subject_id, subject_name, credits, prerequisites, learning_outcomes, department_id])
        .then(data => {
            res.status(201).json({
                message: 'Subject created successfully',
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

exports.updateSubject = (req, res, next) => {
    const id = req.params.id;
    const { subject_name, credits, prerequisites, learning_outcomes, department_id } = req.body;
    database
        .query('UPDATE subject SET subject_name = ?, credits = ?, prerequisites = ?, learning_outcomes = ?, department_id = ? WHERE subject_id = ?', [subject_name, credits, prerequisites, learning_outcomes, department_id, id])
        .then(data => {
            res.status(200).json({
                message: 'Subject updated successfully',
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

exports.deleteSubject = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM subject WHERE subject_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Subject deleted successfully',
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