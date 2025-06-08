import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://hotel-backend-1-txtd.onrender.com/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Email: "", PasswordHash: "" });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, user);
      const token = res.data.token;
      const userId = res.data.user.id;
      const role = res.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: "350px", maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-primary mb-4">Welcome Back</h3>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={user.Email}
            onChange={(e) => setUser({ ...user, Email: e.target.value })}
            placeholder="name@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={user.PasswordHash}
            onChange={(e) => setUser({ ...user, PasswordHash: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don’t have an account? <a href="/register">Register</a>
          </small>
        </div>
      </div>
    </div>
  );
}
