export default function ReservationForm({ reservation, setReservation, makeReservation, hotelInfo }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning fw-semibold">📝 Make Reservation</div>
      <div className="card-body">

        {/* Hotel Info */}
        {hotelInfo && (
          <div className="mb-3">
            <p><strong>🏨 Hotel:</strong> {hotelInfo.hotelName}</p>
            <p><strong>📍 Location:</strong> {hotelInfo.hotelLocation}</p>
            <p><strong>🛏 Room Type:</strong> {hotelInfo.roomType}</p>
            <p><strong>💲 Price per Night:</strong> ${hotelInfo.price}</p>
          </div>
        )}

        <label className="form-label mt-2">Start Date</label>
<input
  type="date"
  className="form-control mb-2"
  value={reservation.startDate}
  onChange={(e) =>
    setReservation({ ...reservation, startDate: e.target.value })
  }
/>

<label className="form-label mt-2">End Date</label>
<input
  type="date"
  className="form-control mb-3"
  value={reservation.endDate}
  onChange={(e) =>
    setReservation({ ...reservation, endDate: e.target.value })
  }
/>


        <button className="btn btn-warning w-100" onClick={makeReservation}>
          Reserve
        </button>
      </div>
    </div>
  );
}
