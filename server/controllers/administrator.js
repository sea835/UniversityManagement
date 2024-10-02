const database = require('../database/database');

exports.getAdministrators = (req, res, next) => {
    database.query('SELECT * FROM administrator')
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

exports.getAdministratorById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM administrator WHERE administrator_id = ?', [id])
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
// "username": "qt001",
// "password": "password1",
// "email": "qt001@gmail.com",
// "address": "Hà Nội",
// "full_name": "Nguyễn Văn A",
// "phone_number": "0982000001",
// "image": "qt001.jpg"

exports.createAdministrator = (req, res, next) => {
    const { admin_id, username, password, email, address, full_name, phone_number, image } = req.body;
    database
        .query('INSERT INTO administrator (admin_id, username, password, email, address, full_name, phone_number, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [admin_id, username, password, email, address, full_name, phone_number, image])
        .then(data => {
            res.status(201).json({
                message: 'Administrator created successfully',
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

exports.updateAdministrator = (req, res, next) => {
    const id = req.params.id;
    const { username, password, email, address, full_name, phone_number, image } = req.body;
    database
        .query('UPDATE administrator SET username = ?, password = ?, email = ?, address = ?, full_name = ?, phone_number = ?, image = ? WHERE admin_id = ?', [username, password, email, address, full_name, phone_number, image, id])
        .then(data => {
            res.status(200).json({
                message: 'Administrator updated successfully',
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

exports.deleteAdministrator = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM administrator WHERE admin_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Administrator deleted successfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
}