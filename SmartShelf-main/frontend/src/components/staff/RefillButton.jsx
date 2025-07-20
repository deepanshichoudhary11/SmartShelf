import React from 'react';

const RefillButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
    >
      Mark as Refilled
    </button>
  );
};

export default RefillButton;
