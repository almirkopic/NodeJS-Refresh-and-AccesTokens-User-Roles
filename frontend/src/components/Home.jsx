import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <div className="table">
        <ul>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email</li>
          <li>Phone</li>
        </ul>

        <div className="row">
          <li>Jane</li>
          <li>Smith</li>
          <li>jane@example.com</li>
          <li>+987654321</li>
        </div>
        <div className="row">
          <li>Jane</li>
          <li>Smith</li>
          <li>jane@example.com</li>
          <li>+987654321</li>
        </div>
        <div className="row">
          <li>John</li>
          <li>Doe</li>
          <li>john@example.com</li>
          <li>+123456789</li>
        </div>
      </div>
    </div>
  );
};

export default Home;
