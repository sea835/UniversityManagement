const express = require('express');
const router = express.Router();

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

router.get('/administrators', administratorController.getAdministrators);
router.get('/administrators/:id', administratorController.getAdministratorById);
router.post('/administrators', administratorController.createAdministrator);
router.put('/administrators/:id', administratorController.updateAdministrator);
router.delete('/administrators/:id', administratorController.deleteAdministrator);

router.get('/departments', departmentController.getDepartments);
router.get('/departments/:id', departmentController.getDepartmentById);
router.post('/departments', departmentController.createDepartment);
router.put('/departments/:id', departmentController.updateDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

router.get('/action_histories', actionHistoryController.getActionHistories);
router.get('/action_histories/:id', actionHistoryController.getActionHistoryById);
router.post('/action_histories', actionHistoryController.createActionHistory);
router.put('/action_histories/:id', actionHistoryController.updateActionHistory);
router.delete('/action_histories/:id', actionHistoryController.deleteActionHistory);

router.get('/subjects', subjectController.getSubjects);
router.get('/subjects/:id', subjectController.getSubjectById);
router.post('/subjects', subjectController.createSubject);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

router.get('/classes', classController.getClasses);
router.get('/classes/:id', classController.getClassById);
router.post('/classes', classController.createClass);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

router.get('/tuition_fees', tuitionFeeController.getTuitionFees);
router.get('/tuition_fees/:id', tuitionFeeController.getTuitionFeeById);
router.post('/tuition_fees', tuitionFeeController.createTuitionFee);
router.put('/tuition_fees/:id', tuitionFeeController.updateTuitionFee);
router.delete('/tuition_fees/:id', tuitionFeeController.deleteTuitionFee);

router.get('/enrollments', enrollmentController.getEnrollments);
router.get('/enrollments/:id', enrollmentController.getEnrollmentById);
router.post('/enrollments', enrollmentController.createEnrollment);
router.put('/enrollments/:id', enrollmentController.updateEnrollment);
router.delete('/enrollments/:id', enrollmentController.deleteEnrollment);

router.get('/chapters', chapterController.getChapters);
router.get('/chapters/:id', chapterController.getChapterById);
router.post('/chapters', chapterController.createChapter);
router.put('/chapters/:id', chapterController.updateChapter);
router.delete('/chapters/:id', chapterController.deleteChapter);

router.get('/practical_exercises', practicalExerciseController.getPracticalExercises);
router.get('/practical_exercises/:id', practicalExerciseController.getPracticalExerciseById);
router.post('/practical_exercises', practicalExerciseController.createPracticalExercise);
router.put('/practical_exercises/:id', practicalExerciseController.updatePracticalExercise);
router.delete('/practical_exercises/:id', practicalExerciseController.deletePracticalExercise);

router.get('/exams', examController.getExams);
router.get('/exams/:id', examController.getExamById);
router.post('/exams', examController.createExam);
router.put('/exams/:id', examController.updateExam);
router.delete('/exams/:id', examController.deleteExam);

router.get('/materials', materialController.getMaterials);
router.get('/materials/:id', materialController.getMaterialById);
router.post('/materials', materialController.createMaterial);
router.put('/materials/:id', materialController.updateMaterial);
router.delete('/materials/:id', materialController.deleteMaterial);

router.get('/questions', questionController.getQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.post('/questions', questionController.createQuestion);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);

router.get('/test_performances', testPerformanceController.getTestPerformances);
router.get('/test_performances/:id', testPerformanceController.getTestPerformanceById);
router.post('/test_performances', testPerformanceController.createTestPerformance);
router.put('/test_performances/:id', testPerformanceController.updateTestPerformance);
router.delete('/test_performances/:id', testPerformanceController.deleteTestPerformance);

router.get('/multiple_choice_options', multipleChoiceOption.getMultipleChoiceOptions);
router.get('/multiple_choice_options/:id', multipleChoiceOption.getMultipleChoiceOptionById);
router.post('/multiple_choice_options', multipleChoiceOption.createMultipleChoiceOption);
router.put('/multiple_choice_options/:id', multipleChoiceOption.updateMultipleChoiceOption);
router.delete('/multiple_choice_options/:id', multipleChoiceOption.deleteMultipleChoiceOption);

router.get('/participations', participationController.getParticipations);
router.get('/participations/:id', participationController.getParticipationById);
router.post('/participations', participationController.createParticipation);
router.put('/participations/:id', participationController.updateParticipation);
router.delete('/participations/:id', participationController.deleteParticipation);

router.get('/certificates', certificateController.getCertificates);
router.get('/certificates/:id', certificateController.getCertificateById);
router.post('/certificates', certificateController.createCertificate);
router.put('/certificates/:id', certificateController.updateCertificate);
router.delete('/certificates/:id', certificateController.deleteCertificate);

module.exports = router;