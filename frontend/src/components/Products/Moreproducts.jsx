import React from 'react';
import { Link } from 'react-router-dom';

const MoreProducts = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map((product, index) => (
            <Link 
                key={product.id || index} 
                to={`/products/${product.id}`} 
                className="block group"
            >
                <div className="w-full h-80 mb-4 overflow-hidden rounded-lg">
                    <img 
                        src={product.images[0].url} 
                        alt={product.images[0].altText || product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-2">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <div className="flex items-center mt-1">
                        <p className="text-gray-900 font-semibold">${product.price}</p>
                        {product.originalPrice && (
                            <p className="text-gray-500 line-through ml-2 text-sm">
                                ${product.originalPrice}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        ))}
    </div>
  );
};

export default MoreProducts;