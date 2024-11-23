import axios from "axios";

// Tạo instance của axios
const apiService = axios.create({
  baseURL: "http://localhost:4000/api", // Base URL cho tất cả các request
  timeout: 10000, // Thời gian chờ (nếu cần)
});

// Thêm interceptor để gắn token tự động
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Hoặc từ bất kỳ nguồn lưu trữ nào khác
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response nếu cần xử lý lỗi chung
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, please log in again.");
      // Xử lý trường hợp hết hạn token hoặc không hợp lệ
    }
    return Promise.reject(error);
  }
);

export default apiService;
