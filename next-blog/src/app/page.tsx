import React from "react";
import connectDB from "../../lib/mongodb";
import AdminDashboard from "./components/AdminDashboard";

export default function page() {
  connectDB();

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
