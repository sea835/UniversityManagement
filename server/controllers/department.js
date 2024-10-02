const database = require('../database/database');

exports.getDepartments = (req, res, next) => {
    database.query('SELECT * FROM department')
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

// "department_id": "K01",
// "department_name": "Công nghệ thông tin"

exports.getDepartmentById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM department WHERE department_id = ?', [id])
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

exports.createDepartment = (req, res, next) => {
    const { department_id, department_name } = req.body;
    database
        .query('INSERT INTO department (department_id, department_name) VALUES (?, ?)', [department_id, department_name])
        .then(data => {
            res.status(201).json({
                message: 'Department created successfully',
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

exports.updateDepartment = (req, res, next) => {
    const id = req.params.id;
    const { department_name } = req.body;
    database
        .query('UPDATE department SET department_name = ? WHERE department_id = ?', [department_name, id])
        .then(data => {
            res.status(200).json({
                message: 'Department updated successfully',
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

exports.deleteDepartment = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM department WHERE department_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Department deleted successfully',
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