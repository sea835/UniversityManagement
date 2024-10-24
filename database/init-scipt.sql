CREATE DATABASE university_management_test;

-- Connect to the university_management_test database
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
    address VARCHAR(159),
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
    image VARCHAR(255)
);

-- Create the Action_History table
CREATE TABLE action_history (
    admin_id VARCHAR(50),
    action_id VARCHAR(50),
    action_time DATETIME,
    action_description VARCHAR(255),
    PRIMARY KEY (admin_id, action_id)
);

-- Create the Subject table
CREATE TABLE subject (
    subject_id VARCHAR(50) PRIMARY KEY,
    subject_name VARCHAR(100),
    credits INT,
    prerequisites VARCHAR(255),
    learning_outcomes VARCHAR(255),
    department_id VARCHAR(50)
);

-- Create the Semester table
CREATE TABLE semester (
    semester_id VARCHAR(50) PRIMARY KEY
);

-- Create the Class table
CREATE TABLE class (
    class_id VARCHAR(50),
    semester_id varchar(50),
    schedule VARCHAR(255),
    subject_id VARCHAR(50),
    lecturer_id VARCHAR(50),
    PRIMARY KEY (class_id, semester_id)
);

-- Create the Enrollment table
CREATE TABLE enrollment (
    subject_id VARCHAR(50),
    student_id VARCHAR(50),
    semester_id varchar(50),
    result VARCHAR(50),
    PRIMARY KEY (subject_id, student_id, semester_id)
);

-- Create the Participation table
CREATE TABLE participation (
    class_id VARCHAR(50),
    student_id VARCHAR(50),
    semester_id VARCHAR(50),
    PRIMARY KEY (class_id, student_id, semester_id)
);

-- Create the Certificate table
CREATE TABLE certificate (
    certificate_id VARCHAR(50),
    lecturer_id VARCHAR(50),
    PRIMARY KEY (certificate_id)
);

-- Create the Exam table
CREATE TABLE exam (
    exam_id VARCHAR(50),
    chapter_order INT,
    material_id VARCHAR(50),
    class_id VARCHAR(50),
    semester_id VARCHAR(50),
    exam_name VARCHAR(255),
    primary key (exam_id, chapter_order, material_id, class_id, semester_id)
);

-- Create the Question table
CREATE TABLE question (
    question_id VARCHAR(50),
    exam_id VARCHAR(50),
    chapter_order INT,
    material_id VARCHAR(50),
    class_id VARCHAR(50),
    semester_id VARCHAR(50),
    question_content VARCHAR(255),
    student_answer VARCHAR(255),
    correct_answer VARCHAR(255),
    primary key (question_id, exam_id, chapter_order, material_id, class_id, semester_id)
);

-- Create the Multiple_Choice_Option table
CREATE TABLE multiple_choice_option (
    question_id VARCHAR(50),
    exam_id VARCHAR(50),
    chapter_order INT,
    material_id VARCHAR(50),
    class_id VARCHAR(50),
    semester_id VARCHAR(50),
    option_id VARCHAR(50),
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    primary key (question_id, exam_id, chapter_order, material_id, class_id, semester_id, option_id)
);

-- Create the Test_Performance table
CREATE TABLE test_performance (
    student_id VARCHAR(50),
    exam_id VARCHAR(50),
    chapter_order INT,
    material_id VARCHAR(50),
    semester_id VARCHAR(50),
    class_id VARCHAR(50),
    score DECIMAL(5, 2),
    test_date DATE,
    primary key (exam_id, chapter_order, material_id, class_id, semester_id)
);

-- Create the Material table
CREATE TABLE material (
    material_id VARCHAR(50),
    semester_id VARCHAR(50),
    class_id VARCHAR(50),
    material_name VARCHAR(255),
    primary key (material_id, semester_id, class_id)
);

-- Create the Chapter table
CREATE TABLE chapter (
    chapter_order INT,
    material_id VARCHAR(50),
    semester_id VARCHAR(50),
    class_id VARCHAR(50),
    title VARCHAR(255),
    text_content TEXT,
    video_content TEXT,
    image_content TEXT,
    primary key (material_id, semester_id, class_id, chapter_order)
);

-- =============================
-- Add necessary indexes
ALTER TABLE material
ADD INDEX idx_class_id (class_id),
ADD INDEX idx_semester_id (semester_id);

ALTER TABLE chapter
ADD INDEX idx_material_id (material_id),
ADD INDEX idx_class_id (class_id),
ADD INDEX idx_semester_id (semester_id),
ADD INDEX idx_chapter_order (chapter_order);

ALTER TABLE exam
ADD INDEX idx_class_id (class_id),
ADD INDEX idx_material_id (material_id),
ADD INDEX idx_chapter_order (chapter_order),
ADD INDEX idx_semester_id (semester_id);

ALTER TABLE question
ADD INDEX idx_exam_id (exam_id),
ADD INDEX idx_class_id (class_id),
ADD INDEX idx_material_id (material_id),
ADD INDEX idx_chapter_order (chapter_order),
ADD INDEX idx_semester_id (semester_id);

ALTER TABLE multiple_choice_option
ADD INDEX idx_question_id (question_id),
ADD INDEX idx_exam_id (exam_id),
ADD INDEX idx_class_id (class_id),
ADD INDEX idx_material_id (material_id),
ADD INDEX idx_chapter_order (chapter_order),
ADD INDEX idx_semester_id (semester_id);

ALTER TABLE lecturer
ADD INDEX idx_department_id (department_id);

ALTER TABLE student
ADD INDEX idx_department_id (department_id);

ALTER TABLE class
ADD INDEX idx_subject_id (subject_id),
ADD INDEX idx_lecturer_id (lecturer_id),
ADD INDEX idx_semester_id (semester_id);

-- =============================
-- Foreign key constraints

-- Foreign keys for Material
ALTER TABLE material
ADD CONSTRAINT FK_Material_Class
FOREIGN KEY (class_ID) REFERENCES class(class_ID),
ADD CONSTRAINT FK_Material_Semester
FOREIGN KEY (semester_ID) REFERENCES class(semester_ID);

-- Foreign keys for Chapter
ALTER TABLE chapter
ADD CONSTRAINT FK_Chapter_Material
FOREIGN KEY (material_ID) REFERENCES material(material_ID),
ADD CONSTRAINT FK_Chapter_Class
FOREIGN KEY (class_ID) REFERENCES material(class_ID),
ADD CONSTRAINT FK_Chapter_Semester
FOREIGN KEY (semester_ID) REFERENCES material(semester_ID);

-- Foreign keys for Exam
ALTER TABLE exam
ADD CONSTRAINT FK_Exam_Class
FOREIGN KEY (class_ID) REFERENCES chapter(class_id),
ADD CONSTRAINT FK_Exam_Material
FOREIGN KEY (material_ID) REFERENCES chapter(material_ID),
ADD CONSTRAINT FK_Exam_Chapter
FOREIGN KEY (chapter_order) REFERENCES chapter(chapter_order),
ADD CONSTRAINT FK_Exam_Semester
FOREIGN KEY (semester_ID) REFERENCES chapter(semester_ID);

-- Foreign keys for Question
ALTER TABLE question
ADD CONSTRAINT FK_Question_Exam
FOREIGN KEY (exam_ID) REFERENCES exam(exam_ID),
ADD CONSTRAINT FK_Question_Class
FOREIGN KEY (class_ID) REFERENCES exam(class_ID),
ADD CONSTRAINT FK_Question_Material
FOREIGN KEY (material_ID) REFERENCES exam(material_ID),
ADD CONSTRAINT FK_Question_Chapter
FOREIGN KEY (chapter_order) REFERENCES exam(chapter_order),
ADD CONSTRAINT FK_Question_Semester
FOREIGN KEY (semester_ID) REFERENCES exam(semester_ID);

-- Foreign keys for Multiple Choice Option
ALTER TABLE multiple_choice_option
ADD CONSTRAINT FK_Option_Question
FOREIGN KEY (question_ID) REFERENCES question(question_ID),
ADD CONSTRAINT FK_Option_Exam
FOREIGN KEY (exam_ID) REFERENCES question(exam_ID),
ADD CONSTRAINT FK_Option_Class
FOREIGN KEY (class_ID) REFERENCES question(class_ID),
ADD CONSTRAINT FK_Option_Material
FOREIGN KEY (material_ID) REFERENCES question(material_ID),
ADD CONSTRAINT FK_Option_Chapter
FOREIGN KEY (chapter_order) REFERENCES question(chapter_order),
ADD CONSTRAINT FK_Option_Semester
FOREIGN KEY (semester_ID) REFERENCES question(semester_ID);

-- Foreign key for Lecturer
ALTER TABLE lecturer
ADD CONSTRAINT FK_Lecturer_Department
FOREIGN KEY (department_ID) REFERENCES department(department_ID);

-- Foreign key for Student
ALTER TABLE student
ADD CONSTRAINT FK_Student_Department
FOREIGN KEY (department_ID) REFERENCES department(department_ID);

-- Foreign keys for Class
ALTER TABLE class
ADD CONSTRAINT FK_Class_Subject
FOREIGN KEY (subject_ID) REFERENCES subject(subject_ID),
ADD CONSTRAINT FK_Class_Lecturer
FOREIGN KEY (lecturer_ID) REFERENCES lecturer(lecturer_ID),
ADD CONSTRAINT FK_Class_Semester
FOREIGN KEY (semester_id) REFERENCES semester(semester_id);

-- Foreign keys for Enrollment
ALTER TABLE enrollment
ADD CONSTRAINT FK_Enrollment_Subject
FOREIGN KEY (subject_ID) REFERENCES subject(subject_ID),
ADD CONSTRAINT FK_Enrollment_Student
FOREIGN KEY (student_ID) REFERENCES student(student_ID),
ADD CONSTRAINT FK_Enrollment_Semester
FOREIGN KEY (semester_id) REFERENCES semester(semester_id);

-- Foreign keys for Participation
ALTER TABLE participation
ADD CONSTRAINT FK_Participation_Class
FOREIGN KEY (class_ID) REFERENCES class(class_ID),
ADD CONSTRAINT FK_Participation_Student
FOREIGN KEY (student_ID) REFERENCES student(student_ID),
ADD CONSTRAINT FK_Participation_Semester
FOREIGN KEY (semester_id) REFERENCES semester(semester_id);

-- Foreign key for Certificate
ALTER TABLE certificate
ADD CONSTRAINT FK_Certificate_Lecturer
FOREIGN KEY (lecturer_ID) REFERENCES lecturer(lecturer_ID);


-- --------------------------------------------------------------------------

INSERT INTO semester (semester_id) VALUES
('HK241'),  -- Học kỳ 1 năm 2024
('HK242'),  -- Học kỳ 2 năm 2024
('HK243'),  -- Học kỳ 3 năm 2024
('HK231'),  -- Học kỳ 1 năm 2023
('HK232'),  -- Học kỳ 2 năm 2023
('HK233'),  -- Học kỳ 3 năm 2023
('HK221'),  -- Học kỳ 1 năm 2022
('HK222'),  -- Học kỳ 2 năm 2022
('HK223'),  -- Học kỳ 3 năm 2022
('HK211'),  -- Học kỳ 1 năm 2021
('HK212'),  -- Học kỳ 2 năm 2021
('HK213');  -- Học kỳ 3 năm 2021


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


INSERT INTO Lecturer (Lecturer_ID, username, Password, Email, Address, Full_Name, Phone_Number, Image, Specialization, Department_ID) VALUES
('GV001', 'nguyenvanA', 'password1', 'nva@gmail.com', 'Hà Nội', 'Nguyễn Văn A', '0988000001', 'nva.jpg', 'Kỹ thuật phần mềm', 'K01'),
('GV002', 'lethib', 'password2', 'ltb@gmail.com', 'Hồ Chí Minh', 'Lê Thị B', '0988000002', 'ltb.jpg', 'Mạng máy tính', 'K01'),
('GV003', 'tranvanC', 'password3', 'tvc@gmail.com', 'Đà Nẵng', 'Trần Văn C', '0988000003', 'tvc.jpg', 'Tài chính', 'K02'),
('GV004', 'phamthid', 'password4', 'ptd@gmail.com', 'Hải Phòng', 'Phạm Thị D', '0988000004', 'ptd.jpg', 'Kinh tế', 'K02'),
('GV005', 'buituane', 'password5', 'bte@gmail.com', 'Cần Thơ', 'Bùi Tuấn E', '0988000005', 'bte.jpg', 'Ngữ pháp', 'K04'),
('GV006', 'dinhngocf', 'password6', 'dnf@gmail.com', 'Huế', 'Đinh Ngọc F', '0988000006', 'dnf.jpg', 'Ngữ âm học', 'K04'),
('GV007', 'vudinhg', 'password7', 'vdg@gmail.com', 'Nha Trang', 'Vũ Đình G', '0988000007', 'vdg.jpg', 'Kỹ thuật cơ khí', 'K10'),
('GV008', 'lethiha', 'password8', 'lth@gmail.com', 'Quảng Ninh', 'Lê Thị H', '0988000008', 'lth.jpg', 'Khoa học máy tính', 'K06'),
('GV009', 'phamvani', 'password9', 'pvi@gmail.com', 'Thanh Hóa', 'Phạm Văn I', '0988000009', 'pvi.jpg', 'Y học', 'K05'),
('GV010', 'nguyenthuyj', 'password10', 'ntj@gmail.com', 'Bắc Ninh', 'Nguyễn Thúy J', '0988000010', 'ntj.jpg', 'Luật quốc tế', 'K03');


INSERT INTO Student (Student_ID, username, Password, Email, Full_Name, Phone_Number, Image, Address, department_id) VALUES
('SV001', 'sv001', 'password1', 'sv001@gmail.com', 'Nguyễn Văn X', '0981000001', 'sv001.jpg', 'TP Hồ Chí Minh','K01'),
('SV002', 'sv002', 'password2', 'sv002@gmail.com', 'Lê Thị Y', '0981000002', 'sv002.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV003', 'sv003', 'password3', 'sv003@gmail.com', 'Trần Văn Z', '0981000003', 'sv003.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV004', 'sv004', 'password4', 'sv004@gmail.com', 'Phạm Văn M', '0981000004', 'sv004.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV005', 'sv005', 'password5', 'sv005@gmail.com', 'Bùi Thị N', '0981000005', 'sv005.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV006', 'sv006', 'password6', 'sv006@gmail.com', 'Đinh Tuấn O', '0981000006', 'sv006.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV007', 'sv007', 'password7', 'sv007@gmail.com', 'Vũ Ngọc P', '0981000007', 'sv007.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV008', 'sv008', 'password8', 'sv008@gmail.com', 'Phạm Tuấn Q', '0981000008', 'sv008.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV009', 'sv009', 'password9', 'sv009@gmail.com', 'Nguyễn Văn R', '0981000009', 'sv009.jpg', 'TP Hồ Chí Minh', 'K01'),
('SV010', 'sv010', 'password10', 'sv010@gmail.com', 'Lê Văn S', '0981000010', 'sv010.jpg', 'TP Hồ Chí Minh', 'K01');


INSERT INTO Administrator (Admin_ID, username, Password, Email, Address, Full_Name, Phone_Number, Image) VALUES
('QT001', 'qt001', 'password1', 'qt001@gmail.com', 'Hà Nội', 'Nguyễn Văn A', '0982000001', 'qt001.jpg'),
('QT002', 'qt002', 'password2', 'qt002@gmail.com', 'Hồ Chí Minh', 'Trần Văn B', '0982000002', 'qt002.jpg'),
('QT003', 'qt003', 'password3', 'qt003@gmail.com', 'Đà Nẵng', 'Lê Thị C', '0982000003', 'qt003.jpg'),
('QT004', 'qt004', 'password4', 'qt004@gmail.com', 'Hải Phòng', 'Bùi Văn D', '0982000004', 'qt004.jpg'),
('QT005', 'qt005', 'password5', 'qt005@gmail.com', 'Huế', 'Phạm Văn E', '0982000005', 'qt005.jpg'),
('QT006', 'qt006', 'password6', 'qt006@gmail.com', 'Nha Trang', 'Đinh Thị F', '0982000006', 'qt006.jpg'),
('QT007', 'qt007', 'password7', 'qt007@gmail.com', 'Cần Thơ', 'Vũ Văn G', '0982000007', 'qt007.jpg'),
('QT008', 'qt008', 'password8', 'qt008@gmail.com', 'Quảng Ninh', 'Nguyễn Văn H', '0982000008', 'qt008.jpg'),
('QT009', 'qt009', 'password9', 'qt009@gmail.com', 'Thanh Hóa', 'Lê Thị I', '0982000009', 'qt009.jpg'),
('QT010', 'qt010', 'password10', 'qt010@gmail.com', 'Bắc Ninh', 'Trần Văn J', '0982000010', 'qt010.jpg');


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

INSERT INTO Action_History (Admin_ID, Action_ID, Action_Time, Action_Description) VALUES 
('QT001', 'TT001', '2023-01-01 08:00:00', 'Thao tác 1'),
('QT002', 'TT002', '2023-01-02 08:00:00', 'Thao tác 2'),
('QT003', 'TT003', '2023-01-03 08:00:00', 'Thao tác 3'),
('QT004', 'TT004', '2023-01-04 08:00:00', 'Thao tác 4'),
('QT005', 'TT005', '2023-01-05 08:00:00', 'Thao tác 5'),
('QT006', 'TT006', '2023-01-06 08:00:00', 'Thao tác 6'),
('QT007', 'TT007', '2023-01-07 08:00:00', 'Thao tác 7'),
('QT008', 'TT008', '2023-01-08 08:00:00', 'Thao tác 8'),
('QT009', 'TT009', '2023-01-09 08:00:00', 'Thao tác 9'),
('QT010', 'TT010', '2023-01-10 08:00:00', 'Thao tác 10');


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


INSERT INTO class (class_id, semester_id, schedule, subject_id, lecturer_id) VALUES
('L01', 'HK241', 'Thứ 2, Thứ 4', 'MH001', 'GV001'),
('L02', 'HK241', 'Thứ 3, Thứ 5', 'MH002', 'GV002'),
('L03', 'HK242', 'Thứ 2, Thứ 4', 'MH003', 'GV003'),
('L04', 'HK242', 'Thứ 3, Thứ 5', 'MH004', 'GV004'),
('L05', 'HK243', 'Thứ 2, Thứ 4', 'MH005', 'GV005'),
('L06', 'HK243', 'Thứ 3, Thứ 5', 'MH006', 'GV006'),
('L07', 'HK231', 'Thứ 2, Thứ 4', 'MH007', 'GV007'),
('L08', 'HK231', 'Thứ 3, Thứ 5', 'MH008', 'GV008'),
('L09', 'HK232', 'Thứ 2, Thứ 4', 'MH009', 'GV009'),
('L10', 'HK232', 'Thứ 3, Thứ 5', 'MH010', 'GV010');


INSERT INTO enrollment (subject_id, student_id, semester_id, result) VALUES
('MH001', 'SV001', 'HK241', 'Đạt'),
('MH002', 'SV002', 'HK241', 'Không đạt'),
('MH003', 'SV003', 'HK242', 'Đạt'),
('MH004', 'SV004', 'HK242', 'Không đạt'),
('MH005', 'SV005', 'HK243', 'Đạt'),
('MH006', 'SV006', 'HK243', 'Đạt'),
('MH007', 'SV007', 'HK231', 'Không đạt'),
('MH008', 'SV008', 'HK231', 'Đạt'),
('MH009', 'SV009', 'HK232', 'Không đạt'),
('MH010', 'SV010', 'HK232', 'Đạt');


INSERT INTO Participation (Class_ID, Student_ID, Semester_ID) VALUES
('L01', 'SV001', 'HK241'),  -- Học kỳ 1 năm 2024
('L02', 'SV002', 'HK242'),  -- Học kỳ 2 năm 2024
('L03', 'SV003', 'HK243'),  -- Học kỳ 3 năm 2024
('L04', 'SV004', 'HK231'),  -- Học kỳ 1 năm 2023
('L05', 'SV005', 'HK232'),  -- Học kỳ 2 năm 2023
('L06', 'SV006', 'HK233'),  -- Học kỳ 3 năm 2023
('L07', 'SV007', 'HK221'),  -- Học kỳ 1 năm 2022
('L08', 'SV008', 'HK222'),  -- Học kỳ 2 năm 2022
('L09', 'SV009', 'HK223'),  -- Học kỳ 3 năm 2022
('L10', 'SV010', 'HK211');  -- Học kỳ 1 năm 2021


INSERT INTO Material (Material_ID, Class_ID, Semester_ID, Material_Name) VALUES 
('TL001', 'L01', 'HK241', 'Tài liệu 1'),
('TL002', 'L02', 'HK241', 'Tài liệu 2'),
('TL003', 'L03', 'HK242', 'Tài liệu 3'),
('TL004', 'L04', 'HK242', 'Tài liệu 4'),
('TL005', 'L05', 'HK243', 'Tài liệu 5'),
('TL006', 'L06', 'HK243', 'Tài liệu 6'),
('TL007', 'L07', 'HK231', 'Tài liệu 7'),
('TL008', 'L08', 'HK231', 'Tài liệu 8'),
('TL009', 'L09', 'HK232', 'Tài liệu 9'),
('TL010', 'L10', 'HK232', 'Tài liệu 10');


INSERT INTO Chapter (Chapter_Order, Material_ID, Class_ID, Semester_ID, Title, Text_Content, Video_Content, Image_Content) VALUES
('01', 'TL001', 'L01', 'HK241', 'Chương 1', 'Văn bản 1', 'Video 1', 'Hình ảnh 1'),
('02', 'TL002', 'L02', 'HK241', 'Chương 2', 'Văn bản 2', 'Video 2', 'Hình ảnh 2'),
('03', 'TL003', 'L03', 'HK242', 'Chương 3', 'Văn bản 3', 'Video 3', 'Hình ảnh 3'),
('04', 'TL004', 'L04', 'HK242', 'Chương 4', 'Văn bản 4', 'Video 4', 'Hình ảnh 4'),
('05', 'TL005', 'L05', 'HK243', 'Chương 5', 'Văn bản 5', 'Video 5', 'Hình ảnh 5'),
('06', 'TL006', 'L06', 'HK243', 'Chương 6', 'Văn bản 6', 'Video 6', 'Hình ảnh 6'),
('07', 'TL007', 'L07', 'HK231', 'Chương 7', 'Văn bản 7', 'Video 7', 'Hình ảnh 7'),
('08', 'TL008', 'L08', 'HK231', 'Chương 8', 'Văn bản 8', 'Video 8', 'Hình ảnh 8'),
('09', 'TL009', 'L09', 'HK232', 'Chương 9', 'Văn bản 9', 'Video 9', 'Hình ảnh 9'),
('10', 'TL010', 'L10', 'HK232', 'Chương 10', 'Văn bản 10', 'Video 10', 'Hình ảnh 10');


INSERT INTO exam (exam_id, chapter_order, material_id, class_id, semester_id, exam_name) VALUES
('BKT001', 1, 'TL001', 'L01', 'HK241', 'Bài kiểm tra 1'),
('BKT002', 2, 'TL001', 'L01', 'HK241', 'Bài kiểm tra 2'),
('BKT003', 1, 'TL002', 'L02', 'HK241', 'Bài kiểm tra 3'),
('BKT004', 2, 'TL002', 'L02', 'HK241', 'Bài kiểm tra 4'),
('BKT005', 1, 'TL003', 'L03', 'HK242', 'Bài kiểm tra 5'),
('BKT006', 2, 'TL003', 'L03', 'HK242', 'Bài kiểm tra 6'),
('BKT007', 1, 'TL004', 'L04', 'HK242', 'Bài kiểm tra 7'),
('BKT008', 2, 'TL004', 'L04', 'HK242', 'Bài kiểm tra 8'),
('BKT009', 1, 'TL005', 'L05', 'HK243', 'Bài kiểm tra 9'),
('BKT010', 2, 'TL005', 'L05', 'HK243', 'Bài kiểm tra 10');

INSERT INTO Question (Question_ID, Exam_ID, Chapter_Order, Material_ID, Class_ID, Semester_ID, Question_Content, Student_Answer, Correct_Answer) VALUES
('CH001', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'Thủ đô của Việt Nam là gì?', 'Hà Nội', 'A'),
('CH002', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'Python là gì?', 'Một ngôn ngữ lập trình', 'A'),
('CH003', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'Kết quả của 3 + 5 là bao nhiêu?', '8', 'D'),
('CH004', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'Cấu trúc nào sau đây là của vòng lặp trong Python?', 'for', 'B'),
('CH005', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'Ai là người phát minh ra thuyết tương đối?', 'Albert Einstein', 'A'),
('CH006', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'Quốc gia nào lớn nhất thế giới theo diện tích?', 'Nga', 'A'),
('CH007', 'BKT001', 1, 'TL002', 'L02', 'HK241', 'HTML là gì?', 'Ngôn ngữ đánh dấu siêu văn bản', 'B'),
('CH008', 'BKT001', 1, 'TL002', 'L02', 'HK241', 'Mã quốc gia của Việt Nam là gì?', 'VN', 'C'),
('CH009', 'BKT001', 1, 'TL002', 'L02', 'HK241', 'Ngôn ngữ chính thức của Brazil là gì?', 'Tiếng Bồ Đào Nha', 'D'),
('CH010', 'BKT001', 1, 'TL002', 'L02', 'HK241', 'Cấu trúc dữ liệu nào là một ngăn xếp?', 'Stack', 'C');


-- INSERT INTO Multiple_Choice_Option (Question_ID, Exam_ID, Chapter_Order, Material_ID, Class_ID, Semester_ID, Option_ID, Option_A, Option_B, Option_C, Option_D) VALUES
-- ('CH001', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'LC001', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế'),
-- ('CH002', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'LC002', 'Một ngôn ngữ lập trình', 'Một hệ điều hành', 'Một phần mềm', 'Một thiết bị phần cứng'),
-- ('CH003', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'LC003', '6', '7', '9', '8'),
-- ('CH004', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'LC004', 'if', 'for', 'while', 'def'),
-- ('CH005', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'LC005', 'Albert Einstein', 'Isaac Newton', 'Marie Curie', 'Galileo Galilei'),
-- ('CH006', 'BKT001', 1, 'TL001', 'L01', 'HK241', 'LC006', 'Nga', 'Trung Quốc', 'Mỹ', 'Canada'),
-- ('CH007', 'BKT001', 2, 'TL002', 'L02', 'HK241', 'LC007', 'Ngôn ngữ lập trình', 'Ngôn ngữ đánh dấu siêu văn bản', 'Ngôn ngữ cơ sở dữ liệu', 'Ngôn ngữ xử lý đồ họa'),
-- ('CH008', 'BKT001', 2, 'TL002', 'L02', 'HK241', 'LC008', 'US', 'JP', 'VN', 'KR'),
-- ('CH009', 'BKT001', 2, 'TL002', 'L02', 'HK241', 'LC009', 'Tiếng Tây Ban Nha', 'Tiếng Anh', 'Tiếng Pháp', 'Tiếng Bồ Đào Nha'),
-- ('CH010', 'BKT001', 2, 'TL002', 'L02', 'HK241', 'LC010', 'Queue', 'Array', 'Stack', 'LinkedList');


-- INSERT INTO test_performance (student_id, exam_id, chapter_order, material_id, class_id, semester_id, score, test_date) VALUES 
-- ('SV001', 'BKT001', 1, 'TL001', 'L01', 'HK241', 8, '2023-06-01'),
-- ('SV002', 'BKT002', 2, 'TL001', 'L01', 'HK241', 7, '2023-06-02'),
-- ('SV003', 'BKT003', 1, 'TL002', 'L02', 'HK241', 9, '2023-06-03'),
-- ('SV004', 'BKT004', 2, 'TL002', 'L02', 'HK241', 6, '2023-06-04'),
-- ('SV005', 'BKT005', 1, 'TL003', 'L03', 'HK242', 10, '2023-06-05'),
-- ('SV006', 'BKT006', 2, 'TL003', 'L03', 'HK242', 8, '2023-06-06'),
-- ('SV007', 'BKT007', 1, 'TL004', 'L04', 'HK242', 7, '2023-06-07'),
-- ('SV008', 'BKT008', 2, 'TL004', 'L04', 'HK242', 9, '2023-06-08'),
-- ('SV009', 'BKT009', 1, 'TL005', 'L05', 'HK243', 6, '2023-06-09'),
-- ('SV010', 'BKT010', 2, 'TL005', 'L05', 'HK243', 10, '2023-06-10');






