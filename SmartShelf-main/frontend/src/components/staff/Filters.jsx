import React from 'react';

const Filters = ({ status, onChange }) => {
  const options = ['All', 'New', 'Refilled', 'Ignored'];

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-1 border rounded-md transition ${
            status === option
              ? 'bg-[#0071CE] text-white'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Filters;
