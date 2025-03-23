// Home.js
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSession } from "../context/SessionContext";
import ProtectedRoute from "./ProtectedRoute";

const Home = () => {
  const [data, setData] = useState([]);
  const { session, checkAuth } = useSession();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        headers: { Authorization: `Bearer ${session.token}` },
      });

      if (response.status === 403) {
        await checkAuth();
        fetchData();
        return;
      }

      if (response.ok) {
        const posts = await response.json();
        setData(posts);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (session?.token) fetchData();
  }, [session]);

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.token}` },
      });

      if (response.status === 403) {
        await checkAuth();
        deletePost(postId);
        return;
      }

      if (response.ok) {
        setData((prev) => prev.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Home Page</h1>
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
