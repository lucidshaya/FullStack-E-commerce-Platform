import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block group"
        >
          <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold group-hover:text-blue-600">
              {product.name}
            </h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;