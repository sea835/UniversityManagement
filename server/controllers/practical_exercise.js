const database = require('../database/database');

exports.getPracticalExercises = (req, res, next) => {
    database.query('SELECT * FROM practical_exercise')
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

exports.getPracticalExerciseById = (req, res, next) => {
    const { chapter_order, material_id, class_id, practical_exercise_id } = req.params;
    database.query('SELECT * FROM practical_exercise WHERE chapter_order = ? AND material_id = ? AND class_id = ? AND practical_exercise_id = ?', [chapter_order, material_id, class_id, practical_exercise_id])
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

exports.createPracticalExercise = (req, res, next) => {
    const { chapter_order, material_id, class_id, practical_exercise_id, exercise_content } = req.body;
    database
        .query('INSERT INTO practical_exercise (chapter_order, material_id, class_id, practical_exercise_id, exercise_content) VALUES (?, ?, ?, ?, ?)', [chapter_order, material_id, class_id, practical_exercise_id, exercise_content])
        .then(data => {
            res.status(201).json({
                message: 'Practical exercise created successfully',
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

exports.updatePracticalExercise = (req, res, next) => {
    const { chapter_order, material_id, class_id, practical_exercise_id } = req.params;
    const { exercise_content } = req.body;
    database
        .query('UPDATE practical_exercise SET exercise_content = ? WHERE chapter_order = ? AND material_id = ? AND class_id = ? AND practical_exercise_id = ?', [exercise_content, chapter_order, material_id, class_id, practical_exercise_id])
        .then(data => {
            res.status(200).json({
                message: 'Practical exercise updated successfully',
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

exports.deletePracticalExercise = (req, res, next) => {
    const { chapter_order, material_id, class_id, practical_exercise_id } = req.params;
    database
        .query('DELETE FROM practical_exercise WHERE chapter_order = ? AND material_id = ? AND class_id = ? AND practical_exercise_id = ?', [chapter_order, material_id, class_id, practical_exercise_id])
        .then(data => {
            res.status(200).json({
                message: 'Practical exercise deleted successfully',
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