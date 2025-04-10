import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const { accessToken, userRole } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        {!(userRole.includes(2001) || userRole.includes(1984)) && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
      <ul className="navbar-ul">
        <li>
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link to="/auth?mode=login" className="login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
