import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div className="flex justify-between w-full bg-secondary h-[60px] items-center text-[16px] text-primary font-inria font-bold">
          <h1 className="pl-[43px] text-[48px] italic font-normal font-italiano">
            HaiShan
          </h1>

          <ul className="flex flex-row">
            <li className="">
              <Link to="/home">Home</Link>
            </li>
            <li className="pl-[50px]">
              <Link to="/about">About</Link>
            </li>
            <li className="pl-[50px]">
              <Link to="/course">Course</Link>
            </li>
            <li className="pl-[50px]">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="pl-[50px]">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <div className="w-[500px]"></div>
          <Link to="/login" className="flex justify-end pr-[43px]">
            Login
          </Link>
        </div>
      </header>
    </>
  );
};
