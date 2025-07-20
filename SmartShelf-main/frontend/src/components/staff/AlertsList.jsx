// src/components/staff/AlertsList.jsx
import React, { useState } from "react";
import AlertCard from "./AlertCard";

const dummyAlerts = [
  {
    id: 1,
    product: "Shampoo",
    location: "Aisle 5 - Ground Floor - Section B",
    flags: 4,
    time: "10:30 AM",
    status: "New",
  },
  {
    id: 2,
    product: "Sugar",
    location: "Aisle 3 - First Floor - Section D",
    flags: 7,
    time: "9:15 AM",
    status: "New",
  },
];

const AlertsList = () => {
  const [filter, setFilter] = useState("All");

  const filtered = dummyAlerts.filter((alert) =>
    filter === "All" ? true : alert.status === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Out-of-Stock Alerts</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Refilled">Refilled</option>
          <option value="Ignored">Ignored</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="text-gray-500">No alerts found for this filter.</p>
      ) : (
        filtered.map((alert) => <AlertCard key={alert.id} alert={alert} />)
      )}
    </div>
  );
};

export default AlertsList;
