import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Post = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-md-3">
        <h1 className="text-center mb-4">Post New User</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="firstName" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="lastName" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input type="text" className="form-control" id="phone" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="text" className="form-control" id="email" />
          </div>
        </form>
        <button className="btn btn-primary w-100 mt-3">Submit</button>
      </div>
    </div>
  );
};

export default Post;
