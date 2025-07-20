import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Customer from "./pages/Customer";
import StaffDashboard from "./pages/StaffDashboard";

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/login");
    } else if (role === "customer") {
      navigate("/customer");
    } else if (role === "staff") {
      navigate("/staff");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null; // no UI while redirecting
};

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<RedirectHandler />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}
