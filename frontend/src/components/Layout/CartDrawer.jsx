import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import CartContents from '../Cart/CartContents';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const [cartProducts] = useState([
    // Your cart products array here (or lift state up)
  ]);

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, item) => 
      total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40
          ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleCartDrawer}
      />
      
      {/* Drawer Container */}
      <div 
        className={`fixed top-0 right-0 w-full max-w-[90vw] sm:max-w-md md:max-w-lg h-full bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out flex flex-col z-50
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className='flex justify-between items-center p-4 sm:p-6 border-b border-gray-200'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
            Your Cart
            <span className='text-gray-500 font-normal ml-2'>
              ({cartProducts.length} items)
            </span>
          </h2>
          <button 
            onClick={toggleCartDrawer}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            aria-label="Close cart"
          >
            <IoMdClose className="h-6 w-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto px-4 sm:px-6'>
          <CartContents />
        </div>

        {/* Checkout Footer */}
        <div className='sticky bottom-0 bg-white border-t border-gray-200'>
          <div className='p-4 sm:p-6'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-gray-600'>Subtotal:</span>
              <span className='text-lg font-semibold'>${calculateSubtotal()}</span>
            </div>
            <button 
              className='w-full bg-gray-900 text-white py-4 rounded-lg font-semibold 
                hover:bg-gray-800 active:bg-gray-700 transition-colors disabled:opacity-50'
              disabled={cartProducts.length === 0}
            >
              Proceed to Checkout
            </button>
            <p className='text-xs sm:text-sm text-gray-500 mt-3 text-center'>
              Shipping & taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;