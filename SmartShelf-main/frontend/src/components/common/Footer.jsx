import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-4 mt-10 border-t">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} SmartShelf. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
