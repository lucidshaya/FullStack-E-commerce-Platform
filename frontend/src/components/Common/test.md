Make all of it in sync and clean and also prepared for my backend integrations import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSideBar = ({ priceRange, setPriceRange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
    });

    const categories = [
        {
            "type": "checkbox",
            "id": "category-Top Wear",
            "name": "category",
            "value": "Top Wear",
            "label": "Top Wear"
        },
        {
            "type": "checkbox",
            "id": "category-Bottom Wear",
            "name": "category",
            "value": "Bottom Wear",
            "label": "Bottom Wear"
        },
        {
            "type": "checkbox",
            "id": "category-Footwear",
            "name": "category",
            "value": "Footwear",
            "label": "Footwear"
        },
        {
            "type": "checkbox",
            "id": "category-Accessories",
            "name": "category",
            "value": "Accessories",
            "label": "Accessories"
        }
    ];
    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim"];
    const brands = ["Nike", "Adidas", "Puma", "Levi's", "H&M"];
    const genders = ["Men", "Women", "Unisex"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilters(prev => ({
            ...prev,
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(',') : [],
            material: params.material ? params.material.split(',') : [],
            brand: params.brand ? params.brand.split(',') : [],
        }));

        if (params.minPrice || params.maxPrice) {
            setPriceRange([
                params.minPrice ? Number(params.minPrice) : 0,
                params.maxPrice ? Number(params.maxPrice) : 200
            ]);
        }
    }, [searchParams, setPriceRange]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFilters(prev => {
                const newValue = checked
                    ? [...prev[name], value]
                    : prev[name].filter(item => item !== value);

                return { ...prev, [name]: newValue };
            });
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };

    const applyFilters = () => {
        const params = {};

        if (filters.category) params.category = filters.category;
        if (filters.gender) params.gender = filters.gender;
        if (filters.color) params.color = filters.color;
        if (filters.size.length > 0) params.size = filters.size.join(',');
        if (filters.material.length > 0) params.material = filters.material.join(',');
        if (filters.brand.length > 0) params.brand = filters.brand.join(',');
        if (priceRange[0] > 0) params.minPrice = priceRange[0].toString();
        if (priceRange[1] < 200) params.maxPrice = priceRange[1].toString();

        setSearchParams(params);
    };

    const resetFilters = () => {
        setFilters({
            category: "",
            gender: "",
            color: "",
            size: [],
            material: [],
            brand: [],
        });
        setPriceRange([0, 200]);
        setSearchParams({});
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold">Filters</h2>

            {/* Category Filter */}
            <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                </select>
            </div>

            {/* Gender Filter */}
            <div>
                <h3 className="font-semibold mb-2">Gender</h3>
                <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">All Genders</option>
                    {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                    ))}
                </select>
            </div>

            {/* Color Filter */}
            <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <select
                    name="color"
                    value={filters.color}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">All Colors</option>
                    {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>

            {/* Size Filter */}
            <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="space-y-2">
                    {sizes.map(size => (
                        <div key={size} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`size-${size}`}
                                name="size"
                                value={size}
                                checked={filters.size.includes(size)}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            <label htmlFor={`size-${size}`}>{size}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Material Filter */}
            <div>
                <h3 className="font-semibold mb-2">Material</h3>
                <div className="space-y-2">
                    {materials.map(material => (
                        <div key={material} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`material-${material}`}
                                name="material"
                                value={material}
                                checked={filters.material.includes(material)}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            <label htmlFor={`material-${material}`}>{material}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Filter */}
            <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                <div className="space-y-2">
                    {brands.map(brand => (
                        <div key={brand} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`brand-${brand}`}
                                name="brand"
                                value={brand}
                                checked={filters.brand.includes(brand)}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            <label htmlFor={`brand-${brand}`}>{brand}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                />
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Apply Filters
                </button>
                <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FilterSideBar;import React from 'react';
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
};

export default GenderCollectionSection;import React from 'react';
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

export default MoreProducts;import React from 'react';
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

export default NewArrivals;import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { Link } from 'react-router-dom';

const selectedProducts = {
    name: "Stylish Jacket",
    price: 120, 
    originalPrice: 150,
    description: "This stylish jacket is perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
        {
            url: "https://picsum.photos/500/500?random=1",
            altText: "Front view of the jacket",
        },
        {
            url: "https://picsum.photos/500/500?random=2",
            altText: "Side view of the jacket",
        }
    ],
};

const similarProducts = [
    {
        id: 1,
        name: "Casual Denim Jacket",
        price: 89.99,
        originalPrice: 120,
        images: [{url: "https://picsum.photos/500/500?random=4", altText: "Denim Jacket"}]
    },
    {
        id: 2,
        name: "Winter Parka",
        price: 199.99,
        originalPrice: 250,
        images: [{url: "https://picsum.photos/500/500?random=5", altText: "Winter Parka"}]
    },
    {
        id: 3,
        name: "Lightweight Windbreaker",
        price: 59.99,
        images: [{url: "https://picsum.photos/500/500?random=6", altText: "Windbreaker"}]
    },
    {
        id: 4,
        name: "Classic Bomber Jacket",
        price: 129.99,
        originalPrice: 150,
        images: [{url: "https://picsum.photos/500/500?random=7", altText: "Bomber Jacket"}]
    }
];

const MoreProducts = ({ products }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
            {products.map((product) => (
                <div key={product.id} className="group">
                    <Link to={`/products/${product.id}`} className="block">
                        <div className="w-full h-64 mb-3 overflow-hidden rounded-lg">
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].altText || product.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-gray-900 font-semibold">${product.price}</p>
                                {product.originalPrice && (
                                    <p className="text-gray-500 line-through text-sm">
                                        ${product.originalPrice}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

const ProductsData = () => {
    const [mainImage, setMainImage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (selectedProducts?.images?.length > 0) {
            setMainImage(selectedProducts.images[0].url);
        }
    }, []);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity > 0 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size before adding to cart");
            return;
        }
        
        if (!selectedColor) {
            toast.error("Please select a color before adding to cart");
            return;
        }

        setIsButtonDisabled(true);

        setTimeout(() => {
            toast.success(`${quantity} ${selectedProducts.name} (${selectedSize}, ${selectedColor}) added to cart`);
            setIsButtonDisabled(false);
        }, 500);
    };

    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-sm'>
                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Image Gallery */}
                    <div className='flex flex-col md:flex-row-reverse'>
                        {/* Main Image */}
                        <div className='md:w-[500px]'>
                            <div className='mb-4 rounded-lg overflow-hidden'>
                                <img 
                                    src={mainImage}
                                    alt='Main Product' 
                                    className='w-full h-auto object-cover aspect-square'
                                />
                            </div>
                            
                            {/* Mobile Thumbnails */}
                            <div className="md:hidden flex space-x-4 mb-4 overflow-x-auto pb-2">
                                {selectedProducts.images.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image.url}
                                        alt={image.altText}
                                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${mainImage === image.url ? "border-black" : "border-transparent"}`}
                                        onClick={() => setMainImage(image.url)}
                                    /> 
                                ))}
                            </div>
                        </div>
                        
                        {/* Desktop Thumbnails */}
                        <div className='hidden md:flex flex-col space-y-4 ml-0 mr-4'>    
                            {selectedProducts.images.map((image, index) => (
                                <img 
                                    key={index}
                                    src={image.url}
                                    alt={image.altText}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === image.url ? "border-black" : "border-transparent"}`}
                                    onClick={() => setMainImage(image.url)}
                                />   
                            ))}
                        </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className='md:w-1/2'>
                        <div className='mb-6'>
                            <h1 className='text-2xl md:text-3xl font-bold mb-2'>
                                {selectedProducts.name}
                            </h1>
                            
                            <div className='flex items-center gap-3 mb-3'>
                                {selectedProducts.originalPrice && (
                                    <p className='text-lg text-gray-500 line-through'>
                                        ${selectedProducts.originalPrice}
                                    </p>
                                )}
                                <p className='text-xl font-bold text-gray-900'>
                                    ${selectedProducts.price}
                                </p>
                                {selectedProducts.originalPrice && (
                                    <span className='bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded'>
                                        {Math.round((1 - selectedProducts.price / selectedProducts.originalPrice) * 100)}% OFF
                                    </span>
                                )}
                            </div>
                            
                            <p className='text-gray-600 mb-4'>{selectedProducts.description}</p>
                            
                            {/* Color Selection */}
                            <div className='mb-6'>
                                <p className='text-gray-700 font-medium mb-2'>Color: {selectedColor && <span className='font-normal'>({selectedColor})</span>}</p>
                                <div className='flex gap-3'>
                                    {selectedProducts.colors.map((color) => (
                                        <button 
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-200"} transition-all`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            title={color}
                                            aria-label={`Select color ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Size Selection */}
                            <div className='mb-6'>
                                <p className='text-gray-700 font-medium mb-2'>Size: {selectedSize && <span className='font-normal'>({selectedSize})</span>}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {selectedProducts.sizes.map((size) => (
                                        <button 
                                            key={size} 
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-md border text-sm font-medium ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Quantity and Add to Cart */}
                            <div className='mb-8'>
                                <p className="text-gray-700 font-medium mb-2">Quantity:</p>
                                <div className='flex items-center gap-4 mb-4'>
                                    <button 
                                        className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-lg hover:bg-gray-200 transition-colors'
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className='text-lg w-8 text-center'>{quantity}</span>
                                    <button 
                                        className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-lg hover:bg-gray-200 transition-colors'
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= 10}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={isButtonDisabled}
                                    className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${isButtonDisabled 
                                        ? "bg-gray-400 cursor-not-allowed" 
                                        : "bg-black text-white hover:bg-gray-800"}`}
                                >
                                    {isButtonDisabled ? "Adding to cart..." : "Add to Cart"}
                                </button>
                            </div>
                            
                            {/* Product Details */}
                            <div className='border-t pt-6'>
                                <h3 className='text-lg font-bold mb-4'>Product Details</h3>
                                <table className='w-full text-sm'>
                                    <tbody className='divide-y divide-gray-200'>
                                        <tr>
                                            <td className='py-3 font-medium text-gray-600'>Brand</td>
                                            <td className='py-3 text-gray-800'>{selectedProducts.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-3 font-medium text-gray-600'>Material</td>
                                            <td className='py-3 text-gray-800'>{selectedProducts.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                <div className='mt-20'>
                    <h2 className="text-2xl text-center font-medium mb-8">
                        You may also like
                    </h2>
                    <MoreProducts products={similarProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductsData;import React from 'react';

const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {products.map(product => (
                <div key={product._id} className="border p-4 rounded">
                    <img
                        src={product.images[0].url}
                        alt={product.images[0].altText}
                        className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;import React from 'react';

const SortOptions = () => {
    return (
        <div className="mb-4">
            <select className="p-2 border rounded">
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
            </select>
        </div>
    );
};

export default SortOptions;import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import MyOrders from '../../pages/MyOrders'
import { LogOut, User, Mail, Edit } from 'lucide-react';


const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto p-4 md:p-6 ">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* Left Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Joh Doe</h1>
                    <p className="text-lg text-gray-600 mb-4">John@example.com</p>
                    <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                        Logout
                    </button>
                        </div>
                        {/* Right Section: Orders Table  */}
                        <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrders />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Profile import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
    const orders = [
        {
            _id: 1212334,
            user: {
                name: "John lucid",
            }, 
            totalPrice: 110,
            status: "Processing",
        },
        {
            _id: 12134,
            user: {
                name: "John lucid",
            }, 
            totalPrice: 110,
            status: "Processing",
        },
        {
            _id: 1214,
            user: {
                name: "John lucid",
            }, 
            totalPrice: 110,
            status: "Processing",
        },
        {
            _id: 134,
            user: {
                name: "John lucid",
            }, 
            totalPrice: 110,
            status: "Processing",
        },
        {
            _id: 122,
            user: {
                name: "John lucid",
            }, 
            totalPrice: 110,
            status: "Processing",
        },
        {
            _id: 12114,
            user: {
                name: "John lucid",
            }, 
            totalPrice: 110,
            status: "Processing",
        },
    ];

    return (
        <div className='max-w-7xl mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
            
            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                <div className='p-4 shadow-md rounded-lg bg-white'>
                    <h2 className='text-xl font-semibold'>Revenue</h2>
                    <p className='text-2xl'>$10,000</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline">
                        View Details
                    </Link>
                </div>

                <div className='p-4 shadow-md rounded-lg bg-white'>
                    <h2 className='text-xl font-semibold'>Total Orders</h2>
                    <p className='text-2xl'>200</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline">
                        Manage Orders
                    </Link>
                </div>

                <div className='p-4 shadow-md rounded-lg bg-white'>
                    <h2 className='text-xl font-semibold'>Total Products</h2>
                    <p className='text-2xl'>100</p>
                    <Link to="/admin/products" className="text-blue-500 hover:underline">
                        Manage Products
                    </Link>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className='mt-6'>
                <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
                <div className='overflow-x-auto bg-white rounded-lg shadow'>
                    <table className='min-w-full text-left'>
                        <thead className='bg-gray-100 text-sm uppercase text-gray-700'>
                            <tr>
                                <th className='py-3 px-4'>Order ID</th>
                                <th className='py-3 px-4'>User</th>
                                <th className='py-3 px-4'>Total Price</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
    {orders.length > 0 ? (
        orders.map((order) => (
            <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                <td className='p-4'>{order._id}</td>
                <td className='p-4'>{order.user.name}</td>
                <td className='p-4'>${order.totalPrice}</td>
                <td className='p-4'>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Processing" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                    }`}>
                        {order.status}
                    </span>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={4} className='p-4 text-center text-gray-500'>
                No recent orders
            </td>
        </tr>
    )}
</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;import { useEffect, useState, useRef } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOptions from '../components/Products/SortOptions';
// Placeholder for ProductGrid (to be defined or imported)
import ProductGrid from '../components/Products/ProductsGrid';

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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
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
                        "images": [{ url: "https://picsum.photos/500/500?random=1", altText: "Wireless Headphones" }]
                    },
                    {
                        "_id": "2",
                        "name": "Smart Watch",
                        "price": 199.99,
                        "images": [{ url: "https://picsum.photos/500/500?random=2", altText: "Smart Watch" }]
                    },
                    {
                        "_id": "3",
                        "name": "Bluetooth Speaker",
                        "price": 59.99,
                        "images": [{ url: "https://picsum.photos/500/500?random=3", altText: "Bluetooth Speaker" }]
                    },
                    {
                        "_id": "4",
                        "name": "Noise Cancelling Headphones",
                        "price": 149.99,
                        "images": [{ url: "https://picsum.photos/500/500?random=4", altText: "Noise Cancelling Headphones" }]
                    },
                    {
                        "_id": "5",
                        "name": "Fitness Tracker",
                        "price": 79.99,
                        "images": [{ url: "https://picsum.photos/500/500?random=5", altText: "Fitness Tracker" }]
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
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Mobile Filter Button */}
            <button
                className="lg:hidden border p-2 flex justify-center items-center m-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={toggleSidebar}
            >
                <FaFilter className="mr-2" />
                <span>Filters</span>
            </button>

            {/* Filter Sidebar */}
            {isSidebarOpen && (
                <div ref={sidebarRef} className="lg:block">
                    <FilterSideBar
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                </div>
            )}

            {/* Main Content */}
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All collections</h2>
                {/* Sort Options */}
                <SortOptions />
                {/* Products Grid */}
                <Link to={`/product/${id}`} className='product-item text-gray-700 cursor-pointer'></Link>
                <ProductGrid products={filteredProducts} />
            </div>
        </div>
    );
};

export default CollectionPage;import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'  
import NewArrivals from '../components/Products/NewArrivals'
import ProductsData from '../components/Products/ProductsData'
import Moreproducts from '../components/Products/Moreproducts'
import FeaturesSection from '../components/Products/FeaturesSection'
import CollectionPage from './MyOrders'



const Home = () => {
  return (
    <div>
        {/* lucid Stores */}
        <Hero />

        {/* Gender Collections */}
        {/* <GenderCollectionSection /> */}
       
       {/* New Arrivals */}
        <NewArrivals />
        <hr />           
        <CollectionPage />
        <hr />

       {/*Best Seller*/}
      {/* <ProductsData /> */}
        {/* <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
       </h2> */}

    {/* YOU MAY ALSO LIKE */}

            
    {/* <ProductGrid products={placeholderProducts} /> */}

    <FeaturesSection />
    
    </div>
  )
}

export default Home// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       
    

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Login successful!");
            navigate('/');
        } catch (error) {
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm'>
                <div className='flex justify-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800'>LOGIN</h2>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            placeholder='your@email.com'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='••••••••'
                                required
                                minLength={6}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input
                                id='remember-me'
                                name='remember-me'
                                type='checkbox'
                                className='h-4 w-4 text-black focus:ring-black border-gray-300 rounded'
                            />
                            <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                                Remember me
                            </label>
                        </div>
                        
                        <div className='text-sm'>
                            <a href='/forgot-password' className='font-medium text-black hover:text-gray-600'>
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white text-gray-500'>
                                Or continue with
                            </span>
                        </div>
                    </div>
                    
                    <div className='mt-6 grid grid-cols-2 gap-3'>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Google
                        </button>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Facebook
                        </button>
                    </div>
                </div>
                
                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600'>
                        Don't have an account?{' '}
                        <a href='/signup' className='font-medium text-black hover:text-gray-600 transition-colors'>
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;import React, { useEffect, useState, useRef } from 'react';
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

export default CollectionPage;// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Account created successfully!");
            navigate('/');
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm'>
                <div className='flex justify-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800'>CREATE ACCOUNT</h2>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-1.5'>
                                First Name
                            </label>
                            <input
                                id='firstName'
                                name='firstName'
                                type='text'
                                value={formData.firstName}
                                onChange={handleChange}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='John'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1.5'>
                                Last Name
                            </label>
                            <input
                                id='lastName'
                                name='lastName'
                                type='text'
                                value={formData.lastName}
                                onChange={handleChange}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='Doe'
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            placeholder='your@email.com'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='••••••••'
                                required
                                minLength={6}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <p className='mt-1 text-xs text-gray-500'>Minimum 6 characters</p>
                    </div>
                    
                    <div>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Confirm Password
                        </label>
                        <input
                            id='confirmPassword'
                            name='confirmPassword'
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            placeholder='••••••••'
                            required
                        />
                    </div>
                    
                    <div className='flex items-center'>
                        <input
                            id='terms'
                            name='terms'
                            type='checkbox'
                            className='h-4 w-4 text-black focus:ring-black border-gray-300 rounded'
                            required
                        />
                        <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
                            I agree to the <a href='/terms' className='font-medium text-black hover:text-gray-600 transition-colors'>Terms</a> and <a href='/privacy' className='font-medium text-black hover:text-gray-600 transition-colors'>Privacy Policy</a>
                        </label>
                    </div>
                    
                    <div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white text-gray-500'>
                                Or sign up with
                            </span>
                        </div>
                    </div>
                    
                    <div className='mt-6 grid grid-cols-2 gap-3'>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Google
                        </button>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Facebook
                        </button>
                    </div>
                </div>
                
                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600'>
                        Already have an account?{' '}
                        <a href='/Login' className='font-medium text-black hover:text-gray-600 transition-colors'>
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./components/Products/Profile";
import CollectionPage from "./pages/CollectionPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";


const App = () => {
  return ( 
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="collections/:collection" element={<CollectionPage />} />
          {/* <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={OrderConfirmationPage} /> */}
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          {/* Add other admin routes here */}
          {/* <Route path="users" element={<AdminUsersPage />} />
          <Route path="products" element={<AdminProductsPage />} /> */}
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;