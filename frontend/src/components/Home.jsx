import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setData(data.filter((post) => post.id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Home Page</h1>
      <div className="post">
        {data.map((post) => (
          <ul className="list-unstyled" key={post.id}>
            <li className="fs-5 fw-bold">First Name:{post.firstname}</li>
            <li className="fs-5 fw-bold">Last Name:{post.lastname}</li>
            <li className="fs-5 fw-bold">Phone: {post.phone}</li>
            <li className="fs-5 fw-bold">Email:{post.email}</li>
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
  );
};

export default Home;
