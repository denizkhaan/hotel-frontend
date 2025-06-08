import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
const API = "https://localhost:7168/api";

export default function EditProfile() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    passwordHash: "",
    role: ""
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    axios
      .get(`${API}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user:", err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(`${API}/hotel/edit-user/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("Profile updated!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Update failed.");
    }
  };

  return (
    <div>
      <Navbar/>
    
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <div className="form-group mt-4">
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="form-control mb-3"
          value={user.username}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          value={user.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="passwordHash"
          className="form-control mb-3"
          value={user.passwordHash}
          onChange={handleChange}
        />



        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
    </div>
  );
}
