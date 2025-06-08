import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelSearchSection from "./components/HotelSearch";
import Navbar from "./components/Navbar";

export default function HotelReservationApp() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">🏨 Explore Hotels</h1>
          <p className="text-muted">Search and find your perfect stay</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <HotelSearchSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
