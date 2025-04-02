import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URI = import.meta.env.VITE_API_URL;

const Post = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URI}/posts`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage("Data posted sucesfully.");
      navigate("/");
    } catch (error) {
      setMessage("Error posting data, please try again later.");
      setFormData({ firstname: "", lastname: "", email: "", phone: "" });
    }
  };

  return (
    <div className="form-container">
      {message && <p className="post-error">{message}</p>}

      <form onSubmit={handleSubmit} className="form">
        <p>
          First Name:
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </p>
        <p>
          Last Name:
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </p>
        <p>
          Email:
          <input
            type="email"
            placeholder="example@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        <p>
          Phone Number:
          <input
            type="tel"
            placeholder="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Post;
