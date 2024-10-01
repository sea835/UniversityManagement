CREATE DATABASE university_management;

-- Kết nối với database university_management
USE university_management;

SET SQL_SAFE_UPDATES = 0;

-- Tạo bảng Khoa
CREATE TABLE Khoa (
    Ma_khoa VARCHAR(50) PRIMARY KEY,
    Ten_khoa VARCHAR(100)
);

-- Tạo bảng Giang_vien
CREATE TABLE Giang_vien (
    Ma_so VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Dia_chi VARCHAR(150),
    Ho_ten VARCHAR(100),
    SDT VARCHAR(15),
    Hinh_anh VARCHAR(255),
    Chuyen_Mon VARCHAR(100),
    Ma_khoa VARCHAR(50)
);

-- Tạo bảng Sinh_vien
CREATE TABLE Sinh_vien (
    Ma_so VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Ho_ten VARCHAR(100),
    SDT VARCHAR(15),
    Hinh_anh VARCHAR(255)
);

-- Tạo bảng Quan_tri_vien
CREATE TABLE Quan_tri_vien (
    Ma_so VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    Password VARCHAR(100),
    Email VARCHAR(100),
    Dia_chi VARCHAR(150),
    Ho_ten VARCHAR(100),
    SDT VARCHAR(15),
    Hinh_anh VARCHAR(255)
);

-- Tạo bảng Lich_su_thao_tac
CREATE TABLE Lich_su_thao_tac (
    Ma_so_quan_tri_vien VARCHAR(50),
    Ma_thao_tac VARCHAR(50),
    Thoi_gian DATETIME,
    Thao_tac VARCHAR(255),
    PRIMARY KEY (Ma_so_quan_tri_vien, Ma_thao_tac)
);

-- Tạo bảng Mon_hoc
CREATE TABLE Mon_hoc (
    Ma_mon_hoc VARCHAR(50) PRIMARY KEY,
    Ten_mon_hoc VARCHAR(100),
    So_tin_chi INT,
    Dieu_kien_tien_quyet VARCHAR(255),
    Yeu_cau_dau_ra VARCHAR(255),
    Ma_khoa VARCHAR(50)
);

-- Tạo bảng Lop_hoc
CREATE TABLE Lop_hoc (
    Ma_lop VARCHAR(50) PRIMARY KEY,
    Ngay_bat_dau DATE,
    Ngay_ket_thuc DATE,
    Lich_hoc VARCHAR(255),
    Ma_mon_hoc VARCHAR(50),
    Ma_giang_vien VARCHAR(50)
);

-- Tạo bảng Hoc_phi
CREATE TABLE Hoc_phi (
    Ma_hoc_phi VARCHAR(50) PRIMARY KEY,
    Trang_thai VARCHAR(50),
    So_tien DECIMAL(15, 2),
    Ma_sinh_vien VARCHAR(50)
);

-- Tạo bảng Dang_ky
CREATE TABLE Dang_ky (
    Ma_mon_hoc VARCHAR(50),
    Ma_sinh_vien VARCHAR(50),
    Ket_qua VARCHAR(50),
    PRIMARY KEY (Ma_mon_hoc, Ma_sinh_vien)
);

-- Tạo bảng Tham_gia
CREATE TABLE Tham_gia (
    Ma_lop_hoc VARCHAR(50),
    Ma_sinh_vien VARCHAR(50),
    PRIMARY KEY (Ma_lop_hoc, Ma_sinh_vien)
);

-- Tạo bảng Chung_chi
CREATE TABLE Chung_chi (
    Ma_chung_chi VARCHAR(50),
    Ma_giang_vien VARCHAR(50),
    PRIMARY KEY (Ma_chung_chi)
);

-- Tạo bảng Bai_kiem_tra
CREATE TABLE Bai_kiem_tra (
    Ma_bai_kiem_tra VARCHAR(50) PRIMARY KEY,
    Ten_bai_kiem_tra VARCHAR(255)
);

-- Tạo bảng Cau_hoi
CREATE TABLE Cau_hoi (
    Ma_cau_hoi VARCHAR(50),
    Ma_bai_kiem_tra VARCHAR(50),
    Noi_dung_cau_hoi VARCHAR(255),
    Cau_tra_loi_cua_sinh_vien VARCHAR(255),
    Dap_an VARCHAR(255),
    PRIMARY KEY (Ma_cau_hoi, Ma_bai_kiem_tra)
);

-- Tạo bảng Lua_chon_trac_nghiem
CREATE TABLE Lua_chon_trac_nghiem (
    Ma_cau_hoi VARCHAR(50),
    Ma_bai_kiem_tra VARCHAR(50),
    Ma_lua_chon VARCHAR(50),
    Lua_chon_A VARCHAR(255),
    Lua_chon_B VARCHAR(255),
    Lua_chon_C VARCHAR(255),
    Lua_chon_D VARCHAR(255),
    PRIMARY KEY (Ma_cau_hoi, Ma_bai_kiem_tra, Ma_lua_chon)
);

-- Tạo bảng Thuc_hien_kiem_tra
CREATE TABLE Thuc_hien_kiem_tra (
    Ma_sinh_vien VARCHAR(50),
    Ma_bai_kiem_tra VARCHAR(50),
    Diem DECIMAL(5, 2),
    Ngay_kiem_tra DATE,
    PRIMARY KEY (Ma_sinh_vien, Ma_bai_kiem_tra)
);

-- Tạo bảng Tai_lieu
CREATE TABLE Tai_lieu (
    Ma_tai_lieu VARCHAR(50) PRIMARY KEY,
    Ma_lop VARCHAR(50),
    Ten_tai_lieu VARCHAR(255)
);

-- Tạo bảng Chuong
CREATE TABLE Chuong (
    So_thu_tu INT PRIMARY KEY,
    Ma_tai_lieu VARCHAR(50),
    Ma_lop VARCHAR(50),
    Tieu_de VARCHAR(255),
    Noi_dung_van_ban TEXT,
    Noi_dung_video TEXT,
    Noi_dung_hinh_anh TEXT
);

-- Tạo bảng Bai_tap_ung_dung
CREATE TABLE Bai_tap_ung_dung (
    So_thu_tu_chuong INT,
    Ma_tai_lieu VARCHAR(50),
    Ma_lop VARCHAR(50),
    Ma_bai_tap_ung_dung VARCHAR(50),
    Bai_tap_ung_dung TEXT,
    PRIMARY KEY (So_thu_tu_chuong, Ma_tai_lieu, Ma_lop, Ma_bai_tap_ung_dung)
);

-- Thêm khóa ngoại vào bảng Giang_vien
ALTER TABLE Giang_vien 
ADD CONSTRAINT FK_Giang_vien_Khoa
FOREIGN KEY (Ma_khoa) REFERENCES Khoa(Ma_khoa);

-- Thêm khóa ngoại vào bảng Lop_hoc
ALTER TABLE Lop_hoc 
ADD CONSTRAINT FK_Lop_hoc_Mon_hoc
FOREIGN KEY (Ma_mon_hoc) REFERENCES Mon_hoc(Ma_mon_hoc);

ALTER TABLE Lop_hoc 
ADD CONSTRAINT FK_Lop_hoc_Giang_vien
FOREIGN KEY (Ma_giang_vien) REFERENCES Giang_vien(Ma_so);

-- Thêm khóa ngoại vào bảng Hoc_phi
ALTER TABLE Hoc_phi 
ADD CONSTRAINT FK_Hoc_phi_Sinh_vien
FOREIGN KEY (Ma_sinh_vien) REFERENCES Sinh_vien(Ma_so);

-- Thêm khóa ngoại vào bảng Dang_ky
ALTER TABLE Dang_ky 
ADD CONSTRAINT FK_Dang_ky_Mon_hoc
FOREIGN KEY (Ma_mon_hoc) REFERENCES Mon_hoc(Ma_mon_hoc);

ALTER TABLE Dang_ky 
ADD CONSTRAINT FK_Dang_ky_Sinh_vien
FOREIGN KEY (Ma_sinh_vien) REFERENCES Sinh_vien(Ma_so);

-- Thêm khóa ngoại vào bảng Tham_gia
ALTER TABLE Tham_gia 
ADD CONSTRAINT FK_Tham_gia_Lop_hoc
FOREIGN KEY (Ma_lop_hoc) REFERENCES Lop_hoc(Ma_lop);

ALTER TABLE Tham_gia 
ADD CONSTRAINT FK_Tham_gia_Sinh_vien
FOREIGN KEY (Ma_sinh_vien) REFERENCES Sinh_vien(Ma_so);

-- Thêm khóa ngoại vào bảng Chung_chi
ALTER TABLE Chung_chi 
ADD CONSTRAINT FK_Chung_chi_Giang_vien
FOREIGN KEY (Ma_giang_vien) REFERENCES Giang_vien(Ma_so);

-- Thêm khóa ngoại vào bảng Cau_hoi
ALTER TABLE Cau_hoi 
ADD CONSTRAINT FK_Cau_hoi_Bai_kiem_tra
FOREIGN KEY (Ma_bai_kiem_tra) REFERENCES Bai_kiem_tra(Ma_bai_kiem_tra);

-- Thêm khóa ngoại vào bảng Lua_chon_trac_nghiem
ALTER TABLE Lua_chon_trac_nghiem 
ADD CONSTRAINT FK_Lua_chon_Cau_hoi
FOREIGN KEY (Ma_cau_hoi) REFERENCES Cau_hoi(Ma_cau_hoi);


-- --------------------------------------------------------------------------
-- --------------------------------------------------------------------------

INSERT INTO Khoa (Ma_khoa, Ten_khoa) VALUES 
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


INSERT INTO Giang_vien (Ma_so, username, Password, Email, Dia_chi, Ho_ten, SDT, Hinh_anh, Chuyen_Mon, Ma_khoa) VALUES 
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


INSERT INTO Sinh_vien (Ma_so, username, Password, Email, Ho_ten, SDT, Hinh_anh) VALUES 
('SV001', 'sv001', 'password1', 'sv001@gmail.com', 'Nguyễn Văn X', '0981000001', 'sv001.jpg'),
('SV002', 'sv002', 'password2', 'sv002@gmail.com', 'Lê Thị Y', '0981000002', 'sv002.jpg'),
('SV003', 'sv003', 'password3', 'sv003@gmail.com', 'Trần Văn Z', '0981000003', 'sv003.jpg'),
('SV004', 'sv004', 'password4', 'sv004@gmail.com', 'Phạm Văn M', '0981000004', 'sv004.jpg'),
('SV005', 'sv005', 'password5', 'sv005@gmail.com', 'Bùi Thị N', '0981000005', 'sv005.jpg'),
('SV006', 'sv006', 'password6', 'sv006@gmail.com', 'Đinh Tuấn O', '0981000006', 'sv006.jpg'),
('SV007', 'sv007', 'password7', 'sv007@gmail.com', 'Vũ Ngọc P', '0981000007', 'sv007.jpg'),
('SV008', 'sv008', 'password8', 'sv008@gmail.com', 'Phạm Tuấn Q', '0981000008', 'sv008.jpg'),
('SV009', 'sv009', 'password9', 'sv009@gmail.com', 'Nguyễn Văn R', '0981000009', 'sv009.jpg'),
('SV010', 'sv010', 'password10', 'sv010@gmail.com', 'Lê Văn S', '0981000010', 'sv010.jpg');


INSERT INTO Quan_tri_vien (Ma_so, username, Password, Email, Dia_chi, Ho_ten, SDT, Hinh_anh) VALUES 
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


INSERT INTO Lich_su_thao_tac (Ma_so_quan_tri_vien, Ma_thao_tac, Thoi_gian, Thao_tac) VALUES 
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


INSERT INTO Mon_hoc (Ma_mon_hoc, Ten_mon_hoc, So_tin_chi, Dieu_kien_tien_quyet, Yeu_cau_dau_ra, Ma_khoa) VALUES 
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


INSERT INTO Lop_hoc (Ma_lop, Ngay_bat_dau, Ngay_ket_thuc, Lich_hoc, Ma_mon_hoc, Ma_giang_vien) VALUES 
('L01', '2023-02-01', '2023-05-01', 'Thứ 2, Thứ 4', 'MH001', 'GV001'),
('L02', '2023-02-01', '2023-05-01', 'Thứ 3, Thứ 5', 'MH002', 'GV002'),
('L03', '2023-03-01', '2023-06-01', 'Thứ 2, Thứ 4', 'MH003', 'GV003'),
('L04', '2023-03-01', '2023-06-01', 'Thứ 3, Thứ 5', 'MH004', 'GV004'),
('L05', '2023-04-01', '2023-07-01', 'Thứ 2, Thứ 4', 'MH005', 'GV005'),
('L06', '2023-04-01', '2023-07-01', 'Thứ 3, Thứ 5', 'MH006', 'GV006'),
('L07', '2023-05-01', '2023-08-01', 'Thứ 2, Thứ 4', 'MH007', 'GV007'),
('L08', '2023-05-01', '2023-08-01', 'Thứ 3, Thứ 5', 'MH008', 'GV008'),
('L09', '2023-06-01', '2023-09-01', 'Thứ 2, Thứ 4', 'MH009', 'GV009'),
('L10', '2023-06-01', '2023-09-01', 'Thứ 3, Thứ 5', 'MH010', 'GV010');


INSERT INTO Hoc_phi (Ma_hoc_phi, Trang_thai, So_tien, Ma_sinh_vien) VALUES 
('HP001', 'Đã thanh toán', 1000000, 'SV001'),
('HP002', 'Chưa thanh toán', 1500000, 'SV002'),
('HP003', 'Đã thanh toán', 1200000, 'SV003'),
('HP004', 'Chưa thanh toán', 1300000, 'SV004'),
('HP005', 'Đã thanh toán', 1400000, 'SV005'),
('HP006', 'Đã thanh toán', 1100000, 'SV006'),
('HP007', 'Chưa thanh toán', 1000000, 'SV007'),
('HP008', 'Đã thanh toán', 1500000, 'SV008'),
('HP009', 'Chưa thanh toán', 1200000, 'SV009'),
('HP010', 'Đã thanh toán', 1300000, 'SV010');


INSERT INTO Dang_ky (Ma_mon_hoc, Ma_sinh_vien, Ket_qua) VALUES 
('MH001', 'SV001', 'Đạt'),
('MH002', 'SV002', 'Không đạt'),
('MH003', 'SV003', 'Đạt'),
('MH004', 'SV004', 'Không đạt'),
('MH005', 'SV005', 'Đạt'),
('MH006', 'SV006', 'Đạt'),
('MH007', 'SV007', 'Không đạt'),
('MH008', 'SV008', 'Đạt'),
('MH009', 'SV009', 'Không đạt'),
('MH010', 'SV010', 'Đạt');


INSERT INTO Tham_gia (Ma_lop_hoc, Ma_sinh_vien) VALUES 
('L01', 'SV001'),
('L02', 'SV002'),
('L03', 'SV003'),
('L04', 'SV004'),
('L05', 'SV005'),
('L06', 'SV006'),
('L07', 'SV007'),
('L08', 'SV008'),
('L09', 'SV009'),
('L10', 'SV010');


INSERT INTO Bai_kiem_tra (Ma_bai_kiem_tra, Ten_bai_kiem_tra) VALUES 
('BKT001', 'Bài kiểm tra 1'),
('BKT002', 'Bài kiểm tra 2'),
('BKT003', 'Bài kiểm tra 3'),
('BKT004', 'Bài kiểm tra 4'),
('BKT005', 'Bài kiểm tra 5'),
('BKT006', 'Bài kiểm tra 6'),
('BKT007', 'Bài kiểm tra 7'),
('BKT008', 'Bài kiểm tra 8'),
('BKT009', 'Bài kiểm tra 9'),
('BKT010', 'Bài kiểm tra 10');


INSERT INTO Cau_hoi (Ma_cau_hoi, Ma_bai_kiem_tra, Noi_dung_cau_hoi, Cau_tra_loi_cua_sinh_vien, Dap_an) VALUES 
('CH001', 'BKT001', 'Thủ đô của Việt Nam là gì?', 'Hà Nội', 'A'),
('CH002', 'BKT001', 'Python là gì?', 'Một ngôn ngữ lập trình', 'A'),
('CH003', 'BKT001', 'Kết quả của 3 + 5 là bao nhiêu?', '8', 'D'),
('CH004', 'BKT001', 'Cấu trúc nào sau đây là của vòng lặp trong Python?', 'for', 'B'),
('CH005', 'BKT001', 'Ai là người phát minh ra thuyết tương đối?', 'Albert Einstein', 'A'),
('CH006', 'BKT001', 'Quốc gia nào lớn nhất thế giới theo diện tích?', 'Nga', 'A'),
('CH007', 'BKT001', 'HTML là gì?', 'Ngôn ngữ đánh dấu siêu văn bản', 'B'),
('CH008', 'BKT001', 'Mã quốc gia của Việt Nam là gì?', 'VN', 'C'),
('CH009', 'BKT001', 'Ngôn ngữ chính thức của Brazil là gì?', 'Tiếng Bồ Đào Nha', 'D'),
('CH010', 'BKT001', 'Cấu trúc dữ liệu nào là một ngăn xếp?', 'Stack', 'C');


INSERT INTO Lua_chon_trac_nghiem (Ma_cau_hoi, Ma_bai_kiem_tra, Ma_lua_chon, Lua_chon_A, Lua_chon_B, Lua_chon_C, Lua_chon_D) VALUES 
('CH001', 'BKT001', 'LC001', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế'),
('CH002', 'BKT001', 'LC001', 'Một ngôn ngữ lập trình', 'Một hệ điều hành', 'Một phần mềm', 'Một thiết bị phần cứng'),
('CH003', 'BKT001', 'LC001', '6', '7', '9', '8'),
('CH004', 'BKT001', 'LC001', 'if', 'for', 'while', 'def'),
('CH005', 'BKT001', 'LC001', 'Albert Einstein', 'Isaac Newton', 'Marie Curie', 'Galileo Galilei'),
('CH006', 'BKT001', 'LC001', 'Nga', 'Trung Quốc', 'Mỹ', 'Canada'),
('CH007', 'BKT001', 'LC001', 'Ngôn ngữ lập trình', 'Ngôn ngữ đánh dấu siêu văn bản', 'Ngôn ngữ cơ sở dữ liệu', 'Ngôn ngữ xử lý đồ họa'),
('CH008', 'BKT001', 'LC001', 'US', 'JP', 'VN', 'KR'),
('CH009', 'BKT001', 'LC001', 'Tiếng Tây Ban Nha', 'Tiếng Anh', 'Tiếng Pháp', 'Tiếng Bồ Đào Nha'),
('CH010', 'BKT001', 'LC001', 'Queue', 'Array', 'Stack', 'LinkedList');


INSERT INTO Thuc_hien_kiem_tra (Ma_sinh_vien, Ma_bai_kiem_tra, Diem, Ngay_kiem_tra) VALUES 
('SV001', 'BKT001', 8, '2023-06-01'),
('SV002', 'BKT002', 7, '2023-06-02'),
('SV003', 'BKT003', 9, '2023-06-03'),
('SV004', 'BKT004', 6, '2023-06-04'),
('SV005', 'BKT005', 10, '2023-06-05'),
('SV006', 'BKT006', 8, '2023-06-06'),
('SV007', 'BKT007', 7, '2023-06-07'),
('SV008', 'BKT008', 9, '2023-06-08'),
('SV009', 'BKT009', 6, '2023-06-09'),
('SV010', 'BKT010', 10, '2023-06-10');


INSERT INTO Chung_chi (Ma_chung_chi, Ma_giang_vien) VALUES 
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


INSERT INTO Tai_lieu (Ma_tai_lieu, Ma_lop, Ten_tai_lieu) VALUES 
('TL001', 'L01', 'Tài liệu 1'),
('TL002', 'L02', 'Tài liệu 2'),
('TL003', 'L03', 'Tài liệu 3'),
('TL004', 'L04', 'Tài liệu 4'),
('TL005', 'L05', 'Tài liệu 5'),
('TL006', 'L06', 'Tài liệu 6'),
('TL007', 'L07', 'Tài liệu 7'),
('TL008', 'L08', 'Tài liệu 8'),
('TL009', 'L09', 'Tài liệu 9'),
('TL010', 'L10', 'Tài liệu 10');


INSERT INTO Chuong (So_thu_tu, Ma_tai_lieu, Ma_lop, Tieu_de, Noi_dung_van_ban, Noi_dung_video, Noi_dung_hinh_anh) VALUES 
('01', 'TL001', 'L01', 'Chương 1', 'Văn bản 1', 'Video 1', 'Hình ảnh 1'),
('02', 'TL002', 'L02', 'Chương 2', 'Văn bản 2', 'Video 2', 'Hình ảnh 2'),
('03', 'TL003', 'L03', 'Chương 3', 'Văn bản 3', 'Video 3', 'Hình ảnh 3'),
('04', 'TL004', 'L04', 'Chương 4', 'Văn bản 4', 'Video 4', 'Hình ảnh 4'),
('05', 'TL005', 'L05', 'Chương 5', 'Văn bản 5', 'Video 5', 'Hình ảnh 5'),
('06', 'TL006', 'L06', 'Chương 6', 'Văn bản 6', 'Video 6', 'Hình ảnh 6'),
('07', 'TL007', 'L07', 'Chương 7', 'Văn bản 7', 'Video 7', 'Hình ảnh 7'),
('08', 'TL008', 'L08', 'Chương 8', 'Văn bản 8', 'Video 8', 'Hình ảnh 8'),
('09', 'TL009', 'L09', 'Chương 9', 'Văn bản 9', 'Video 9', 'Hình ảnh 9'),
('10', 'TL010', 'L10', 'Chương 10', 'Văn bản 10', 'Video 10', 'Hình ảnh 10');


INSERT INTO Bai_tap_ung_dung (So_thu_tu_chuong, Ma_tai_lieu, Ma_lop, Ma_bai_tap_ung_dung) VALUES 
('01', 'TL001', 'L01', 'BTUD001'),
('02', 'TL002', 'L02', 'BTUD002'),
('03', 'TL003', 'L03', 'BTUD003'),
('04', 'TL004', 'L04', 'BTUD004'),
('05', 'TL005', 'L05', 'BTUD005'),
('06', 'TL006', 'L06', 'BTUD006'),
('07', 'TL007', 'L07', 'BTUD007'),
('08', 'TL008', 'L08', 'BTUD008'),
('09', 'TL009', 'L09', 'BTUD009'),
('10', 'TL010', 'L10', 'BTUD010');







