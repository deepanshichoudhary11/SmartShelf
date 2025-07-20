// src/components/staff/AlertCard.jsx
import React, { useState } from "react";

const AlertCard = ({ alert }) => {
  const [status, setStatus] = useState(alert.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // TODO: API call to update alert status in backend
  };

  return (
    <div className="bg-white shadow p-4 rounded-xl border">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{alert.product}</h3>
          <p className="text-sm text-gray-600">{alert.location}</p>
          <p className="text-sm text-gray-500">Flagged at: {alert.time}</p>
          <p className="text-sm text-gray-500">Flags: {alert.flags}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handleStatusChange("Refilled")}
            className={`px-4 py-2 rounded ${
              status === "Refilled"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            Mark as Refilled
          </button>
          <button
            onClick={() => handleStatusChange("Ignored")}
            className={`px-4 py-2 rounded ${
              status === "Ignored"
                ? "bg-yellow-600 text-white"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
