const database = require('../database/database');

exports.getActionHistories = (req, res, next) => {
    database.query('SELECT * FROM action_history')
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

// "admin_id": "QT001",
// "action_id": "TT001",
// "action_time": "2023-01-01T01:00:00.000Z",
// "action_description": "Thao tác 1"

exports.getActionHistoryById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM action_history WHERE action_id = ?', [id])
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

exports.createActionHistory = (req, res, next) => {
    const { admin_id, action_id, action_time, action_description } = req.body;
    database
        .query('INSERT INTO action_history (admin_id, action_id, action_time, action_description) VALUES (?, ?, ?, ?)', [admin_id, action_id, action_time, action_description])
        .then(data => {
            res.status(201).json({
                message: 'Action history created successfully',
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

exports.updateActionHistory = (req, res, next) => {
    const id = req.params.id;
    const { admin_id, action_time, action_description } = req.body;
    database
        .query('UPDATE action_history SET admin_id = ?, action_time = ?, action_description = ? WHERE action_id = ?', [admin_id, action_time, action_description, id])
        .then(data => {
            res.status(200).json({
                message: 'Action history updated successfully',
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

exports.deleteActionHistory = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM action_history WHERE action_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Action history deleted successfully',
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