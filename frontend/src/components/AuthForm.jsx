import React from "react";
import { useSearchParams, useNavigation } from "react-router-dom";

const AuthForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLogin = searchParams.get("mode") !== "signup";
  const isSubmitting = navigation.state === "submitting";
  const buttonText = isLogin ? "Log in" : "Sign up";

  const toggleMode = () => {
    setSearchParams({ mode: isLogin ? "signup" : "login" });
  };

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <label>Email:</label>
        <input type="email" placeholder="Enter your email" required />

        <>
          <label>Password:</label>
          <input type="text" placeholder="******" required />
        </>

        {!isLogin && (
          <>
            <label>Confirm Password:</label>
            <input type="text" placeholder="******" required />
          </>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : buttonText}
        </button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" className="toggle-btn" onClick={toggleMode}>
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
