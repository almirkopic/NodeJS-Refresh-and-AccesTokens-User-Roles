import React from "react";
import {
  useSearchParams,
  Form,
  Link,
  useActionData,
  useNavigation,
  redirect,
} from "react-router-dom";
import InputField from "./AuthInputField";
import { useSession } from "../context/SessionContext";

const safeStorage = {
  setItem: (key, value) => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error("Storage error:", error);
    }
  },
  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Storage error:", error);
    }
  },
};

export async function authAction({ request }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  const formData = await request.formData();

  const errors = {};
  const email = formData.get("user");
  const pw = formData.get("pw");
  const confirmPw = formData.get("confirmPw");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (pw.length < 8) {
    errors.pw = "Password must be at least 8 characters";
  }

  if (mode === "signup" && pw !== confirmPw) {
    errors.confirmPw = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const response = await fetch(
      `http://localhost:3000${mode === "login" ? "/auth" : "/register"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user: email, pw }),
        signal: request.signal,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: errorData.errors || { general: errorData.message },
        message: errorData.message || "Authentication failed",
      };
    }

    if (mode === "login") {
      const { accessToken } = await response.json();
      safeStorage.setItem("accessToken", accessToken);
      return redirect("/");
    }

    return redirect("/auth?mode=login&success=true");
  } catch (error) {
    if (error.name === "AbortError") {
      return { errors: { general: "Request aborted" } };
    }
    return { errors: { general: "Network error" } };
  }
}

export default function Authentication() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const { login } = useSession();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  const success = searchParams.get("success");

  React.useEffect(() => {
    if (data?.accessToken) {
      login(data.accessToken);
    }
  }, [data, login]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ width: "25rem", maxWidth: "95vw" }}
      >
        <Form method="post" replace className="needs-validation" noValidate>
          <div className="d-flex justify-content-end">
            <Link to="/" className="btn-close" aria-label="Close" />
          </div>

          <h1 className="h2 text-center mb-4">
            {success
              ? "Registration Successful!"
              : isLogin
              ? "Welcome Back"
              : "Create Account"}
          </h1>

          {success ? (
            <div className="alert alert-success">
              Please check your email to verify your account. Redirecting to
              login...
            </div>
          ) : (
            <>
              <div className="mb-3">
                {data?.errors?.general && (
                  <div className="alert alert-danger" role="alert">
                    {data.errors.general}
                  </div>
                )}

                <InputField
                  id="user"
                  name="user"
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                  required
                  error={data?.errors?.email}
                  autoComplete="email"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <InputField
                  id="pw"
                  name="pw"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  error={data?.errors?.pw}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <InputField
                    id="confirmPw"
                    name="confirmPw"
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    required
                    error={data?.errors?.confirmPw}
                    autoComplete="new-password"
                  />
                </div>
              )}

              <div className="d-grid gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Processing...</span>
                    </>
                  ) : isLogin ? (
                    "Log In"
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <div className="text-center mt-3">
                  <Link
                    to={`?mode=${isLogin ? "signup" : "login"}`}
                    className="text-decoration-none"
                    preventScrollReset
                  >
                    {isLogin
                      ? "Create new account"
                      : "Already have an account? Log in"}
                  </Link>
                </div>
              </div>
            </>
          )}
        </Form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-decoration-none small">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
