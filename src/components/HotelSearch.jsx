import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://hotel-backend-1-txtd.onrender.com/api";

export default function HotelSearchSection() {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    capacity: "",
    roomType: ""
  });

  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const searchHotels = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== "") params.append(key, val);
      });

      const res = await axios.get(`${API}/hotel/list?${params}`);
      setHotels(res.data);
    } catch (err) {
      alert(" Failed to load hotels.");
      console.error(err);
    }
  };

  const handleMakeReservation = (hotelId, room) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/reservation", {
      state: {
        hotelId: hotelId,
        roomId: room.id,
        roomType: room.roomType,
        price: room.pricePerNight
      }
    });
  };

  const handleVisitRoom = (roomId) => {
    navigate("/visit-room", { state: { roomId } });
  };

  return (
    <div className="container my-5">
      {/* Search Form */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white fw-bold">
           Hotel Search
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="📍 Location"
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="💲 Min Price"
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="💲 Max Price"
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="👥 Capacity"
                onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="🛏 Room Type"
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 fw-semibold" onClick={searchHotels}>
                🔎 Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {hotels.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-semibold mb-4"> Search Results</h4>
          <div className="row g-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="col-md-6">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title text-primary mb-1">{hotel.name}</h5>
                    <p className="text-muted mb-2">{hotel.location}</p>
                    {Array.isArray(hotel.rooms) && hotel.rooms.length > 0 ? (
                      <ul className="list-unstyled">
                        {hotel.rooms.map((room) => (
                          <li key={room.id} className="border rounded p-3 mb-2">
                            <div className="fw-semibold">
                              {room.roomType || "Unknown"} | 👥 {room.capacity || "N/A"} |  ${room.pricePerNight ?? "N/A"}
                            </div>
                            <div className="mt-2">
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleMakeReservation(hotel.id, room)}
                              >
                                Reserve
                              </button>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleVisitRoom(room.id)}
                              >
                                 View Room
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted fst-italic">No rooms available for this hotel.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
