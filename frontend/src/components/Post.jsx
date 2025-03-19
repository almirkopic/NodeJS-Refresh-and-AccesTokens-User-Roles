import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Post = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePostData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      let response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 403) {
        const newToken = await refreshToken(navigate);
        if (newToken) {
          response = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify(formData),
          });
        }
      }

      if (response.ok) navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <ProtectedRoute>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-3">
          <h1 className="text-center mb-4">Post New User</h1>
          <form onSubmit={handlePostData}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary w-100 mt-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Post;
