const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

const studentController = require('../controllers/student');
const lecturerController = require('../controllers/lecturer');

const administratorController = require('../controllers/administrator');
const departmentController = require('../controllers/department');

const actionHistoryController = require('../controllers/action_history');
const subjectController = require('../controllers/subject');

const classController = require('../controllers/class');
const tuitionFeeController = require('../controllers/tuition_fee');

const enrollmentController = require('../controllers/enrollment');
const chapterController = require('../controllers/chapter');

const practicalExerciseController = require('../controllers/practical_exercise');
const examController = require('../controllers/exam');

const materialController = require('../controllers/material');
const questionController = require('../controllers/question');

const testPerformanceController = require('../controllers/test_performance');
const multipleChoiceOption = require('../controllers/multiple_choice_option');

const participationController = require('../controllers/participation');
const certificateController = require('../controllers/certificate');

router.get('/students', authController.authToken, authController.authRole("admin"), studentController.getStudents);
router.get('/students/:id', authController.authToken, authController.authRole("admin"), studentController.getStudentById);
router.post('/students', authController.authToken, authController.authRole("admin"), studentController.createStudent);
router.put('/students/:id', authController.authToken, authController.authRole("admin"), studentController.updateStudent);
router.delete('/students/:id', authController.authToken, authController.authRole("admin"), studentController.deleteStudent);

router.get('/lecturers', authController.authToken, authController.authRole("admin"), lecturerController.getLecturers);
router.get('/lecturers/:id', authController.authToken, authController.authRole("admin"), lecturerController.getLecturerById);
router.post('/lecturers', authController.authToken, authController.authRole("admin"), lecturerController.createLecturer);
router.put('/lecturers/:id', authController.authToken, authController.authRole("admin"), lecturerController.updateLecturer);
router.delete('/lecturers/:id', authController.authToken, authController.authRole("admin"), lecturerController.deleteLecturer);

router.get('/administrators', authController.authToken, authController.authRole("admin"), administratorController.getAdministrators);
router.get('/administrators/:id', authController.authToken, authController.authRole("admin"), administratorController.getAdministratorById);
router.post('/administrators', authController.authToken, authController.authRole("admin"), administratorController.createAdministrator);
router.put('/administrators/:id', authController.authToken, authController.authRole("admin"), administratorController.updateAdministrator);
router.delete('/administrators/:id', authController.authToken, authController.authRole("admin"), administratorController.deleteAdministrator);

router.get('/departments', authController.authToken, authController.authRole("admin"), departmentController.getDepartments);
router.get('/departments/:id', authController.authToken, authController.authRole("admin"), departmentController.getDepartmentById);
router.post('/departments', authController.authToken, authController.authRole("admin"), departmentController.createDepartment);
router.put('/departments/:id', authController.authToken, authController.authRole("admin"), departmentController.updateDepartment);
router.delete('/departments/:id', authController.authToken, authController.authRole("admin"), departmentController.deleteDepartment);

router.get('/action_histories', authController.authToken, authController.authRole("admin"), actionHistoryController.getActionHistories);
router.get('/action_histories/:id', authController.authToken, authController.authRole("admin"), actionHistoryController.getActionHistoryById);
router.post('/action_histories', authController.authToken, authController.authRole("admin"), actionHistoryController.createActionHistory);
router.put('/action_histories/:id', authController.authToken, authController.authRole("admin"), actionHistoryController.updateActionHistory);
router.delete('/action_histories/:id', authController.authToken, authController.authRole("admin"), actionHistoryController.deleteActionHistory);

router.get('/subjects', authController.authToken, subjectController.getSubjects);
router.get('/subjects/:id', authController.authToken, subjectController.getSubjectById);
router.post('/subjects', authController.authToken, subjectController.createSubject);
router.put('/subjects/:id', authController.authToken, subjectController.updateSubject);
router.delete('/subjects/:id', authController.authToken, subjectController.deleteSubject);

router.get('/classes', authController.authToken, classController.getClasses);
router.get('/classes/:id', authController.authToken, classController.getClassById);
router.post('/classes', authController.authToken, authController.authRole("admin"), classController.createClass);
router.put('/classes/:id', authController.authToken, authController.authRole("admin"), classController.updateClass);
router.delete('/classes/:id', authController.authToken, authController.authRole("admin"), classController.deleteClass);

router.get('/enrollments', authController.authToken, authController.authRole("admin"), enrollmentController.getEnrollments);
router.get('/enrollments/:id', authController.authToken, enrollmentController.getEnrollmentById);
router.post('/enrollments', authController.authToken, enrollmentController.createEnrollment);
router.put('/enrollments/:id', authController.authToken, enrollmentController.updateEnrollment);
router.delete('/enrollments/:id', authController.authToken, enrollmentController.deleteEnrollment);

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

router.get('/multiple_choice_options', authController.authToken, multipleChoiceOption.getMultipleChoiceOptions);
router.get('/multiple_choice_options/:id', authController.authToken, multipleChoiceOption.getMultipleChoiceOptionById);
router.post('/multiple_choice_options', authController.authToken, multipleChoiceOption.createMultipleChoiceOption);
router.put('/multiple_choice_options/:id', authController.authToken, multipleChoiceOption.updateMultipleChoiceOption);
router.delete('/multiple_choice_options/:id', authController.authToken, multipleChoiceOption.deleteMultipleChoiceOption);

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