import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="container mx-auto w-[1440px]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
