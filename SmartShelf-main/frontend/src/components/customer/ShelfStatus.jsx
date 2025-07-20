// src/components/customer/ShelfStatus.jsx
import React, { useState } from "react";

const ShelfStatus = ({ onFlag }) => {
  const [flagged, setFlagged] = useState(false);
  const [image, setImage] = useState(null);

  const handleFlag = () => {
    setFlagged(true);
    if (onFlag) onFlag(); // notify parent
    setTimeout(() => setFlagged(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="border p-4 rounded-xl shadow bg-white">
        <h2 className="text-lg font-medium mb-2">Is this item missing on the shelf?</h2>
        <input
          type="file"
          className="mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          onClick={handleFlag}
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
        >
          Yes, Flag it
        </button>
        {flagged && (
          <div className="mt-3 text-green-600 font-medium animate-fade-in">
            ✅ Flag received! Thank you for reporting.
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelfStatus;
