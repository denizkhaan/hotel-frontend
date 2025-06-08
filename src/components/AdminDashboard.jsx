import React, { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminReservations from "./AdminReservations";
import AdminLayout from "./AdminLayout";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <AdminLayout></AdminLayout>
    
  );
}
