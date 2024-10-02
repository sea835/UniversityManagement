const database = require('../database/database');

exports.getChapters = (req, res, next) => {
    database.query('SELECT * FROM chapter')
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

exports.getChapterById = (req, res, next) => {
    const { chapter_order, material_id, class_id } = req.params;
    database.query('SELECT * FROM chapter WHERE chapter_order = ? AND material_id = ? AND class_id = ?', [chapter_order, material_id, class_id])
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

exports.createChapter = (req, res, next) => {
    const { chapter_order, material_id, class_id, title, text_content, video_content, image_content } = req.body;
    database
        .query('INSERT INTO chapter (chapter_order, material_id, class_id, title, text_content, video_content, image_content) VALUES (?, ?, ?, ?, ?, ?, ?)', [chapter_order, material_id, class_id, title, text_content, video_content, image_content])
        .then(data => {
            res.status(201).json({
                message: 'Chapter created successfully',
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

exports.updateChapter = (req, res, next) => {
    const { chapter_order, material_id, class_id } = req.params;
    const { title, text_content, video_content, image_content } = req.body;
    database
        .query('UPDATE chapter SET title = ?, text_content = ?, video_content = ?, image_content = ? WHERE chapter_order = ? AND material_id = ? AND class_id = ?', [title, text_content, video_content, image_content, chapter_order, material_id, class_id])
        .then(data => {
            res.status(200).json({
                message: 'Chapter updated successfully',
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

exports.deleteChapter = (req, res, next) => {
    const { chapter_order, material_id, class_id } = req.params;
    database
        .query('DELETE FROM chapter WHERE chapter_order = ? AND material_id = ? AND class_id = ?', [chapter_order, material_id, class_id])
        .then(data => {
            res.status(200).json({
                message: 'Chapter deleted successfully',
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