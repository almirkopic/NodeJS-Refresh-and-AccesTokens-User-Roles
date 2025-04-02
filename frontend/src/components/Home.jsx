import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const API_URI = import.meta.env.VITE_API_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const [message, setMessage] = useState("");

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
      setMessage("Error while deleting file.");
    }
  };

  const columns = [
    { field: "firstname", headerName: "First Name", flex: 1, minWidth: 150 },
    { field: "lastname", headerName: "Last Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <FaTrash
          className="delete-icon"
          onClick={() => handleDelete(params.row.id)}
          style={{ cursor: "pointer", color: "red" }}
        />
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      {message && <p className="post-error">{message}</p>}
      <Paper className="custom-paper">
        <DataGrid
          rows={posts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.id}
          className="custom-data-grid"
          disableRowSelectionOnClick
        />
      </Paper>
    </div>
  );
};

export default Home;
