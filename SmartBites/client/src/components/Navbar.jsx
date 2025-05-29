import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">SmartBites</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/recipes"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recipes
                </Link>
                <Link
                  to="/meal-planner"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Meal Planner
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/shop"
                  className="relative text-gray-600 hover:text-primary-600 p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  Sign up
                </Link>
                <Link
                  to="/signin"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/recipes"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Recipes
              </Link>
              <Link
                to="/meal-planner"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Meal Planner
              </Link>
              <Link
                to="/orders"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}