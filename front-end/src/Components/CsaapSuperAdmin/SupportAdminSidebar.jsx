import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 overflow-y-auto">
      {/* Logo/Marketing Section */}
      <div className="p-6 text-xl font-bold text-gray-800 border-b border-gray-200">
        Marketing
      </div>

      {/* Navigation Links */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/app" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">App</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/ui-kits" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">UI Kits</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/forms" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Forms</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/icons" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Icons</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/animations" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Animations</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/components" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Components</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/table" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Table</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/cards" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Cards</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/charts" 
              className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span className="ml-2">Charts</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;