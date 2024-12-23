const database = require("../database/database");

exports.getChaptersBySubjectId = (req, res, next) => {
  const { subject_id } = req.params;

  // Truy vấn thứ nhất: Dựa trên subject_id từ req.params
  const query1 = database.query(
    `SELECT * FROM chapter WHERE subject_id = '${subject_id}'`
  );
  const query2 = database.query(
    `SELECT * FROM subject WHERE subject_id = '${subject_id}'`
  );

  // Chạy cả hai truy vấn song song
  Promise.all([query1, query2])
    .then(([data1, data2]) => {
      res.status(200).json({
        listChapter: data1[0], // Kết quả truy vấn thứ nhất
        classInfo: data2[0], // Kết quả truy vấn thứ hai
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.getChapters = (req, res, next) => {
  database
    .query("SELECT * FROM chapter")
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.getChapterById = (req, res, next) => {
  const { chapter_order, material_id, class_id } = req.params;
  database
    .query(
      "SELECT * FROM chapter WHERE chapter_order = ? AND material_id = ? AND class_id = ?",
      [chapter_order, material_id, class_id]
    )
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
      });
    });
};

exports.createChapter = (req, res, next) => {
  const data = req.body; // Dữ liệu từ dataSend
  // const imagePath = req.imagePath;

  const { fileType, filePath } = req;

  console.log(fileType, filePath);

  if (fileType === "image") {
    // Xử lý nếu file là hình ảnh
    database
      .query("SELECT class_id FROM class WHERE subject_id = ?", [
        data.subject_id,
      ]) // Truy vấn để tìm class_id
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).json({
            message: "No class found with the given subject_id",
          });
        }
        const class_id = result[0][0].class_id;
        const idChapter = Math.floor(1000 + Math.random() * 9000);
        const urlImgLink = `uploads/${filePath}`;

        // Sau khi có class_id, thực hiện thêm dữ liệu vào bảng chapter
        return database.query(
          "INSERT INTO chapter (chapter_id, material_id, semester_id, class_id, subject_id, title, text_content, video_content, image_content, fileUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            idChapter.toString(),
            data.material_id,
            "HK231",
            class_id,
            data.subject_id,
            data.title,
            data.text_content,
            data.video_content,
            urlImgLink,
            "",
          ]
        );
      })
      .then((insertResult) => {
        // Nếu thêm dữ liệu thành công
        res.status(201).json({
          message: "Chapter created successfully",
          data: insertResult,
        });
      })
      .catch((err) => {
        // Xử lý lỗi
        console.error(err);
        res.status(500).json({
          message: "An error occurred",
          error: err,
        });
      });
    // return res.status(200).json({
    //   message: "Chapter created with image",
    //   filePath: filePath,
    // });
  } else if (fileType === "document") {
    database
      .query("SELECT class_id FROM class WHERE subject_id = ?", [
        data.subject_id,
      ]) // Truy vấn để tìm class_id
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).json({
            message: "No class found with the given subject_id",
          });
        }
        const class_id = result[0][0].class_id;
        const idChapter = Math.floor(1000 + Math.random() * 9000);
        const urlFileLink = `uploads/${filePath}`;

        // Sau khi có class_id, thực hiện thêm dữ liệu vào bảng chapter
        return database.query(
          "INSERT INTO chapter (chapter_id, material_id, semester_id, class_id, subject_id, title, text_content, video_content, image_content, fileUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            idChapter.toString(),
            data.material_id,
            "HK231",
            class_id,
            data.subject_id,
            data.title,
            data.text_content,
            data.video_content,
            "",
            urlFileLink,
          ]
        );
      })
      .then((insertResult) => {
        // Nếu thêm dữ liệu thành công
        res.status(201).json({
          message: "Chapter created successfully",
          data: insertResult,
        });
      })
      .catch((err) => {
        // Xử lý lỗi
        console.error(err);
        res.status(500).json({
          message: "An error occurred",
          error: err,
        });
      });
  } else {
    // Trường hợp không hợp lệ (đã được kiểm tra ở middleware trước)
    return res.status(400).json({ message: "Invalid file type" });
  }
};

exports.updateChapter = (req, res, next) => {
  const { chapter_order, material_id, class_id } = req.params;
  const { title, text_content, video_content, image_content } = req.body;
  database
    .query(
      "UPDATE chapter SET title = ?, text_content = ?, video_content = ?, image_content = ? WHERE chapter_order = ? AND material_id = ? AND class_id = ?",
      [
        title,
        text_content,
        video_content,
        image_content,
        chapter_order,
        material_id,
        class_id,
      ]
    )
    .then((data) => {
      res.status(200).json({
        message: "Chapter updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};

exports.deleteChapter = (req, res, next) => {
  const { id } = req.params;
  database
    .query("DELETE FROM chapter WHERE chapter_id = ?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Chapter deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};
