import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const res = await axios.get("https://hotel-backend-1-txtd.onrender.com/api/admin/all", { headers });
    setReservations(res.data);
  };

  const deleteReservation = async (id) => {
    await axios.delete(`https://hotel-backend-1-txtd.onrender.com/api/admin/delete-reservation/${id}`, { headers });
   
    fetchReservations();
  };

  const updateReservation = async () => {
    await axios.put(`https://hotel-backend-1-txtd.onrender.com/api/admin/edit-reservation/${selectedReservation.id}`, selectedReservation, { headers });
   
    fetchReservations();
    setSelectedReservation(null);
  };

  return (
    <div>
      <h4 className="mb-3">📋 Reservations</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>User ID</th><th>Hotel ID</th><th>Room ID</th><th>Start</th><th>End</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.userId}</td>
              <td>{r.hotelId}</td>
              <td>{r.roomId}</td>
              <td>{r.startDate?.split("T")[0]}</td>
              <td>{r.endDate?.split("T")[0]}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => setSelectedReservation(r)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteReservation(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReservation && (
        <div className="border p-3">
          <h5>Edit Reservation</h5>
          <input className="form-control mb-2" placeholder="Room ID"
            value={selectedReservation.roomId} onChange={(e) => setSelectedReservation({ ...selectedReservation, roomId: e.target.value })} />
          <input className="form-control mb-2" placeholder="Hotel ID"
            value={selectedReservation.hotelId} onChange={(e) => setSelectedReservation({ ...selectedReservation, hotelId: e.target.value })} />
          <input className="form-control mb-2" type="datetime-local"
            value={selectedReservation.startDate} onChange={(e) => setSelectedReservation({ ...selectedReservation, startDate: e.target.value })} />
          <input className="form-control mb-2" type="datetime-local"
            value={selectedReservation.endDate} onChange={(e) => setSelectedReservation({ ...selectedReservation, endDate: e.target.value })} />
          <button className="btn btn-success" onClick={updateReservation}>Save</button>
        </div>
      )}
    </div>
  );
}
