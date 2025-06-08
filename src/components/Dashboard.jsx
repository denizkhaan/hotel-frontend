import React from "react";
import { useNavigate } from "react-router-dom";
import HotelSearch from "./HotelSearch";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToReservations = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    navigate("/reservations");
  };

  const goToEditProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    navigate("/edit-profile");
  };

  // 🆕 triggered by HotelSearch when hotels are loaded
  const handleMakeReservation = (hotelId, room) => {
    navigate("/reservations", {
      state: {
        hotelId: hotelId,
        roomId: room.id,
        roomType: room.roomType,
        price: room.pricePerNight,
      },
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <a className="navbar-brand fw-bold" href="#">
          🏨 HotelPortal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={goToReservations}>
                My Reservations
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={goToEditProfile}>
                Edit Profile
              </button>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome & Hotel Search */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark">Dashboard</h1>
          <p className="lead text-muted">Use the search below to find your perfect stay</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white fw-semibold">🔍 Search Hotels</div>
              <div className="card-body">
                <HotelSearch onMakeReservation={handleMakeReservation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
