import React, { useState } from "react";
import axios from "axios";

const API = "https://hotel-backend-1-txtd.onrender.com/api/Hotel";

export default function AdminHotels() {
  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    description: ""
  });

  const handleAddHotel = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/add-hotel`, hotel, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Hotel added successfully");
      setHotel({ name: "", location: "", description: "" });
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Failed to add hotel");
    }
  };

  return (
    <div>
      <h4>Add New Hotel</h4>
      <input
        className="form-control mb-2"
        placeholder="Hotel Name"
        value={hotel.name}
        onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Location"
        value={hotel.location}
        onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Description"
        value={hotel.description}
        onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
      />
      <button className="btn btn-success" onClick={handleAddHotel}>
        Add Hotel
      </button>
    </div>
  );
}
