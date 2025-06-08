import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError(" You must be logged in to view reservations.");
      return;
    }

    const API_BASE_URL = "https://hotel-backend-1-txtd.onrender.com";

    axios
      .get(`${API_BASE_URL}/api/Reservation/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async (res) => {
        const reservations = res.data;

        const enriched = await Promise.all(
          reservations.map(async (r) => {
            try {
              const infoRes = await axios.get(`${API_BASE_URL}/api/Hotel/room-info`, {
                params: { roomId: r.roomId, hotelId: r.hotelId },
                headers: { Authorization: `Bearer ${token}` }
              });

              const info = infoRes.data;

              return {
                ...r,
                hotelName: info.hotelName,
                roomType: info.roomType,
                price: info.price
              };
            } catch (e) {
              console.error("Room/hotel info fetch failed:", e);
              return {
                ...r,
                hotelName: "N/A",
                roomType: "N/A",
                price: "N/A"
              };
            }
          })
        );

        setReservations(enriched);
      })
      .catch((err) => {
        console.error("Reservation fetch failed:", err);
        setError(" Failed to load reservations.");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="mb-4 text-primary fw-bold"> My Reservations</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        {!error && reservations.length === 0 && (
          <div className="alert alert-info">ℹ️ You have no reservations yet.</div>
        )}

        {reservations.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Reservation ID</th>
                  <th>Hotel</th>
                  <th>Room Type</th>
                  <th>Price (₺)</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.hotelName}</td>
                    <td>{res.roomType}</td>
                    <td>{res.price}</td>
                    <td>{res.startDate?.slice(0, 10)}</td>
                    <td>{res.endDate?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
