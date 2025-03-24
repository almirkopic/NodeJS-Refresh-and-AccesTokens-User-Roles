import React from "react";

const Post = () => {
  return (
    <div className="form-container">
      <form action="" className="form">
        <p>
          First Name:
          <input type="text" placeholder="First Name" />
        </p>
        <p>
          Last Name:
          <input type="text" placeholder="Last Name" />
        </p>
        <p>
          Email:
          <input type="email" placeholder="example@email.com" />
        </p>
        <p>
          Phone Number:
          <input type="tel" placeholder="Phone number" />
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Post;
