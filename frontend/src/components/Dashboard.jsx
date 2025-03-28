import React, { useState } from "react";

const Dashboard = () => {
  const users = [
    { email: "user1@example.com", role: "User" },
    { email: "user2@example.com", role: "Editor" },
    { email: "user3@example.com", role: "Admin" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState(users);
  const [selectedRole, setSelectedRole] = useState("User");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (email, newRole) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.email === email ? { ...user, role: newRole } : user
      )
    );
  };

  const filteredUsers = userList.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.email} className="user-item">
            <span className="user-email">{user.email}</span>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.email, e.target.value)}
              className="role-select"
            >
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
