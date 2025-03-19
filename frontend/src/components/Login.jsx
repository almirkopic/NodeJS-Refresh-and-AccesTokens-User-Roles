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

export async function authAction({ request }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  const formData = await request.formData();

  // Validacija potvrde lozinke
  if (mode === "signup") {
    const pw = formData.get("pw");
    const confirmPw = formData.get("confirmPw");
    if (pw !== confirmPw) {
      return { errors: { confirmPw: "Passwords do not match" } };
    }
  }

  // Priprema podataka za backend
  const credentials = {
    user: formData.get("user"),
    pw: formData.get("pw"),
  };

  const endpoint = mode === "login" ? "/auth" : "/register";
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { errors: errorData.errors, message: errorData.message };
  }

  if (mode === "login") {
    const { accessToken } = await response.json();
    localStorage.setItem("accessToken", accessToken);
    return redirect("/");
  }

  return redirect("/auth?mode=login");
}

export default function Authentication() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "25rem" }}>
        <Form method="post" replace>
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
            id="user"
            name="user"
            type="email"
            label="Email"
            placeholder="email@example.com"
            className="form-control"
          />

          <InputField
            id="pw"
            name="pw"
            type="password"
            label="Password"
            placeholder="••••••••"
            className="form-control"
          />

          {!isLogin && (
            <InputField
              id="confirmPw"
              name="confirmPw"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              className="form-control"
            />
          )}

          <div className="d-grid gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Sign up"}
            </button>

            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              className="text-center btn btn-link"
            >
              {isLogin ? "Create new account" : "Back to login"}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
