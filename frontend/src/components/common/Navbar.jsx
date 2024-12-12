// src/components/Navbar.jsx
import React from 'react';
import RoommateMatchImage from '../../../public/rommate-match.png'
function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full shadow-lg z-10 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="cursor-pointer">
            <img 
                src={RoommateMatchImage} 
                alt="Roommate Match"
                className="h-8 w-auto object-contain mx-4 hover:opacity-90 transition-opacity"
            />
        </a>
        {/* Profile Avatar */}
        <div className="flex items-center space-x-4">
          <a href="/profile" className="hover:text-gray-300">
            <div className="w-10 h-10 bg-gray-500 rounded-full overflow-hidden">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
