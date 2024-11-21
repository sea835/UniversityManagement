CREATE DATABASE university_management_test;
USE university_management_test;

SET SQL_SAFE_UPDATES = 0;

-- Create the Department table
CREATE TABLE department (
    department_id VARCHAR(50) PRIMARY KEY,
    department_name VARCHAR(100)
);

-- Create the Lecturer table
CREATE TABLE lecturer (
    lecturer_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(150),
    full_name VARCHAR(100),
    phone_number VARCHAR(15),
    image VARCHAR(255),
    gender VARCHAR(10),  -- Added gender
    date_of_birth DATE,      -- Added birth_date
    specialization VARCHAR(100),
    department_id VARCHAR(50)
);

-- Create the Student table
CREATE TABLE student (
    student_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(100),
    full_name VARCHAR(100),
    phone_number VARCHAR(15),
    image VARCHAR(255),
    address VARCHAR(150),
    gender VARCHAR(10),  -- Added gender
    date_of_birth DATE,      -- Added birth_date
    department_id VARCHAR(50)
);

-- Create the Administrator table
CREATE TABLE administrator (
    admin_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(150),
    full_name VARCHAR(100),
    phone_number VARCHAR(15),
    gender VARCHAR(10),  -- Added gender
    date_of_birth DATE,      -- Added birth_date
    image VARCHAR(255)
);

-- Create the Subject table
CREATE TABLE subject (
    subject_id VARCHAR(50),
    subject_name VARCHAR(100),
    credits INT,
    prerequisites VARCHAR(255),
    learning_outcomes VARCHAR(255),
    department_id VARCHAR(50),
    PRIMARY KEY (subject_id)
);

-- Create the Class table
CREATE TABLE class (
    class_id VARCHAR(50),
    semester_id VARCHAR(50),
    subject_id VARCHAR(50),
    lecturer_id VARCHAR(50),
    period int,
    day_of_week int,
    week int,
    PRIMARY KEY (class_id, semester_id, subject_id)
);

-- Create the Enrollment table (now Dang_ky)
CREATE TABLE register (
    subject_id VARCHAR(50),
    student_id VARCHAR(50),
    result int,  -- from the participation result
    PRIMARY KEY (subject_id, student_id)
);

-- Create the Participation table (now Tham_gia)
CREATE TABLE participation (
    class_id VARCHAR(50),
    student_id VARCHAR(50),
    semester_id VARCHAR(50),
    subject_id VARCHAR(50),
    result int,
    PRIMARY KEY (class_id, student_id, semester_id, subject_id)
);

-- Create the Certificate table
CREATE TABLE certificate (
    certificate_id VARCHAR(50),
    lecturer_id VARCHAR(50),
    PRIMARY KEY (certificate_id)
);

-- Create the Question table (now Cau_hoi)
CREATE TABLE question (
    question_id VARCHAR(50),
    exam_id VARCHAR(50),
    question_content VARCHAR(255),
    answer_a VARCHAR(255),
    answer_b VARCHAR(255),
    answer_c VARCHAR(255),
    answer_d VARCHAR(255),
    correct_answer VARCHAR(255),
    PRIMARY KEY (question_id, exam_id)
);

-- Create the Test_Performance table (now Thuc_hien_kiem_tra)
CREATE TABLE test_performance (
    student_id VARCHAR(50),
    exam_id VARCHAR(50),
    test_date DATE,
    score DECIMAL(5, 2),
    PRIMARY KEY (student_id, exam_id)
);

-- Create the Material table
CREATE TABLE material (
    material_id VARCHAR(50),
    semester_id VARCHAR(50),
    class_id VARCHAR(50),
    subject_id VARCHAR(50),
    material_name VARCHAR(255),
    PRIMARY KEY (material_id, semester_id, class_id, subject_id)
);

-- Create the Chapter table
CREATE TABLE chapter (
    chapter_id VARCHAR(50),
    material_id VARCHAR(50),
    semester_id VARCHAR(50),
    class_id VARCHAR(50),
    subject_id VARCHAR(50),
    title VARCHAR(255),
    text_content TEXT,
    video_content TEXT,
    image_content TEXT,
    PRIMARY KEY (material_id, semester_id, class_id, chapter_id, subject_id)
);

-- Create the Exam table (now Bai_kiem_tra)
CREATE TABLE exam (
    exam_id VARCHAR(50),
    subject_id VARCHAR(50),
    class_id VARCHAR(50),
    semester_id VARCHAR(50),
    material_id VARCHAR(50),
	chapter_id VARCHAR(50),
    exam_name VARCHAR(255),
    PRIMARY KEY (exam_id)	
);	
-- =============================

-- Add an index for the foreign key column `material_id`
CREATE INDEX idx_chapter_material_id ON chapter(material_id);

-- Add an index for the foreign key column `semester_id`
CREATE INDEX idx_chapter_semester_id ON chapter(semester_id);

-- Add an index for the foreign key column `class_id`
CREATE INDEX idx_chapter_class_id ON chapter(class_id);

-- Add an index for the foreign key column `subject_id`
CREATE INDEX idx_chapter_subject_id ON chapter(subject_id);

-- Create an index on the chapter_id column in the chapter table
CREATE INDEX idx_chapter_id ON chapter(chapter_id);

-- Foreign key constraints

-- Add FK constraints for the Lecturer table
ALTER TABLE lecturer
ADD CONSTRAINT fk_lecturer_department
FOREIGN KEY (department_id) REFERENCES department(department_id);

-- Add FK constraints for the Student table
ALTER TABLE student
ADD CONSTRAINT fk_student_department
FOREIGN KEY (department_id) REFERENCES department(department_id);

-- Add FK constraints for the Subject table
ALTER TABLE subject
ADD CONSTRAINT fk_subject_department
FOREIGN KEY (department_id) REFERENCES department(department_id);

-- Add FK constraints for the Class table
ALTER TABLE class
ADD CONSTRAINT fk_class_subject
FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
ADD CONSTRAINT fk_class_lecturer
FOREIGN KEY (lecturer_id) REFERENCES lecturer(lecturer_id);

-- Add FK constraints for the Register (Dang_ky) table
ALTER TABLE register
ADD CONSTRAINT fk_register_subject
FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
ADD CONSTRAINT fk_register_student
FOREIGN KEY (student_id) REFERENCES student(student_id);

-- Add FK constraints for the Participation (Tham_gia) table
ALTER TABLE participation
ADD CONSTRAINT fk_participation_class
FOREIGN KEY (class_id) REFERENCES class(class_id),
ADD CONSTRAINT fk_participation_student
FOREIGN KEY (student_id) REFERENCES student(student_id),
ADD CONSTRAINT fk_participation_subject
FOREIGN KEY (subject_id) REFERENCES subject(subject_id);

-- Add FK constraints for the Certificate table
ALTER TABLE certificate
ADD CONSTRAINT fk_certificate_lecturer
FOREIGN KEY (lecturer_id) REFERENCES lecturer(lecturer_id);

-- Add FK constraints for the Chapter table
ALTER TABLE chapter
ADD CONSTRAINT fk_chapter_material
FOREIGN KEY (material_id) REFERENCES material(material_id),
ADD CONSTRAINT fk_chapter_subject
FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
ADD CONSTRAINT fk_chapter_class
FOREIGN KEY (class_id) REFERENCES class(class_id);


-- Add FK constraints for the Question (Cau_hoi) table
ALTER TABLE question
ADD CONSTRAINT fk_question_exam
FOREIGN KEY (exam_id) REFERENCES exam(exam_id);

-- Add FK constraints for the Test_Performance table
ALTER TABLE test_performance
ADD CONSTRAINT fk_test_performance_student
FOREIGN KEY (student_id) REFERENCES student(student_id),
ADD CONSTRAINT fk_test_performance_exam
FOREIGN KEY (exam_id) REFERENCES exam(exam_id);

-- Add FK constraints for the Material table
ALTER TABLE material
ADD CONSTRAINT fk_material_class
FOREIGN KEY (class_id) REFERENCES class(class_id),
ADD CONSTRAINT fk_material_subject
FOREIGN KEY (subject_id) REFERENCES subject(subject_id);


-- Add FK constraints for the Exam (Bai_kiem_tra) table
ALTER TABLE exam
ADD CONSTRAINT fk_exam_subject
FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
ADD CONSTRAINT fk_exam_class
FOREIGN KEY (class_id) REFERENCES class(class_id),
ADD CONSTRAINT fk_exam_material
FOREIGN KEY (material_id) REFERENCES material(material_id),
ADD CONSTRAINT fk_exam_chapter
FOREIGN KEY (chapter_id) REFERENCES chapter(chapter_id);


-- --------------------------------------------------------------------------

INSERT INTO Department (Department_ID, Department_Name) VALUES
('K01', 'Công nghệ thông tin'),
('K02', 'Kinh tế'),
('K03', 'Luật'),
('K04', 'Ngôn ngữ Anh'),
('K05', 'Y học'),
('K06', 'Khoa học máy tính'),
('K07', 'Quản trị kinh doanh'),
('K08', 'Tài chính ngân hàng'),
('K09', 'Giáo dục'),
('K10', 'Kỹ thuật cơ khí');


-- Lecturer table
INSERT INTO Lecturer (Lecturer_ID, username, Password, Email, Address, Full_Name, Phone_Number, Image, Specialization, Department_ID, Date_of_Birth, Gender) VALUES
('GV001', 'nguyenvanA', 'password1', 'nva@gmail.com', 'Hà Nội', 'Nguyễn Văn A', '0988000001', 'nva.jpg', 'Kỹ thuật phần mềm', 'K01', '1980-05-01', 'Male'),
('GV002', 'lethib', 'password2', 'ltb@gmail.com', 'Hồ Chí Minh', 'Lê Thị B', '0988000002', 'ltb.jpg', 'Mạng máy tính', 'K01', '1982-07-15', 'Female'),
('GV003', 'tranvanC', 'password3', 'tvc@gmail.com', 'Đà Nẵng', 'Trần Văn C', '0988000003', 'tvc.jpg', 'Tài chính', 'K02', '1975-03-10', 'Male'),
('GV004', 'phamthid', 'password4', 'ptd@gmail.com', 'Hải Phòng', 'Phạm Thị D', '0988000004', 'ptd.jpg', 'Kinh tế', 'K02', '1985-09-25', 'Female'),
('GV005', 'buituane', 'password5', 'bte@gmail.com', 'Cần Thơ', 'Bùi Tuấn E', '0988000005', 'bte.jpg', 'Ngữ pháp', 'K04', '1978-12-20', 'Male'),
('GV006', 'dinhngocf', 'password6', 'dnf@gmail.com', 'Huế', 'Đinh Ngọc F', '0988000006', 'dnf.jpg', 'Ngữ âm học', 'K04', '1984-02-05', 'Female'),
('GV007', 'vudinhg', 'password7', 'vdg@gmail.com', 'Nha Trang', 'Vũ Đình G', '0988000007', 'vdg.jpg', 'Kỹ thuật cơ khí', 'K10', '1976-11-15', 'Male'),
('GV008', 'lethiha', 'password8', 'lth@gmail.com', 'Quảng Ninh', 'Lê Thị H', '0988000008', 'lth.jpg', 'Khoa học máy tính', 'K06', '1990-08-05', 'Female'),
('GV009', 'phamvani', 'password9', 'pvi@gmail.com', 'Thanh Hóa', 'Phạm Văn I', '0988000009', 'pvi.jpg', 'Y học', 'K05', '1981-06-30', 'Male'),
('GV010', 'nguyenthuyj', 'password10', 'ntj@gmail.com', 'Bắc Ninh', 'Nguyễn Thúy J', '0988000010', 'ntj.jpg', 'Luật quốc tế', 'K03', '1992-04-18', 'Female');

-- Student table
INSERT INTO Student (Student_ID, username, Password, Email, Full_Name, Phone_Number, Image, Address, department_id, Date_of_Birth, Gender) VALUES
('SV001', 'sv001', 'password1', 'sv001@gmail.com', 'Nguyễn Văn X', '0981000001', 'sv001.jpg', 'TP Hồ Chí Minh', 'K01', '2000-01-01', 'Male'),
('SV002', 'sv002', 'password2', 'sv002@gmail.com', 'Lê Thị Y', '0981000002', 'sv002.jpg', 'TP Hồ Chí Minh', 'K01', '2000-02-14', 'Female'),
('SV003', 'sv003', 'password3', 'sv003@gmail.com', 'Trần Văn Z', '0981000003', 'sv003.jpg', 'TP Hồ Chí Minh', 'K01', '2001-03-22', 'Male'),
('SV004', 'sv004', 'password4', 'sv004@gmail.com', 'Phạm Văn M', '0981000004', 'sv004.jpg', 'TP Hồ Chí Minh', 'K01', '2000-12-11', 'Male'),
('SV005', 'sv005', 'password5', 'sv005@gmail.com', 'Bùi Thị N', '0981000005', 'sv005.jpg', 'TP Hồ Chí Minh', 'K01', '2000-07-05', 'Female'),
('SV006', 'sv006', 'password6', 'sv006@gmail.com', 'Đinh Tuấn O', '0981000006', 'sv006.jpg', 'TP Hồ Chí Minh', 'K01', '1999-11-30', 'Male'),
('SV007', 'sv007', 'password7', 'sv007@gmail.com', 'Vũ Ngọc P', '0981000007', 'sv007.jpg', 'TP Hồ Chí Minh', 'K01', '2001-05-19', 'Male'),
('SV008', 'sv008', 'password8', 'sv008@gmail.com', 'Phạm Tuấn Q', '0981000008', 'sv008.jpg', 'TP Hồ Chí Minh', 'K01', '2000-09-23', 'Male'),
('SV009', 'sv009', 'password9', 'sv009@gmail.com', 'Nguyễn Văn R', '0981000009', 'sv009.jpg', 'TP Hồ Chí Minh', 'K01', '1999-04-01', 'Male'),
('SV010', 'sv010', 'password10', 'sv010@gmail.com', 'Lê Văn S', '0981000010', 'sv010.jpg', 'TP Hồ Chí Minh', 'K01', '2000-06-17', 'Male');

-- Administrator table
INSERT INTO Administrator (Admin_ID, username, Password, Email, Address, Full_Name, Phone_Number, Image, Date_of_Birth, Gender) VALUES
('QT001', 'qt001', 'password1', 'qt001@gmail.com', 'Hà Nội', 'Nguyễn Văn A', '0982000001', 'qt001.jpg', '1970-05-01', 'Male'),
('QT002', 'qt002', 'password2', 'qt002@gmail.com', 'Hồ Chí Minh', 'Trần Văn B', '0982000002', 'qt002.jpg', '1975-10-12', 'Male'),
('QT003', 'qt003', 'password3', 'qt003@gmail.com', 'Đà Nẵng', 'Lê Thị C', '0982000003', 'qt003.jpg', '1980-07-22', 'Female'),
('QT004', 'qt004', 'password4', 'qt004@gmail.com', 'Hải Phòng', 'Bùi Văn D', '0982000004', 'qt004.jpg', '1982-03-18', 'Male'),
('QT005', 'qt005', 'password5', 'qt005@gmail.com', 'Huế', 'Phạm Văn E', '0982000005', 'qt005.jpg', '1977-09-05', 'Male'),
('QT006', 'qt006', 'password6', 'qt006@gmail.com', 'Nha Trang', 'Đinh Thị F', '0982000006', 'qt006.jpg', '1984-12-25', 'Female'),
('QT007', 'qt007', 'password7', 'qt007@gmail.com', 'Cần Thơ', 'Vũ Văn G', '0982000007', 'qt007.jpg', '1979-04-15', 'Male'),
('QT008', 'qt008', 'password8', 'qt008@gmail.com', 'Quảng Ninh', 'Nguyễn Văn H', '0982000008', 'qt008.jpg', '1985-02-01', 'Male'),
('QT009', 'qt009', 'password9', 'qt009@gmail.com', 'Thanh Hóa', 'Lê Thị I', '0982000009', 'qt009.jpg', '1980-08-30', 'Female'),
('QT010', 'qt010', 'password10', 'qt010@gmail.com', 'Bắc Ninh', 'Trần Văn J', '0982000010', 'qt010.jpg', '1975-11-14', 'Male');


INSERT INTO Certificate (Certificate_ID, Lecturer_ID) VALUES
('CC001', 'GV001'),
('CC002', 'GV002'),
('CC003', 'GV003'),
('CC004', 'GV004'),
('CC005', 'GV005'),
('CC006', 'GV006'),
('CC007', 'GV007'),
('CC008', 'GV008'),
('CC009', 'GV009'),
('CC010', 'GV010');


INSERT INTO Subject (Subject_ID, Subject_Name, Credits, Prerequisites, Learning_Outcomes, Department_ID) VALUES 
('MH001', 'Lập trình C', 3, 'Không', 'Biết lập trình cơ bản', 'K01'),
('MH002', 'Toán cao cấp', 4, 'Không', 'Nắm vững kiến thức toán học', 'K01'),
('MH003', 'Kinh tế vĩ mô', 3, 'Không', 'Hiểu về kinh tế', 'K02'),
('MH004', 'Luật hình sự', 2, 'Không', 'Hiểu rõ pháp luật', 'K03'),
('MH005', 'Ngữ pháp tiếng Anh', 3, 'Không', 'Nắm vững ngữ pháp', 'K04'),
('MH006', 'Y tế cộng đồng', 3, 'Không', 'Hiểu về y tế', 'K05'),
('MH007', 'Thiết kế cơ khí', 4, 'Không', 'Hiểu cơ bản về thiết kế', 'K10'),
('MH008', 'Phân tích tài chính', 3, 'Không', 'Phân tích các chỉ số tài chính', 'K02'),
('MH009', 'Ngôn ngữ lập trình', 3, 'Không', 'Biết lập trình cơ bản', 'K06'),
('MH010', 'Quản trị dự án', 3, 'Không', 'Hiểu về quản trị', 'K07');


INSERT INTO class (class_id, semester_id, subject_id, lecturer_id, period, day_of_week, week) VALUES
('L01', 'HK241', 'MH001', 'GV001', 1, 2, 1), -- Monday, 1st period, 1st week
('L02', 'HK241', 'MH002', 'GV002', 2, 3, 1), -- Tuesday, 2nd period, 1st week
('L03', 'HK242', 'MH003', 'GV003', 1, 2, 2), -- Monday, 1st period, 2nd week
('L04', 'HK242', 'MH004', 'GV004', 2, 3, 2), -- Tuesday, 2nd period, 2nd week
('L05', 'HK243', 'MH005', 'GV005', 1, 2, 3), -- Monday, 1st period, 3rd week
('L06', 'HK243', 'MH006', 'GV006', 2, 3, 3), -- Tuesday, 2nd period, 3rd week
('L07', 'HK231', 'MH007', 'GV007', 1, 2, 4), -- Monday, 1st period, 4th week
('L08', 'HK231', 'MH008', 'GV008', 2, 3, 4), -- Tuesday, 2nd period, 4th week
('L09', 'HK232', 'MH009', 'GV009', 1, 2, 5), -- Monday, 1st period, 5th week
('L10', 'HK232', 'MH010', 'GV010', 2, 3, 5); -- Tuesday, 2nd period, 5th week


INSERT INTO Participation (class_id, student_id, semester_id, subject_id, result) VALUES
('L01', 'SV001', 'HK241', 'MH001', NULL),  -- Học kỳ 1 năm 2024
('L02', 'SV002', 'HK242', 'MH002', NULL),  -- Học kỳ 2 năm 2024
('L03', 'SV003', 'HK243', 'MH003', NULL),  -- Học kỳ 3 năm 2024
('L04', 'SV004', 'HK231', 'MH004', NULL),  -- Học kỳ 1 năm 2023
('L05', 'SV005', 'HK232', 'MH005', NULL),  -- Học kỳ 2 năm 2023
('L06', 'SV006', 'HK233', 'MH006', NULL),  -- Học kỳ 3 năm 2023
('L07', 'SV007', 'HK221', 'MH007', NULL),  -- Học kỳ 1 năm 2022
('L08', 'SV008', 'HK222', 'MH008', NULL),  -- Học kỳ 2 năm 2022
('L09', 'SV009', 'HK223', 'MH009', NULL),  -- Học kỳ 3 năm 2022
('L10', 'SV010', 'HK211', 'MH010', NULL);  -- Học kỳ 1 năm 2021



INSERT INTO Material (Material_ID, Class_ID, Semester_ID, Material_Name, Subject_ID) VALUES 
('TL001', 'L01', 'HK241', 'Tài liệu 1', 'MH001'),
('TL002', 'L02', 'HK241', 'Tài liệu 2', 'MH002'),
('TL003', 'L03', 'HK242', 'Tài liệu 3', 'MH003'),
('TL004', 'L04', 'HK242', 'Tài liệu 4', 'MH004'),
('TL005', 'L05', 'HK243', 'Tài liệu 5', 'MH005'),
('TL006', 'L06', 'HK243', 'Tài liệu 6', 'MH006'),
('TL007', 'L07', 'HK231', 'Tài liệu 7', 'MH007'),
('TL008', 'L08', 'HK231', 'Tài liệu 8', 'MH008'),
('TL009', 'L09', 'HK232', 'Tài liệu 9', 'MH009'),
('TL010', 'L10', 'HK232', 'Tài liệu 10', 'MH010');


INSERT INTO Chapter (chapter_id, Material_ID, Class_ID, Semester_ID, Subject_ID, Title, Text_Content, Video_Content, Image_Content) VALUES
('01', 'TL001', 'L01', 'HK241', 'MH001', 'Chương 1', 'Văn bản 1', 'Video 1', 'Hình ảnh 1'),
('02', 'TL002', 'L02', 'HK241', 'MH002', 'Chương 2', 'Văn bản 2', 'Video 2', 'Hình ảnh 2'),
('03', 'TL003', 'L03', 'HK242', 'MH003', 'Chương 3', 'Văn bản 3', 'Video 3', 'Hình ảnh 3'),
('04', 'TL004', 'L04', 'HK242', 'MH004', 'Chương 4', 'Văn bản 4', 'Video 4', 'Hình ảnh 4'),
('05', 'TL005', 'L05', 'HK243', 'MH005', 'Chương 5', 'Văn bản 5', 'Video 5', 'Hình ảnh 5'),
('06', 'TL006', 'L06', 'HK243', 'MH006', 'Chương 6', 'Văn bản 6', 'Video 6', 'Hình ảnh 6'),
('07', 'TL007', 'L07', 'HK231', 'MH007', 'Chương 7', 'Văn bản 7', 'Video 7', 'Hình ảnh 7'),
('08', 'TL008', 'L08', 'HK231', 'MH008', 'Chương 8', 'Văn bản 8', 'Video 8', 'Hình ảnh 8'),
('09', 'TL009', 'L09', 'HK232', 'MH009', 'Chương 9', 'Văn bản 9', 'Video 9', 'Hình ảnh 9'),
('10', 'TL010', 'L10', 'HK232', 'MH010', 'Chương 10', 'Văn bản 10', 'Video 10', 'Hình ảnh 10');



INSERT INTO exam (exam_id, subject_id, class_id, semester_id, material_id, chapter_id, exam_name) VALUES
('BKT001', 'MH001', 'L01', 'HK241', 'TL001', '01', 'Bài kiểm tra 1'),
('BKT002', 'MH001', 'L01', 'HK241', 'TL001', '02', 'Bài kiểm tra 2'),
('BKT003', 'MH002', 'L02', 'HK241', 'TL002', '01', 'Bài kiểm tra 3'),
('BKT004', 'MH002', 'L02', 'HK241', 'TL002', '02', 'Bài kiểm tra 4'),
('BKT005', 'MH003', 'L03', 'HK242', 'TL003', '01', 'Bài kiểm tra 5'),
('BKT006', 'MH003', 'L03', 'HK242', 'TL003', '02', 'Bài kiểm tra 6'),
('BKT007', 'MH004', 'L04', 'HK242', 'TL004', '01', 'Bài kiểm tra 7'),	
('BKT008', 'MH004', 'L04', 'HK242', 'TL004', '02', 'Bài kiểm tra 8'),
('BKT009', 'MH005', 'L05', 'HK243', 'TL005', '01', 'Bài kiểm tra 9'),
('BKT010', 'MH005', 'L05', 'HK243', 'TL005', '02', 'Bài kiểm tra 10');


INSERT INTO question (question_id, exam_id, question_content, answer_a, answer_b, answer_c, answer_d, correct_answer) VALUES
('CH001', 'BKT001', 'Thủ đô của Việt Nam là gì?', 'Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Huế', 'A'),
('CH002', 'BKT001', 'Python là gì?', 'Một ngôn ngữ lập trình', 'Một loài rắn', 'Một hệ điều hành', 'Một phần mềm', 'A'),
('CH003', 'BKT001', 'Kết quả của 3 + 5 là bao nhiêu?', '6', '7', '9', '8', 'D'),
('CH004', 'BKT001', 'Cấu trúc nào sau đây là của vòng lặp trong Python?', 'if', 'for', 'while', 'else', 'B'),
('CH005', 'BKT001', 'Ai là người phát minh ra thuyết tương đối?', 'Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Marie Curie', 'A'),
('CH006', 'BKT001', 'Quốc gia nào lớn nhất thế giới theo diện tích?', 'Nga', 'Canada', 'Trung Quốc', 'Hoa Kỳ', 'A'),
('CH007', 'BKT001', 'HTML là gì?', 'Ngôn ngữ lập trình', 'Ngôn ngữ đánh dấu siêu văn bản', 'Một trình duyệt web', 'Một công cụ tìm kiếm', 'B'),
('CH008', 'BKT001', 'Mã quốc gia của Việt Nam là gì?', 'VN', 'VNM', 'VI', 'VNQ', 'A'),
('CH009', 'BKT001', 'Ngôn ngữ chính thức của Brazil là gì?', 'Tiếng Tây Ban Nha', 'Tiếng Anh', 'Tiếng Pháp', 'Tiếng Bồ Đào Nha', 'D'),
('CH010', 'BKT001', 'Cấu trúc dữ liệu nào là một ngăn xếp?', 'Queue', 'Array', 'Stack', 'Linked List', 'C');


INSERT INTO test_performance (student_id, exam_id, test_date, score) VALUES
('SV001', 'BKT001', '2023-06-01', 8.00),
('SV002', 'BKT002', '2023-06-02', 7.00),
('SV003', 'BKT003', '2023-06-03', 9.00),
('SV004', 'BKT004', '2023-06-04', 6.00),
('SV005', 'BKT005', '2023-06-05', 10.00),
('SV006', 'BKT006', '2023-06-06', 8.00),
('SV007', 'BKT007', '2023-06-07', 7.00),
('SV008', 'BKT008', '2023-06-08', 9.00),
('SV009', 'BKT009', '2023-06-09', 6.00),
('SV010', 'BKT010', '2023-06-10', 10.00);


INSERT INTO register (subject_id, student_id, result) VALUES
('MH001', 'SV001', 85),
('MH002', 'SV002', 78),
('MH003', 'SV003', 92),
('MH004', 'SV004', 67),
('MH005', 'SV005', 88),
('MH006', 'SV006', 73),
('MH007', 'SV007', 95),
('MH008', 'SV008', 80),
('MH009', 'SV009', 60),
('MH010', 'SV010', 90);





