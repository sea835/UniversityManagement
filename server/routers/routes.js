const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

const studentController = require('../controllers/student');
const lecturerController = require('../controllers/lecturer');

const administratorController = require('../controllers/administrator');
const departmentController = require('../controllers/department');

const subjectController = require('../controllers/subject');

const classController = require('../controllers/class');

const chapterController = require('../controllers/chapter');

const examController = require('../controllers/exam');

const materialController = require('../controllers/material');
const questionController = require('../controllers/question');

const testPerformanceController = require('../controllers/test_performance');

const participationController = require('../controllers/participation');
const certificateController = require('../controllers/certificate');

router.get('/students', authController.authToken, studentController.getStudents);
router.get('/students/:id', authController.authToken, studentController.getStudentById);
router.post('/students', authController.authToken, studentController.createStudent);
router.put('/students/:id', authController.authToken, studentController.updateStudent);
router.delete('/students/:id', authController.authToken, studentController.deleteStudent);
router.get('/students/class/:id', authController.authToken, studentController.getStudentsByClassId);

router.get('/lecturers', authController.authToken, lecturerController.getLecturers);
router.get('/lecturers/:id', authController.authToken, lecturerController.getLecturerById);
router.post('/lecturers', authController.authToken, lecturerController.createLecturer);
router.put('/lecturers/:id', authController.authToken, lecturerController.updateLecturer);
router.delete('/lecturers/:id', authController.authToken, lecturerController.deleteLecturer);

router.get('/administrators', authController.authToken, administratorController.getAdministrators);
router.get('/administrators/:id', authController.authToken, administratorController.getAdministratorById);
router.post('/administrators', authController.authToken, administratorController.createAdministrator);
router.put('/administrators/:id', authController.authToken, administratorController.updateAdministrator);
router.delete('/administrators/:id', authController.authToken, administratorController.deleteAdministrator);

router.get('/departments', departmentController.getDepartments);
router.get('/departments/:id', authController.authToken, departmentController.getDepartmentById);
router.post('/departments', authController.authToken, departmentController.createDepartment);
router.put('/departments/:id', authController.authToken, departmentController.updateDepartment);
router.delete('/departments/:id', authController.authToken, departmentController.deleteDepartment);

router.get('/subjects', subjectController.getSubjects);
router.get('/subjects/:id', authController.authToken, subjectController.getSubjectById);
router.post('/subjects', authController.authToken, subjectController.createSubject);
router.put('/subjects/:id', authController.authToken, subjectController.updateSubject);
router.delete('/subjects/:id', authController.authToken, subjectController.deleteSubject);
router.get('/student/:id/subjects', subjectController.getSubjectByEnrollments);
router.get('/subjects/department/:id', authController.authToken, subjectController.getSubjectByDepartmentId);

router.get('/classes', authController.authToken, classController.getClasses);
router.get('/classes/:id', authController.authToken, classController.getClassById);
router.post('/classes', authController.authToken, classController.createClass);
router.put('/classes/:id', authController.authToken, classController.updateClass);
router.delete('/classes/:id', authController.authToken, classController.deleteClass);
router.get('/student/:studentId/classes', classController.getClassesByStudentId);
router.get('/student/:studentId/schedules', classController.getSchedulesByStudentId);
router.get('/classes/subject/:subjectId', authController.authToken, classController.getClassesBySubjectId);
router.get('/classes/lecturer/:lecturerId', classController.getClassesByLecturerId);

router.get('/chapters', authController.authToken, authController.authRole("teacher"), chapterController.getChapters);
router.get('/chapters/:id', authController.authToken, authController.authRole("teacher"), chapterController.getChapterById);
router.post('/chapters', authController.authToken, authController.authRole("teacher"), chapterController.createChapter);
router.put('/chapters/:id', authController.authToken, authController.authRole("teacher"), chapterController.updateChapter);
router.delete('/chapters/:id', authController.authToken, authController.authRole("teacher"), chapterController.deleteChapter);

router.get('/exams', authController.authToken, examController.getExams);
router.get('/exams/:id', authController.authToken, examController.getExamById);
router.post('/exams', authController.authToken, authController.authRole("teacher"), examController.createExam);
router.put('/exams/:id', authController.authToken, authController.authRole("teacher"), examController.updateExam);
router.delete('/exams/:id', authController.authToken, authController.authRole("teacher"), examController.deleteExam);

router.get('/materials', authController.authToken, authController.authRole("teacher"), materialController.getMaterials);
router.get('/materials/:id', authController.authToken, materialController.getMaterialById);
router.post('/materials', authController.authToken, authController.authRole("teacher"), materialController.createMaterial);
router.put('/materials/:id', authController.authToken, authController.authRole("teacher"), materialController.updateMaterial);
router.delete('/materials/:id', authController.authToken, authController.authRole("teacher"), materialController.deleteMaterial);

router.get('/questions', authController.authToken, questionController.getQuestions);
router.get('/questions/:id', authController.authToken, questionController.getQuestionById);
router.post('/questions', authController.authToken, questionController.createQuestion);
router.put('/questions/:id', authController.authToken, questionController.updateQuestion);
router.delete('/questions/:id', authController.authToken, questionController.deleteQuestion);

router.get('/test_performances', authController.authToken, testPerformanceController.getTestPerformances);
router.get('/test_performances/:id', authController.authToken, testPerformanceController.getTestPerformanceById);
router.post('/test_performances', authController.authToken, testPerformanceController.createTestPerformance);
router.put('/test_performances/:id', authController.authToken, testPerformanceController.updateTestPerformance);
router.delete('/test_performances/:id', authController.authToken, testPerformanceController.deleteTestPerformance);

router.get('/participations', authController.authToken, participationController.getParticipations);
router.get('/participations/:id', authController.authToken, participationController.getParticipationById);
router.post('/participations', authController.authToken, participationController.createParticipation);
router.put('/participations/:id', authController.authToken, participationController.updateParticipation);
router.delete('/participations/:id', authController.authToken, participationController.deleteParticipation);

router.get('/certificates', authController.authToken, certificateController.getCertificates);
router.get('/certificates/:id', authController.authToken, certificateController.getCertificateById);
router.post('/certificates', authController.authToken, certificateController.createCertificate);
router.put('/certificates/:id', authController.authToken, certificateController.updateCertificate);
router.delete('/certificates/:id', authController.authToken, certificateController.deleteCertificate);

router.post('/login', authController.login);
router.post('/token', authController.refreshToken);

module.exports = router;