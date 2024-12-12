import React from 'react';
import { Link } from 'react-router-dom';
import RoommateMatchImage from '../../../public/rommate-match.png'

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full shadow-lg z-10 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="cursor-pointer">
            <img 
                src={RoommateMatchImage} 
                alt="Roommate Match"
                className="h-8 w-auto object-contain mx-4 hover:opacity-90 transition-opacity"
            />
        </Link>

        {/* Navigation and Profile */}
        <div className="flex items-center space-x-4">
          {/* Auth Buttons */}
          <Link to="/login">
            <button className="btn btn-ghost btn-sm">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary btn-sm text-white">
              Sign up
            </button>
          </Link>

          {/* Profile Avatar */}
          <Link to="/profile" className="hover:opacity-80">
            <div className="w-10 h-10 bg-base-200 rounded-full overflow-hidden">
              <img
                src="avatar-placeholder.png"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;