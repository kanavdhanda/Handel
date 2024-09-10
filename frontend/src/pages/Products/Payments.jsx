import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the single product passed via state from the Modal
  const product = location.state;
  const [quantity,setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(product.mrp);

  const [response, setResponse] = React.useState([]);

  const dataLao = async () => {
    const response = await fetch("http://localhost:8080/getprod");
    const data = await response.json();
    setResponse(data.data);
  };

  React.useEffect(() => {
    dataLao();
  }, []);

  // Handle order button click
  const handleOrder = (product) => {
    product.quantity = quantity;
    product.mrp = price;
    navigate('/order', { state: { product } });
  };
  
  const handleQty = (value) => {
    if (value) {
      if (quantity >= product.quantity) {
        alert("Cannot add more than available quantity.");
      } else {
        setQuantity(prevQuantity => {
          const newQuantity = prevQuantity + 1;
          setPrice(product.mrp * newQuantity);
          return newQuantity;
        });
      }
    } else {
      if (quantity > 1) {
        setQuantity(prevQuantity => {
          const newQuantity = prevQuantity - 1;
          setPrice(product.mrp * newQuantity);
          return newQuantity;
        });
      }
    }
  }
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
            <p className="text-lg font-semibold text-gray-800">Price Per item: ${product.mrp}</p>
            <p className="text-lg font-semibold text-gray-800">Order Total: ${price}</p>
          </div>
          <img 
            src={product.image || './trial.jpg'}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="">
              <p className="font-semibold">Quantity</p>
            <div className="flex flex-row gap-4">
            <input type="number" className="bg-gray-100 px-4" readOnly value={quantity}></input>
          <div className="hover:cursor-pointer bg-gray-100 px-4 py-1 rounded-md" onClick={()=>handleQty(true)}>+</div>
          <div className="hover:cursor-pointer bg-gray-100 px-4 py-1 rounded-md" onClick={()=>handleQty(false) }>-</div>
            </div>
         
          </div>
          
        </div>

        <div className="mt-8">
          <button 
            onClick={() => handleOrder(product)} 
            className="bg-amber-900 text-white px-10 py-2 border-white hover:bg-white hover:text-amber-950 hover:border-amber-950 border-2 mt-2 transition-colors duration-300 rounded-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
