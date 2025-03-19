import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

async function refreshToken(navigate) {
  try {
    const response = await fetch("http://localhost:3000/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Token refresh failed");

    const { accessToken } = await response.json();
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    localStorage.removeItem("accessToken");
    navigate("/auth");
    return null;
  }
}

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async (token) => {
    let response = await fetch("http://localhost:3000/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 403) {
      const newToken = await refreshToken(navigate);
      if (newToken) {
        response = await fetch("http://localhost:3000/posts", {
          headers: { Authorization: `Bearer ${newToken}` },
        });
      }
    }

    if (response.ok) {
      const posts = await response.json();
      setData(posts);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/auth");
      return;
    }
    fetchData(token);
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("accessToken");
    navigate("/auth");
  };

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Home Page</h1>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
        <div className="post">
          {data.map((post) => (
            <ul className="list-unstyled" key={post.id}>
              <li className="fs-5 fw-bold">First Name: {post.firstname}</li>
              <li className="fs-5 fw-bold">Last Name: {post.lastname}</li>
              <li className="fs-5 fw-bold">Phone: {post.phone}</li>
              <li className="fs-5 fw-bold">Email: {post.email}</li>
              <button
                onClick={() => deletePost(post.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            </ul>
          ))}
        </div>
      </Container>
    </ProtectedRoute>
  );
};

export default Home;
