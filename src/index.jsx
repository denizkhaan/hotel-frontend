import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelReservationApp from "./HotelReservationApp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import ReservationPage from "./components/ReservationPage"; 
import MyReservations from "./components/MyReservations";
import AdminDashboard from "./components/AdminDashboard";
import EditProfile from "./components/EditProfile";
import AdminLayout from "./components/AdminLayout";
import AdminReservations from "./components/AdminReservations";
import AdminUsers from "./components/AdminUsers";
import AdminHotels from "./components/AdminHotels"
import AdminRooms from "./components/AdminRooms"
import LoginForm from "./components/LoginForm";
import VisitRoom from "./components/VisitRoom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HotelReservationApp />} />
      <Route path="/register" element={<RegisterForm />} />
        <Route
  path="/reservations"
  element={
    <ProtectedRoute>
      <MyReservations />
    </ProtectedRoute>
  }
/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/edit-profile"
  element={ 
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
      <Route
  path="/reservation"
  element={
    <ProtectedRoute>
      <ReservationPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="users" element={<AdminUsers />} />
    <Route path="reservations" element={<AdminReservations />} />
    <Route path="rooms" element={<AdminRooms />} />          
  <Route path="hotels" element={<AdminHotels />} />        
  </Route>

<Route path="/login" element={<LoginForm />} />
<Route path="/visit-room" element={<VisitRoom />} />

    </Routes>
  </BrowserRouter>
);





