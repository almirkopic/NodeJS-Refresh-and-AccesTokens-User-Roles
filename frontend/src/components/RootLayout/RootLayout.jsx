import React from "react";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RootLayout = () => {
  const { userRole } = useAuth();
  return (
    <div>
      {userRole && <NavBar />}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
