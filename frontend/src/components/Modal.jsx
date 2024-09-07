import React from 'react';
import {useNavigate} from 'react-router-dom';
const Modal = ({ product, onClose }) => {

  const navigate= useNavigate();
  const handlePurchase = ()=>{
    navigate('/payment',{ state: product });
  }
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[60%] max-h-[90%] overflow-y-auto relative">
        
        <button 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        

        <div className="flex flex-col md:flex-row items-start gap-6">
          <img 
            src={product.image || './trial.jpg'} // Fallback in case product image is missing
            alt={product.name}
            className="w-full md:w-[40%] rounded-lg object-cover"
          />
          

          <div className="w-full md:w-[60%]">
            <h2 className="text-2xl font-bold mb-1 text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
            

            <button onClick={handlePurchase} className='bg-amber-900 text-white px-10 py-2 border-white hover:bg-white hover:text-amber-950 hover:border-amber-950 border-2 mt-2 transition-colors duration-300 rounded-lg'>Buy Now</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;