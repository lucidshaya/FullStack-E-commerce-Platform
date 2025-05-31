import React, { useEffect, useState, useRef } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideBar from '../components/Products/FilterSideBar';



const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchProducts = () => {
            setTimeout(() => {
                const fetchedProducts = [
                    {
                        "_id": "1",
                        "name": "Wireless Headphones",
                        "price": 89.99,
                        "images": [{url: "https://picsum.photos/500/500?random=1", altText: "Wireless Headphones"}]
                    },
                    {
                        "_id": "2",
                        "name": "Smart Watch",
                        "price": 199.99,
                        "images": [{url: "https://picsum.photos/500/500?random=2", altText: "Smart Watch"}]
                    },
                    {
                        "_id": "3",
                        "name": "Bluetooth Speaker",
                        "price": 59.99,
                        "images": [{url: "https://picsum.photos/500/500?random=3", altText: "Bluetooth Speaker"}]
                    },
                    {
                        "_id": "4",
                        "name": "Noise Cancelling Headphones",
                        "price": 149.99,
                        "images": [{url: "https://picsum.photos/500/500?random=4", altText: "Noise Cancelling Headphones"}]
                    },
                    {
                        "_id": "5",
                        "name": "Fitness Tracker",
                        "price": 79.99,
                        "images": [{url: "https://picsum.photos/500/500?random=5", altText: "Fitness Tracker"}]
                    }
                ];
                setProducts(fetchedProducts);
            }, 1000);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return (
        <>
           <h1 className="text-2xl sm:text-3xl mt-5 font-bold text-gray-900 mb-3 text-center">Shop Now!</h1>   
        <div className="flex flex-col lg:flex-row min-h-screen">
            
            {/* Mobile Filter Button */}
            <button 
                className='lg:hidden border p-2 flex justify-center items-center m-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors'
                onClick={toggleSidebar}
            >
                <FaFilter className='mr-2'/> 
                <span>Filters</span>
            </button>

            {/* Filter Sidebar */}
            <div 
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out shadow-xl
                    lg:static lg:translate-x-0 lg:w-72 lg:min-h-screen lg:border-r`}
            >
                <FilterSideBar 
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-6">Our Products</h1>
                
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-10">
                        <p>No products match your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="aspect-square overflow-hidden">
                                    <img 
                                        src={product.images[0].url} 
                                        alt={product.images[0].altText || product.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
                                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default CollectionPage;