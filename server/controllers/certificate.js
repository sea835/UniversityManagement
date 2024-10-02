const database = require('../database/database');

exports.getCertificates = (req, res, next) => {
    database.query('SELECT * FROM certificate')
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

exports.getCertificateById = (req, res, next) => {
    const id = req.params.id;
    database.query('SELECT * FROM certificate WHERE certificate_id = ?', [id])
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

exports.createCertificate = (req, res, next) => {
    const { certificate_id, lecturer_id } = req.body;
    database
        .query('INSERT INTO certificate (certificate_id, lecturer_id) VALUES (?, ?)', [certificate_id, lecturer_id])
        .then(data => {
            res.status(201).json({
                message: 'Certificate created successfully',
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

exports.updateCertificate = (req, res, next) => {
    const id = req.params.id;
    const { lecturer_id } = req.body;
    database
        .query('UPDATE certificate SET lecturer_id = ? WHERE certificate_id = ?', [lecturer_id, id])
        .then(data => {
            res.status(200).json({
                message: 'Certificate updated successfully',
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

exports.deleteCertificate = (req, res, next) => {
    const id = req.params.id;
    database
        .query('DELETE FROM certificate WHERE certificate_id = ?', [id])
        .then(data => {
            res.status(200).json({
                message: 'Certificate deleted successfully',
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