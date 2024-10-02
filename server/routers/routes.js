const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const lecturerController = require('../controllers/lecturer');

router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

router.get('/lecturers', lecturerController.getLecturers);
router.get('/lecturers/:id', lecturerController.getLecturerById);
router.post('/lecturers', lecturerController.createLecturer);
router.put('/lecturers/:id', lecturerController.updateLecturer);
router.delete('/lecturers/:id', lecturerController.deleteLecturer);



module.exports = router;