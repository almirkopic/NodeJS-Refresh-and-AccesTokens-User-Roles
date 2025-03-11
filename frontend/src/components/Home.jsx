import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Home Page</h1>
      <div className="post">
        <ul className="list-unstyled">
          <li className="fs-5 fw-bold">First Name</li>
          <li className="fs-5 fw-bold">Last Name</li>
          <li className="fs-5 fw-bold">Phone</li>
          <li className="fs-5 fw-bold">Email</li>
        </ul>
      </div>
    </Container>
  );
};

export default Home;
