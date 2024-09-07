import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the single product passed via state from the Modal
  const product = location.state;

  const handleBuy = async () => {
    try {
      const response = await fetch('https://localhost:8080/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product,  // Send the single product object
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Cart sent successful!');  // Show success message
       
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!product) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold text-gray-800">Price: ${product.price}</p>
          </div>
          <img 
            src={product.image || './trial.jpg'}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>

        <div className="mt-8">
          <button 
            onClick={handleBuy} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
