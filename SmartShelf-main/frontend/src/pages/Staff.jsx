// src/pages/Staff.jsx
import React from "react";
import StaffDashboard from "./StaffDashboard"; // ✅ CORRECT PATH

const Staff = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <StaffDashboard />
    </div>
  );
};

export default Staff;
