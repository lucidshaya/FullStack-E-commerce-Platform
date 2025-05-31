import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    priceRange: [0, 200],
  });

  const categories = ['Top Wear', 'Bottom Wear', 'Footwear', 'Accessories'];
  const genders = ['Men', 'Women', 'Unisex'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim'];
  const brands = ['Nike', 'Adidas', 'Puma', "Levi's", 'H&M'];

  // Sync filters with search parameters on mount or URL change
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      priceRange: [
        params.minPrice ? Number(params.minPrice) : 0,
        params.maxPrice ? Number(params.maxPrice) : 200,
      ],
    });
  }, [searchParams]);

  // Handle filter changes (selects and checkboxes)
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Apply filters to search parameters
  const applyFilters = () => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.gender) params.gender = filters.gender;
    if (filters.color) params.color = filters.color;
    if (filters.size.length > 0) params.size = filters.size.join(',');
    if (filters.material.length > 0) params.material = filters.material.join(',');
    if (filters.brand.length > 0) params.brand = filters.brand.join(',');
    if (filters.priceRange[0] > 0) params.minPrice = filters.priceRange[0].toString();
    if (filters.priceRange[1] < 200) params.maxPrice = filters.priceRange[1].toString();
    setSearchParams(params);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      gender: '',
      color: '',
      size: [],
      material: [],
      brand: [],
      priceRange: [0, 200],
    });
    setSearchParams({});
  };

  return (
    <div className="p-4 space-y-6 bg-white shadow-md lg:h-screen lg:overflow-y-auto">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* Category */}
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <h3 className="font-semibold mb-2">Gender</h3>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Genders</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <h3 className="font-semibold mb-2">Color</h3>
        <select
          name="color"
          value={filters.color}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Colors</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
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

      {/* Material */}
      <div>
        <h3 className="font-semibold mb-2">Material</h3>
        <div className="space-y-2">
          {materials.map((material) => (
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

      {/* Brand */}
      <div>
        <h3 className="font-semibold mb-2">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
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

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex justify-between mb-2">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[0]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [parseInt(e.target.value), prev.priceRange[1]],
            }))
          }
          className="w-full mb-2"
        />
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value)],
            }))
          }
          className="w-full"
        />
      </div>

      {/* Buttons */}
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