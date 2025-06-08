import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://hotel-backend-1-txtd.onrender.com/api";

export default function VisitRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const roomId = state?.roomId;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API}/hotel/room/${roomId}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleReservation = () => {
  const token = localStorage.getItem("token"); // or sessionStorage if you use that

  if (!token) {
    navigate("/login"); // Redirect to login
    return;
  }

  if (!room) return;

  navigate("/reservation", {
    state: {
      hotelId: room.hotel?.id,
      roomId: room.id,
      roomType: room.roomType,
      price: room.pricePerNight,
      roomName: room.roomName,
      description: room.description,
      imageUrl: room.imageUrl,
      capacity: room.capacity
    }
  });
};


  if (loading) return <div className="container mt-5">Loading room details...</div>;
  if (!room) return <div className="container mt-5 text-danger">Room not found.</div>;

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">{room.roomName || "Room Details"}</h2>
      <p className="text-muted">{room.description}</p>

      {room.imageUrl && (
        <img
          src={`https://hotel-backend-1-txtd.onrender.com${room.imageUrl}`}

          alt="Room"
          className="img-fluid rounded shadow mb-4"
          style={{ maxHeight: "400px" }}
        />
      )}

      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>Type:</strong> {room.roomType}
        </li>
        <li className="list-group-item">
          <strong>Capacity:</strong> {room.capacity}
        </li>
        <li className="list-group-item">
          <strong>Price per Night:</strong> ${room.pricePerNight}
        </li>
        <li className="list-group-item">
          <strong>Hotel:</strong> {room.hotel?.name} ({room.hotel?.location})
        </li>
        <li className="list-group-item">
          <strong>Hotel Description:</strong> {room.hotel?.description}
        </li>
      </ul>

      <button className="btn btn-success" onClick={handleReservation}>
        Make Reservation
      </button>
    </div>
  );
}
