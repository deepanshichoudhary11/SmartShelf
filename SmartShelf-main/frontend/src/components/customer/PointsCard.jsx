// src/components/customer/PointsCard.jsx
import React from "react";

const PointsCard = () => {
  const points = 12;

  return (
    <div className="bg-green-100 p-6 rounded-xl text-center shadow-lg animate-fade-in">
      <h3 className="text-3xl font-bold text-green-800"> {points} Green Points!!</h3>
      <p className="text-md text-green-900 font-semibold mt-2">
        Thanks for helping us restock! Earn discounts with your points.
      </p>
    </div>
  );
};

export default PointsCard;
