import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../../services/apiService";

const UserDetails = () => {
  const { subject_id, userId } = useParams();

  const [listCore, setListCore] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [subject, setDataSubject] = useState({});
  const [scoresCtrl, setScoresCtrl] = useState([]);

  useEffect(() => {
    setScoresCtrl(() => {
      const scoresArray = listCore.map((item) => item.score || 0.0); // Khởi tạo mảng score, mặc định 0.00 nếu không có
      return scoresArray; // Trả về mảng
    });
  }, [listCore]);

  useEffect(() => {
    console.log(scoresCtrl);
  }, [scoresCtrl]);

  const handleGetClassDetails = async (subject_id, userId) => {
    try {
      const response = await apiService.get(
        `/students/getCore/${subject_id}/${userId}`
      );
      console.log(response.data);
      setListCore(response.data?.dataCore);
      setDataUser(response.data?.dataUser[0]);
      setDataSubject(response.data?.dataSubject[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB").format(date); // DD/MM/YYYY
  };

  const handleScoreChange = (index, newScore) => {
    setScoresCtrl((prevScores) => {
      const updatedScores = [...prevScores]; // Sao chép mảng cũ
      updatedScores[index] = newScore || 0.0; // Cập nhật giá trị tại index, mặc định 0.00 nếu không hợp lệ
      return updatedScores; // Cập nhật state
    });
  };

  const handleUpdateCore = async (id, index) => {
    try {
      const result = await apiService.put(
        `/test_performances/${userId}/${id}`,
        { score: scoresCtrl[index] }
      );
      console.log(result);

      alert("Cập nhật thành công !");
    } catch (error) {
      console.error(error);
      alert("vì điểm từ 0 > 10, không được lớn hơn và nhỏ hơn");
    }
  };

  useEffect(() => {
    handleGetClassDetails(subject_id, userId);
  }, []);
  return (
    <>
      <div className="flex flex-col px-5 py-12 w-full rounded-[30px] bg-white ">
        <div>
          <h2 className="self-start pb-10 text-3xl font-semibold tracking-wide text-black max-md:max-w-full">
            {subject?.subject_name} - {dataUser?.full_name} - MSV:{" "}
            {dataUser?.student_id}
          </h2>
        </div>
        <div className="bg-[#F3F3F3] rounded-[20px]">
          <div className="shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6 text-center">Exam ID</th>
                  <th className="py-3 px-6 text-center">Exam name</th>
                  <th className="py-3 px-6 text-center">Test Date</th>
                  <th className="py-3 px-6 text-center">Score</th>
                  <th className="py-3 px-6 text-center">Tool</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {listCore?.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium w-1/4"
                      style={{ width: "20%", textAlign: "center" }}
                    >
                      <Link>{item.exam_id}</Link>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium w-1/4"
                      style={{ width: "20%", textAlign: "center" }}
                    >
                      <Link>{item.exam_name}</Link>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium w-1/4"
                      style={{ width: "20%", textAlign: "center" }}
                    >
                      {formatDate(item.test_date)}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium w-1/4"
                      style={{ width: "20%", textAlign: "center" }}
                    >
                      <div className="">
                        <input
                          style={{
                            width: 100,
                            textAlign: "center",
                            padding: "6px 12px",
                          }}
                          value={scoresCtrl[index]}
                          onChange={(e) =>
                            handleScoreChange(index, e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <button
                        className="px-2 py-1 text-white"
                        style={{
                          padding: "4px 16px",
                          backgroundColor: "#388E3C",
                        }}
                        onClick={() => handleUpdateCore(item.exam_id, index)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <nav
          className="flex gap-1.5 items-start self-end mt-9 mr-5 text-sm font-semibold whitespace-nowrap text-zinc-800 max-md:mr-2.5"
          aria-label="Pagination"
        >
          <button
            className="px-1 py-2 bg-white rounded-lg min-h-[32px] text-stone-300"
            disabled
          >
            Prev
          </button>
          <button
            className="px-2.5 w-8 h-8 text-white rounded-lg bg-stone-400 min-h-[32px]"
            aria-current="page"
          >
            1
          </button>
          <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
            2
          </button>
          <button className="px-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
            3
          </button>
          <span className="px-2.5 w-8 h-8 bg-white rounded-lg min-h-[32px]">
            ...
          </span>
          <button className="pr-2 pl-2.5 w-8 h-8 bg-white rounded-lg border border-solid border-zinc-100 min-h-[32px]">
            10
          </button>
          <button className="px-1 py-2 bg-white rounded-lg min-h-[32px]">
            Next
          </button>
        </nav> */}
      </div>
    </>
  );
};

export default UserDetails;
