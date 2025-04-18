import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri"
import { useState } from 'react';

const CartContents = () => {
    const cartProducts = [
        {
            productId: 1,
            name: "Product 1",
            size: "M",
            color: "Red",
            quantity: 2,
            price: 29.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            productId: 2,
            name: "Product 2",
            size: "L",
            color: "Blue",
            quantity: 1,
            price: 19.99,
            image: "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            productId: 3,
            name: "Product 3",
            size: "S",
            color: "Green",
            quantity: 1,
            price: 39.99,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];
return (
    <div className="p-4 bg-gray-50">
        {cartProducts.map((product, index) => (
            <div key={product.productId} className="flex items-start justify-between py-4 border-b border-gray-300">
                <div className="flex items-start">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4 shadow-md" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Size: <span className="font-medium">{product.size}</span> | Color: <span className="font-medium">{product.color}</span>
                    </p>
                </div>
                <div className="flex items-center mt-2 space-x-2">
                    <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">-</button>
                    <span className="px-2 py-1 text-gray-800">{product.quantity}</span>
                    <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">+</button>
                </div>
                <div className="ml-4">
                    <p className="text-gray-800 font-medium">${(product.price * product.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                    <button className="p-2">
                        <RiDeleteBin3Line className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                    </button>
                </div>
            </div>
        ))}
    </div>
);
}

export default CartContents