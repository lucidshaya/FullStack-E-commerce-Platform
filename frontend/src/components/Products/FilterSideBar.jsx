import React, { useState, useEffect } from 'react';
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

    const categories = ["Top Wear", "Bottom Wear", "Footwear", "Accessories"];
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
        
        // Add filters to params only if they have values
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
                        <option key={category} value={category}>{category}</option>
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

export default FilterSideBar;