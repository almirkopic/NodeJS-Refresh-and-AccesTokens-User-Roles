import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const { accessToken } = useAuth();
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/post">POST</Link>
        </li>
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
