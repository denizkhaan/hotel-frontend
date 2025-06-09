import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";
import axios from "axios";

const API = "https://hotel-backend-1-txtd.onrender.com/api";

export default function ReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { hotelId, roomId, roomType, price } = location.state || {};

  const [reservation, setReservation] = useState({
    userId: localStorage.getItem("userId"),
    hotelId: hotelId || "",
    roomId: roomId || "",
    startDate: "",
    endDate: ""
  });

  const [roomDetails, setRoomDetails] = useState(null);

  // Redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Fetch full room + hotel details
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API}/hotel/room/${roomId}`);
        setRoomDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch room details:", err);
      }
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  const makeReservation = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        userId: reservation.userId,
        hotelId: reservation.hotelId,
        roomId: reservation.roomId,
        startDate: reservation.startDate,
        endDate: reservation.endDate
      };

      await axios.post(`${API}/reservation/make`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

     
      navigate("/reservations");
    } catch (error) {
      console.error("Reservation failed:", error);
      alert("Failed to make reservation.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Make a Reservation</h2>

      {/* Show full room info */}
      {roomDetails ? (
        <div className="mb-4">
          {roomDetails.imageUrl && (
            <img
              src={`https://picsum.photos/200/300`}
              alt="Room"
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "300px" }}
            />
          )}

          <div className="mb-2"><strong>Room Type:</strong> {roomDetails.roomType}</div>
          <div className="mb-2"><strong>Price per Night:</strong> ${roomDetails.pricePerNight}</div>
          <div className="mb-2"><strong>Capacity:</strong> {roomDetails.capacity}</div>
          <div className="mb-2"><strong>Description:</strong> {roomDetails.description}</div>

          <div className="mt-4">
            <h5 className="fw-bold">Hotel Info</h5>
            <div><strong>Name:</strong> {roomDetails.hotel?.name}</div>
            <div><strong>Location:</strong> {roomDetails.hotel?.location}</div>
            <div><strong>Description:</strong> {roomDetails.hotel?.description}</div>
          </div>
        </div>
      ) : (
        <div>Loading room information...</div>
      )}

      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        makeReservation={makeReservation}
      />
    </div>
  );
}
