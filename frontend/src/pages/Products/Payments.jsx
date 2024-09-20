import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [inputQuantity, setInputQuantity] = useState(item.cartQuantity);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 1 && value <= item.quantity) {
      setInputQuantity(value);
    }
  };
  
  const handleBlur = () => {
    const newQuantity = Math.max(1, Math.min(Number(inputQuantity), item.quantity));
    setInputQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };
  
  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      <div>
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-lg font-semibold text-gray-800">Price: ${item.basePrice.toFixed(2)}</p>
        <p className="text-lg font-semibold text-gray-800">Total: ${(item.basePrice * item.cartQuantity).toFixed(2)}</p>
        <p className="text-sm text-gray-600">Available: {item.quantity}</p>
      </div>
      <div className="flex flex-col items-center">
        <img 
          src={item.image || '/trial.jpg'}
          alt={item.name}
          className="w-16 h-16 rounded-lg object-cover mb-2"
        />
        <div className="flex items-center">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.cartQuantity - 1)}
            className="bg-gray-200 px-3 py-1 rounded-l"
            disabled={item.cartQuantity <= 1}
          >
            -
          </button>
          <input 
  type="number" 
  value={inputQuantity}
  onChange={handleInputChange}
  onBlur={handleBlur}
  className="bg-gray-100 px-3 py-1 text-center w-12"
  min="1"
  max={item.quantity}
/>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.cartQuantity + 1)}
            className="bg-gray-200 px-3 py-1 rounded-r"
            disabled={item.cartQuantity >= item.quantity}
          >
            +
          </button>
        </div>
        <button 
          onClick={() => onRemove(item.id)} 
          className="mt-2 text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Payments = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const validatedCart = savedCart.map(item => ({
      ...item,
      cartQuantity: Math.min(Number(item.cartQuantity) || 1, Number(item.quantity) || 0),
      quantity: Number(item.quantity) || 0,
      basePrice: Number(item.basePrice) || 0,
    }));
    setCart(validatedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, cartQuantity: Math.max(1, Math.min(newQuantity, item.quantity)) } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.basePrice * item.cartQuantity), 0);
  };

  const handleCheckout = () => {
    navigate('/order', { state: { cart } });
  };

  if (cart.length === 0) {
    return <p className="p-8 text-xl">Your cart is empty.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        ))}
        <div className="mt-6">
          <p className="text-xl font-bold mb-4">Total: ${calculateTotal().toFixed(2)}</p>
          <button 
            onClick={handleCheckout}
            className="bg-amber-900 text-white px-6 py-2 rounded hover:bg-amber-800 transition-colors duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
