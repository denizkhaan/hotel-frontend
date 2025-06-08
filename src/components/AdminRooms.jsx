import React, { useState } from "react";
import axios from "axios";

const API = "https://localhost:7168/api/Hotel";

export default function AdminRooms() {
  const [room, setRoom] = useState({
    hotelId: "",
    roomType: "",
    capacity: "",
    pricePerNight: "",
    roomName: "",
    description: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddRoom = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("hotelId", room.hotelId);
    formData.append("roomType", room.roomType);
    formData.append("capacity", room.capacity);
    formData.append("pricePerNight", room.pricePerNight);
    formData.append("roomName", room.roomName);
    formData.append("description", room.description);
    formData.append("imageFile", selectedFile); // this is a File object

    await axios.post("https://hotel-backend-1-txtd.onrender.com/api/Hotel/add-room-with-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Room added successfully");
  } catch (error) {
    console.error("Error adding room:", error);
    alert("Failed to add room");
  }
};


  return (
    <div className="container mt-4">
      <h4 className="mb-3">Add New Room</h4>
      <input
        className="form-control mb-2"
        placeholder="Hotel ID"
        value={room.hotelId}
        onChange={(e) => setRoom({ ...room, hotelId: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Room Type"
        value={room.roomType}
        onChange={(e) => setRoom({ ...room, roomType: e.target.value })}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Capacity"
        value={room.capacity}
        onChange={(e) => setRoom({ ...room, capacity: e.target.value })}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Price Per Night"
        value={room.pricePerNight}
        onChange={(e) => setRoom({ ...room, pricePerNight: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Room Name"
        value={room.roomName}
        onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Room Description"
        value={room.description}
        onChange={(e) => setRoom({ ...room, description: e.target.value })}
      ></textarea>
      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button className="btn btn-success" onClick={handleAddRoom}>
        Add Room & Upload Image
      </button>
    </div>
  );
}
