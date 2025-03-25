import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const isLogin = searchParams.get("mode") !== "signup";
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const user = formData.get("email");
    const pw = formData.get("password");
    const confirmPw = formData.get("confirmPassword");

    if (!isLogin && pw !== confirmPw) {
      return setError("Passwords do not match");
    }

    try {
      const backendUrl = "http://localhost:3000";
      const url = isLogin ? `${backendUrl}/auth` : `${backendUrl}/register`;
      const response = await axios.post(
        url,
        { user, pw },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (isLogin) {
        setAccessToken(response.data.accessToken);
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
