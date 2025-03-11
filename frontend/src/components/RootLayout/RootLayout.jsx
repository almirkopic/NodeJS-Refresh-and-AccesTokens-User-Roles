import React from "react";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
