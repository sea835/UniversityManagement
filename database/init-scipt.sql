CREATE DATABASE university_management;
-- Connect to the university_management database
USE university_management;
SET SQL_SAFE_UPDATES = 0;
-- Create Faculty table
CREATE TABLE Faculty (
    Faculty_ID VARCHAR(50) PRIMARY KEY,
    Faculty_Name VARCHAR(100)
);
-- Create Lecturer table
CREATE TABLE Lecturer (
    Lecturer_ID VARCHAR(50) PRIMARY KEY,
    Username VARCHAR(100),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Address VARCHAR(150),
    Full_Name VARCHAR(100),
    Phone_Number VARCHAR(15),
    Profile_Picture VARCHAR(255),
    Expertise VARCHAR(100),
    Faculty_ID VARCHAR(50)
);
-- Create Student table
CREATE TABLE Student (
    Student_ID VARCHAR(50) PRIMARY KEY,
    Username VARCHAR(100),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Full_Name VARCHAR(100),
    Phone_Number VARCHAR(15),
    Profile_Picture VARCHAR(255),
    Address VARCHAR(150)
);
-- Create Admin table
CREATE TABLE Admin (
    Admin_ID VARCHAR(50) PRIMARY KEY,
    Username VARCHAR(100),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Address VARCHAR(150),
    Full_Name VARCHAR(100),
    Phone_Number VARCHAR(15),
    Profile_Picture VARCHAR(255)
);
-- Create Action_History table
CREATE TABLE Action_History (
    Admin_ID VARCHAR(50),
    Action_ID VARCHAR(50),
    Action_Time DATETIME,
    Action VARCHAR(255),
    PRIMARY KEY (Admin_ID, Action_ID)
);
-- Create Subject table
CREATE TABLE Subject (
    Subject_ID VARCHAR(50) PRIMARY KEY,
    Subject_Name VARCHAR(100),
    Credits INT,
    Prerequisite VARCHAR(255),
    Learning_Outcomes VARCHAR(255),
    Faculty_ID VARCHAR(50)
);
-- Create Class table
CREATE TABLE Class (
    Class_ID VARCHAR(50) PRIMARY KEY,
    Start_Date DATE,
    End_Date DATE,
    Class_Schedule VARCHAR(255),
    Subject_ID VARCHAR(50),
    Lecturer_ID VARCHAR(50)
);
-- Create Tuition table
CREATE TABLE Tuition (
    Tuition_ID VARCHAR(50) PRIMARY KEY,
    Status VARCHAR(50),
    Amount DECIMAL(15, 2),
    Student_ID VARCHAR(50)
);
-- Create Enrollment table
CREATE TABLE Enrollment (
    Subject_ID VARCHAR(50),
    Student_ID VARCHAR(50),
    Result VARCHAR(50),
    PRIMARY KEY (Subject_ID, Student_ID)
);
-- Create Participation table
CREATE TABLE Participation (
    Class_ID VARCHAR(50),
    Student_ID VARCHAR(50),
    PRIMARY KEY (Class_ID, Student_ID)
);
-- Create Certificate table
CREATE TABLE Certificate (
    Certificate_ID VARCHAR(50),
    Lecturer_ID VARCHAR(50),
    PRIMARY KEY (Certificate_ID)
);
-- Create Exam table
CREATE TABLE Exam (
    Exam_ID VARCHAR(50) PRIMARY KEY,
    Exam_Name VARCHAR(255)
);
-- Create Question table
CREATE TABLE Question (
    Question_ID VARCHAR(50),
    Exam_ID VARCHAR(50),
    Question_Content VARCHAR(255),
    Student_Answer VARCHAR(255),
    Correct_Answer VARCHAR(255),
    PRIMARY KEY (Question_ID, Exam_ID)
);
-- Create Multiple_Choice_Option table
CREATE TABLE Multiple_Choice_Option (
    Question_ID VARCHAR(50),
    Exam_ID VARCHAR(50),
    Option_ID VARCHAR(50),
    Option_A VARCHAR(255),
    Option_B VARCHAR(255),
    Option_C VARCHAR(255),
    Option_D VARCHAR(255),
    PRIMARY KEY (Question_ID, Exam_ID, Option_ID)
);
-- Create Exam_Taken table
CREATE TABLE Exam_Taken (
    Student_ID VARCHAR(50),
    Exam_ID VARCHAR(50),
    Score DECIMAL(5, 2),
    Exam_Date DATE,
    PRIMARY KEY (Student_ID, Exam_ID)
);
-- Create Document table
CREATE TABLE Document (
    Document_ID VARCHAR(50) PRIMARY KEY,
    Class_ID VARCHAR(50),
    Document_Name VARCHAR(255)
);
-- Create Chapter table
CREATE TABLE Chapter (
    Chapter_Number INT PRIMARY KEY,
    Document_ID VARCHAR(50),
    Class_ID VARCHAR(50),
    Title VARCHAR(255),
    Text_Content TEXT,
    Video_Content TEXT,
    Image_Content TEXT
);
-- Create Application_Exercise table
CREATE TABLE Application_Exercise (
    Chapter_Number INT,
    Document_ID VARCHAR(50),
    Class_ID VARCHAR(50),
    Exercise_ID VARCHAR(50),
    Exercise_Content TEXT,
    PRIMARY KEY (
        Chapter_Number,
        Document_ID,
        Class_ID,
        Exercise_ID
    )
);
-- Add foreign key to Lecturer table
ALTER TABLE Lecturer
ADD CONSTRAINT FK_Lecturer_Faculty FOREIGN KEY (Faculty_ID) REFERENCES Faculty(Faculty_ID);
-- Add foreign key to Class table
ALTER TABLE Class
ADD CONSTRAINT FK_Class_Subject FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID);
ALTER TABLE Class
ADD CONSTRAINT FK_Class_Lecturer FOREIGN KEY (Lecturer_ID) REFERENCES Lecturer(Lecturer_ID);
-- Add foreign key to Tuition table
ALTER TABLE Tuition
ADD CONSTRAINT FK_Tuition_Student FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID);
-- Add foreign key to Enrollment table
ALTER TABLE Enrollment
ADD CONSTRAINT FK_Enrollment_Subject FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID);
ALTER TABLE Enrollment
ADD CONSTRAINT FK_Enrollment_Student FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID);
-- Add foreign key to Participation table
ALTER TABLE Participation
ADD CONSTRAINT FK_Participation_Class FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID);
ALTER TABLE Participation
ADD CONSTRAINT FK_Participation_Student FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID);
-- Add foreign key to Certificate table
ALTER TABLE Certificate
ADD CONSTRAINT FK_Certificate_Lecturer FOREIGN KEY (Lecturer_ID) REFERENCES Lecturer(Lecturer_ID);
-- Add foreign key to Question table
ALTER TABLE Question
ADD CONSTRAINT FK_Question_Exam FOREIGN KEY (Exam_ID) REFERENCES Exam(Exam_ID);
-- Add foreign key to Multiple_Choice_Option table
ALTER TABLE Multiple_Choice_Option
ADD CONSTRAINT FK_Multiple_Choice_Option_Question FOREIGN KEY (Question_ID) REFERENCES Question(Question_ID);