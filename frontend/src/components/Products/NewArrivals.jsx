import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollRight,setCanScrollRight ] = useState(true)
    const [showArrows, setShowArrows] = useState(false);

    const newArrivals =  [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 29.99,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "2",
            name: "Casual Shoes",
            price: 49.99,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    altText: "Casual Shoes",
                },
            ],
        },
        {
            _id: "3",
            name: "Elegant Watch",
            price: 19.99,
            images: [
                {
                    url: "https://www.shutterstock.com/image-photo/fashion-woman-shopping-bags-walking-260nw-2479593051.jpg",
                    altText: "Elegant Watch",
                },
            ],
        },
        {
            _id: "4",
            name: "Modern Backpack",
            price: 39.99,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    altText: "Modern Backpack",
                },
            ],
        },
        {
            _id: "5",
            name: "Trendy Sunglasses",
            price: 24.99,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    altText: "Trendy Sunglasses",
                },
            ],
        },
        {
            _id: "6",
            name: "Leather Wallet",
            price: 59.99,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    altText: "Leather Wallet",
                },
            ],
        },
        {
            _id: "7",
            name: "Classic Hat",
            price: 34.99,
            images: [
                {
                    url: "https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg",
                    altText: "Classic Hat",
                },
            ],
        },
    ];;

 
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/products'); // Navigate to /dashboard
    // Or navigate with state: navigate('/dashboard', { state: { userId: 123 } });
    // Or go back: navigate(-1);
  };


    // Touch/scrolling handlers
    const startDrag = (e) => {
        setIsDragging(true);
        setStartX(e.pageX || e.touches[0].pageX);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const duringDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    // Scroll buttons visibility
    const checkScroll = () => {
        setShowArrows(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', checkScroll);
        checkScroll();
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Explore New Arrivals
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Discover the latest trends and styles in our new arrivals collection.
                </p>
            </div>

        <Link to={"/products"} className="text-blue-600 hover:underline text-center mb-6 block">
            View All Products
            </Link>
            <div className="relative group">
                {showArrows && (
                    <>
                        <button 
                            onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
                            className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl z-10 transition-all"
                            aria-label="Previous products"
                        >
                            <FiChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button 
                            onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
                            className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl z-10 transition-all"
                            aria-label="Next products"
                        >
                            <FiChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}

                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
                    onMouseDown={startDrag}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    onMouseMove={duringDrag}
                    onTouchStart={startDrag}
                    onTouchMove={duringDrag}
                    onTouchEnd={stopDrag}
                >
                    {newArrivals.map((product) => (
                        <div 
                            key={product._id}
                            className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-72 lg:w-80 relative group"
                        >
                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                                <img 
                                    src={product.images[0]?.url}
                                    alt={product.images[0]?.altText || product.name}
                                    onClick={handleClick}   
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <Link 
                                        to={`/product/${product._id}`} 
                                        className="block hover:text-gray-200 transition-colors"
                                    >
                                        <h4 className="font-semibold text-lg sm:text-xl">{product.name}</h4>
                                        <p className="mt-1 text-sm sm:text-base">${product.price}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewArrivals;