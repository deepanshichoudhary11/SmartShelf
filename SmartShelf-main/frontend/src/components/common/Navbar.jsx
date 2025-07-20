import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0071CE] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">SmartShelf</Link>
        <div className="space-x-4">
          <Link to="/customer" className="hover:underline">Customer</Link>
          <Link to="/staff" className="hover:underline">Staff</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
