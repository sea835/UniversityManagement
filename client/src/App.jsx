import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="container mx-auto w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
