// src/components/customer/ProductSearch.jsx
import React, { useState } from "react";

const suggestions = [
  "Milk - Aisle 1 - Ground Floor",
  "Toothpaste - Aisle 3 - First Floor",
  "Rice - Aisle 5 - Basement",
  "Shampoo - Aisle 7 - Ground Floor",
  "Biscuits - Aisle 2 - First Floor",
];

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    setFiltered(
      suggestions.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const selectSuggestion = (item) => {
    setQuery(item);
    setFiltered([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search product or location..."
        value={query}
        onChange={handleChange}
      />
      {filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded-xl mt-2 w-full max-h-60 overflow-auto shadow">
          {filtered.map((item, index) => (
            <li
              key={index}
              onClick={() => selectSuggestion(item)}
              className="p-3 hover:bg-blue-50 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
