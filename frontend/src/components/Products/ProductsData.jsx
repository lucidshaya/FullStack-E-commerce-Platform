import React, { useEffect, useState } from 'react';
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

export default ProductsData;