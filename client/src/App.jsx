import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer  />
    </>
  );
};

export default App;
