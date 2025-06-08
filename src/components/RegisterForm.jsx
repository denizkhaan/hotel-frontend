import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://hotel-backend-1-txtd.onrender.com/api";

export default function RegisterForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    passwordHash: "",
    role: "User",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/auth/register`, user);
      alert("Registered successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(" Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: "350px", maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-info mb-4">Create Account</h3>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            placeholder="Enter your username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={user.passwordHash}
            onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
          />
        </div>

        <button className="btn btn-info w-100" onClick={register} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account? <a href="/login">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
}
