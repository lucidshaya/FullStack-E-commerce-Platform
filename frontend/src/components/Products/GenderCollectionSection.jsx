import React from 'react';
import MenCollectionImage from '../../assets/mens-collection.webp';
import WomenCollectionImage from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';

const GenderCollectionSection = () => {
  return (
    <section className="py-8 md:py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 group overflow-hidden">
          <img 
            src={WomenCollectionImage}
            alt="Women's Collection"
            className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 bg-white bg-opacity-95 p-4 md:p-6 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
              Women's Collection
            </h2>
            <Link 
              to="/collections/all?gender=Women"
              className="text-gray-900 hover:text-gray-700 underline transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 group overflow-hidden">
          <img 
            src={MenCollectionImage}
            alt="Men's Collection"
            className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 bg-white bg-opacity-95 p-4 md:p-6 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
              Men's Collection
            </h2>
            <Link 
              to="/collections/all?gender=Men"
              className="text-gray-900 hover:text-gray-700 underline transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;