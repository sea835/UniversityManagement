import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import axios from 'axios';
import { mockCourses } from '../mockCourses';

const RegisterCourse = () => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroupId, setExpandedGroupId] = useState(null); // State to track the currently expanded group

  useEffect(() => {
      

    // Set the sample courses in state
    setCourses(mockCourses);
  }, []);

  // Function to handle course registration
  const handleRegister = (course, groupId) => {
    const alreadyRegisteredCourse = registeredCourses.find((c) => c.courseId === course.courseId);

    if (alreadyRegisteredCourse) {
      showMessage('Bạn chỉ được đăng kí 1 lớp cho mỗi môn học!', 'error');
      return;
    }

    // Lấy thông tin nhóm đã chọn
    const selectedGroup = course.groups.find(group => group.groupId === groupId);

    // Kiểm tra trùng lịch học
    const isScheduleConflict = registeredCourses.some((registeredCourse) => {
      const registeredGroup = registeredCourse.groups.find(group => group.groupId === registeredCourse.groupId);

      // Tách tuần học của khóa học mới và khóa học đã đăng ký
      const selectedWeeks = selectedGroup.week.split('-'); // Tách tuần học của khóa học mới
      const registeredWeeks = registeredGroup.week.split('-'); // Tách tuần học của khóa học đã đăng ký

      // Kiểm tra xem có bất kỳ tuần nào trùng nhau không
      const isSameWeek = selectedWeeks.some(selectedWeek => registeredWeeks.includes(selectedWeek));

      return registeredGroup.day === selectedGroup.day &&
             isSameWeek; // Kiểm tra ngày và tuần học
    });

    if (isScheduleConflict) {
      showMessage('Không thể đăng ký khóa học này vì trùng lịch học với khóa học đã đăng ký!', 'error');
      return;
    }

    // Handle prerequisites
    if (course.prerequisites !== 'None') {
      const prerequisiteCourse = registeredCourses.find(
        (c) => c.courseId === course.prerequisites
      );

      if (!prerequisiteCourse) {
        showMessage(
          `Không thể đăng ký khóa học ${course.courseName}. Bạn cần hoàn thành khóa học ${course.prerequisites} trước.`,
          'error'
        );
        return;
      }
    }

    setRegisteredCourses((prev) => [
      ...prev,
      { ...course, ...selectedGroup },
    ]);
    showMessage(`Đăng ký thành công lớp: ${groupId} của khóa học: ${course.courseName}`, 'success');
  };

  // Function to handle course unregistration
  const handleUnregister = (courseId) => {
    setRegisteredCourses((prev) =>
      prev.filter((c) => c.courseId !== courseId)
    );
    showMessage(`Hủy đăng ký thành công lớp của khóa học: ${courseId}`, 'error');
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // updateStudentSchedule(course, groupId);

  // Filtering logic
  const filteredCourses = courses.filter(
    (course) =>
      course.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleGroupExpansion = (groupId) => {
    // Nếu nhóm đã mở thì đóng nó, nếu không thì mở nhóm mới
    setExpandedGroupId(prev => (prev === groupId ? null : groupId));
  };

  return (
    <div className="min ```javascript
-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Đăng Ký Khóa Học
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học (mã hoặc tên)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                {['CourseID', 'CourseName', 'Credits', 'Action'].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <React.Fragment key={course.courseId}>
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {course.courseId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {course.courseName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {course.numberOfCredits}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1 rounded-md"
                        onClick={() => toggleGroupExpansion(course.courseId)}
                      >
                        {expandedGroupId === course.courseId ? 'Ẩn Lớp' : 'Xem Lớp'}
                      </button>
                    </td>
                  </tr>

                  {expandedGroupId === course.courseId && (
                    <tr>
                      <td colSpan={4} className="border-t border-gray-300">
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Lớp học cho môn: {course.courseName}
                          </h3>
                          <table className="min-w-full border-collapse border border-gray-300 rounded-md">
                            <thead className="bg-gray-200">
                              <tr>
                                {['GroupID', 'Teacher', 'Day', 'Week', 'Action'].map((header) => (
                                  <th
                                    key={header}
                                    className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 text-left"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {course.groups.map((group) => (
                                <tr key={group.groupId} className="hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-2 text-sm">
                                    {group.groupId}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-sm">
                                    {group.teacher}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-sm">
                                    {group.day}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-sm">
                                    {group.week}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-sm">
                                    {!registeredCourses.find((c) => c.courseId === course.courseId) && (
                                      <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py- 1 rounded-md"
                                        onClick={() => handleRegister(course, group.groupId)}
                                      >
                                        Đăng Ký
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Danh sách lớp đã đăng ký
          </h3>
          <table className="min-w-full border-collapse border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                {['CourseID', 'CourseName', 'GroupID', 'Teacher', 'Day', 'Week'].map(
                  (header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 text-left"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {registeredCourses.map((course) => (
                <tr key={course.courseId} className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 px-4 py-2 text-sm">{course.courseId}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{course.courseName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{course.groupId}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{course.teacher}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{course.day}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{course.week}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {registeredCourses.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Hủy Đăng Ký Khóa Học
              </h4>
              {registeredCourses.map((course) => (
                <div key={course.courseId} className="flex items-center justify-between mb-2">
                  <span>{course.courseName} - {course.groupId}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1 rounded-md"
                    onClick={() => handleUnregister(course.courseId)}
                  >
                    Hủy Đăng Ký
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterCourse;