import React from "react";
import {
  useSearchParams,
  Form,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";
import InputField from "./AuthInputField";

export default function Authentication() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const buttonText = isLogin ? "Log in" : "Sign up";

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "25rem" }}>
        <Form className="needs-validation" method="post" noValidate>
          <div className="d-flex justify-content-end">
            <Link to="/" className="btn-close"></Link>
          </div>
          <h2 className="text-center mb-3">{isLogin ? "Login" : "Sign up"}</h2>

          {data?.errors && (
            <ul className="alert alert-danger">
              {Object.values(data.errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}

          {data?.message && (
            <p className="alert alert-danger">{data.message}</p>
          )}

          <InputField
            id="email"
            type="email"
            label="Email"
            autoComplete="email"
            placeholder="username@gmail.com"
            className="form-control"
          />
          <InputField
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            placeholder="password"
            className="form-control"
          />
          {!isLogin && (
            <InputField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              autoComplete="current-password"
              placeholder="Confirm password"
              className="form-control"
            />
          )}

          {isSubmitting && (
            <div className="text-center mt-3">
              <Loader />
            </div>
          )}

          <div className="text-end">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : buttonText}
            </button>

            {/* Centriran tekst sa ispravljenom rečenicom */}
            <p className="text-center mt-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>

            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              className="text-center"
            >
              <button className="btn btn-outline-secondary">
                {isLogin ? "Sign up" : "Back to log in"}
              </button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
