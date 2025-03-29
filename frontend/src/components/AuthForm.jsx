import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_URI = import.meta.env.VITE_API_URL;

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAccessToken, setUserRole } = useAuth();
  const isLogin = searchParams.get("mode") !== "signup";
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!isLogin && password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const url = isLogin ? `${API_URI}/auth` : `${API_URI}/register`;
      const response = await axios.post(
        url,
        { user: email, pw: password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (isLogin) {
        setAccessToken(response.data.accessToken);
        setUserRole(response.data.roles);
        navigate("/");
      } else {
        navigate("/auth?mode=login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} method="POST">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <div className="error-message">{error}</div>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="******"
          required
          minLength="6"
        />

        {!isLogin && (
          <>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="******"
              required
              minLength="6"
            />
          </>
        )}

        <button type="submit">{isLogin ? "Log in" : "Sign up"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="toggle-btn"
            onClick={() =>
              navigate(`/auth?mode=${isLogin ? "signup" : "login"}`)
            }
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
