import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const API_URI = import.meta.env.VITE_API_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URI}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [accessToken]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${API_URI}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <div className="table">
        <ul>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email</li>
          <li>Phone</li>
          <li>Actions</li>
        </ul>

        {posts.map((post) => (
          <div className="row" key={post.id}>
            <li>{post.firstname}</li>
            <li>{post.lastname}</li>
            <li>{post.email}</li>
            <li>{post.phone}</li>
            <li className="delete">
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(post.id)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </li>
          </div>
        ))}
        {posts.length === 0 && <div className="no-data">No posts found</div>}
      </div>
    </div>
  );
};

export default Home;
