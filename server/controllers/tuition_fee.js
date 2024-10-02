const database = require('../database/database');

exports.getTuitionFees = (req, res, next) => {
    database.query('SELECT * FROM tuition_fee')
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

exports.getTuitionFeeById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM tuition_fee WHERE fee_id = ?', [id])
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

exports.createTuitionFee = (req, res, next) => {
    const { fee_id, status, amount, student_id } = req.body;
    database
        .query('INSERT INTO tuition_fee (fee_id, status, amount, student_id) VALUES (?, ?, ?, ?)', [fee_id, status, amount, student_id])
        .then(data => {
            res.status(201).json({
                message: 'Tuition fee created successfully',
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

exports.updateTuitionFee = (req, res, next) => {
    const id = req.params.id;
    const { status, amount, student_id } = req.body;
    database
        .query('UPDATE tuition_fee SET status = ?, amount = ?, student_id = ? WHERE fee_id = ?', [status, amount, student_id, id])
        .then(data => {
            res.status(200).json({
                message: 'Tuition fee updated successfully',
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

exports.deleteTuitionFee = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM tuition_fee WHERE fee_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Tuition fee deleted successfully',
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