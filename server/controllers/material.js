const database = require("../database/database");

exports.getMaterials = (req, res, next) => {
  database
    .query("SELECT * FROM material")
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

exports.getMaterialById = (req, res, next) => {
  const id = req.params.id;
  database
    .query("SELECT * FROM material WHERE material_id = ?", [id])
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

exports.createMaterial = (req, res, next) => {
  const { material_id, class_id, material_name } = req.body;

  // Bước 1: Kiểm tra class_id trong bảng class và lấy subject_id
  database
    .query("SELECT subject_id FROM class WHERE class_id = ?", [class_id])
    .then((result) => {
      if (result.length === 0) {
        // Nếu không tìm thấy class_id
        throw new Error("Class ID not found or subject_id not available");
      }

      const subject_id = result[0][0].subject_id; // Lấy subject_id từ kết quả

      // Bước 2: Tiến hành thêm dữ liệu vào bảng material
      return database.query(
        "INSERT INTO material (material_id, class_id, subject_id, material_name) VALUES (?, ?, ?, ?)",
        [material_id, class_id, subject_id, material_name]
      );
    })
    .then((data) => {
      // Thành công: Trả về kết quả
      res.status(201).json({
        message: "Material created successfully",
        data: data,
      });
    })
    .catch((err) => {
      // Xử lý lỗi
      console.log(err);
      res.status(500).json({
        message: err.message || "An error occurred",
      });
    });
};

exports.updateMaterial = (req, res, next) => {
  const id = req.params.id;
  const { class_id, material_name } = req.body;
  database
    .query(
      "UPDATE material SET class_id = ?, material_name = ? WHERE material_id = ?",
      [class_id, material_name, id]
    )
    .then((data) => {
      res.status(200).json({
        message: "Material updated successfully",
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

exports.deleteMaterial = (req, res, next) => {
  const id = req.params.id;
  database
    .query("DELETE FROM material WHERE material_id = ?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Material deleted successfully",
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
