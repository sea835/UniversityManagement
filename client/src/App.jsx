import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-[#E7E7E7] to-[#E6DAC4]">
      <div
        className="container mx-auto w-[1440px] bg-gradient-to-br from-[#E7E7E7] to-[#E6DAC4]"
        style={{ maxWidth: "unset" }}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default App;
