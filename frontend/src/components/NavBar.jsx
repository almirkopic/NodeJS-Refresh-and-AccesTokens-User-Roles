import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./css/NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const NavBar = () => {
  const { logout } = useSession();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("accessToken");
    navigate("/auth");
  };
  return (
    <Navbar expand="lg" className={classes.navbar}>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className={classes.collapse}>
        <Nav className={classes.navLeft}>
          <Nav.Item className={classes.navItem}>
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={classes.navItem}>
            <Nav.Link as={NavLink} to="/post">
              Post
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className={classes.navRight}>
          <Nav.Item className={classes.navItem}>
            <Nav.Link as={NavLink} to="/auth">
              Login
            </Nav.Link>
          </Nav.Item>
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
