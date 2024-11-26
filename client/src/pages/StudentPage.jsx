import { Outlet } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthProvider";
import SideBar from "../components/Sidebar/Sidebar";

const TestPage = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <div className="flex max-w-[unset] items-start justify-center py-14 gap-4">
        <div className="w-[250px]">
          <SideBar type={`${user.role}`} />
        </div>
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TestPage;
