import React, { useState } from 'react';

const ProductViewer = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/getprod');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Shiprocket Products</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="px-6 py-2 w-[40%] bg-amber-800 text-white rounded-md hover:bg-amber-700 transition-all"
        >
          {loading ? 'Loading...' : 'Fetch Products'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-center mb-4">Error: {error}</p>
      )}
      {data ? (
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-600 text-center">No data fetched yet.</p>
        )
      )}
    </div>
  );
};

export default ProductViewer;