import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URI = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleChanges, setRoleChanges] = useState({});
  const { api, userRole } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`${API_URI}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  const handleRoleChange = (username, newRole) => {
    setRoleChanges((prev) => ({
      ...prev,
      [username]: [newRole],
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await Promise.all(
        Object.entries(roleChanges).map(([username, roles]) =>
          api.put(`${API_URI}/users/${username}`, { roles })
        )
      );
      setRoleChanges({});
      fetchUsers();
    } catch (err) {
      setError("Failed to update user roles");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="post-error">{error}</div>;
  if (!userRole.includes(5150)) return <div>Access denied.</div>;

  return (
    <div className="dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="search-and-save">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="save-btn-container">
          <button
            onClick={handleSaveChanges}
            className="save-btn"
            disabled={Object.keys(roleChanges).length === 0}
          >
            Save Changes
          </button>
        </div>
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.username} className="user-item">
            <span className="user-email">{user.username}</span>
            <select
              value={roleChanges[user.username]?.[0] || user.roles[0]}
              onChange={(e) => handleRoleChange(user.username, e.target.value)}
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
