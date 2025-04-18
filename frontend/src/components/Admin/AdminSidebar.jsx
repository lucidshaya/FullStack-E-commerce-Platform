import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaBox, 
  FaClipboardList, 
  FaStore,
  FaTachometerAlt,
  FaSignOutAlt
} from 'react-icons/fa';

const AdminSidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate("/");
  };

  const navLinkStyle = ({isActive}) => 
    isActive 
      ? "bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors" 
      : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors";

  return (
    <div className='p-5 h-full flex flex-col bg-gray-800 border-r border-gray-700'>
      {/* Brand Header */}
      <div className='mb-8'>
        <NavLink to="/admin" className="text-2xl font-bold text-white flex items-center">
          <FaStore className="mr-2" />
          Lucid Stores Admin
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className='flex flex-col space-y-2 flex-grow'>
        <NavLink to="/admin/dashboard" className={navLinkStyle}>
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/admin/shop" className={navLinkStyle}>
          <FaStore className="text-lg" />
          <span>Shop</span>
        </NavLink>
        
        <NavLink to="/admin/products" className={navLinkStyle}>
          <FaBox className="text-lg" />
          <span>Products</span>
        </NavLink>
        
        <NavLink to="/admin/orders" className={navLinkStyle}>
          <FaClipboardList className="text-lg" />
          <span>Orders</span>
        </NavLink>
        
        <NavLink to="/admin/users" className={navLinkStyle}>
          <FaUser className="text-lg" />
          <span>Users</span>
        </NavLink>
      </nav>

      {/* Bottom Section */}
      <div className='mt-auto pt-4 border-t border-gray-700'>
        <button 
          onClick={handleLogout} 
          className="w-full text-white bg-red-500 hover:bg-red-600 py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;