import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold text-white text-decoration-none" to="/">
        🏨 Booksy.com
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {isLoggedIn ? (
            role === "admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/reservations">Reservations</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservations">My Reservations</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/edit-profile">Edit Profile</Link>
                </li>
              </>
            )
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <button className="btn btn-danger ms-auto" onClick={handleLogout}>
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}
