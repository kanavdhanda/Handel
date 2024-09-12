import React, { useState } from 'react';

const SellerViewer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSeller = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/myproducts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Product Viewer</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchSeller}
          disabled={loading}
          className="px-6 py-2 w-[40%] bg-amber-800 text-white rounded-md hover:bg-amber-700 transition-all"
        >
          {loading ? 'Loading...' : 'Fetch Products'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-center mb-4">Error: {error}</p>
      )}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((product) => (
            <div key={product.sku} className="bg-white p-4 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h2>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-auto object-cover mb-2"
                />
              )}
              <p className="text-gray-600 mb-2">SKU: {product.sku}</p>
              <p className="text-gray-600 mb-2">Category: {product.category_code}</p>
              <p className="text-gray-600 mb-2">Description: {product.description}</p>
              <p className="text-gray-600 mb-2">MRP: {product.mrp}</p>
              <p className="text-gray-600 mb-2">Quantity: {product.qty}</p>
              <p className="text-gray-600 mb-2">Dimensions: {product.length} x {product.width} x {product.height}</p>
              <p className="text-gray-600 mb-2">Weight: {product.weight}</p>
              <p className="text-gray-600 mb-2">HSN: {product.hsn}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-600 text-center">No data fetched yet.</p>
        )
      )}
    </div>
  );
};

export default SellerViewer;
