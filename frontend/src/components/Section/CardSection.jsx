import React from 'react';
import MainCard from '../Cards/MainCard';
import { useNavigate } from 'react-router-dom';

const CardSection = () => {
  const [response, setResponse] = React.useState([]);
  const navigate = useNavigate();

  // Fetch products from the backend
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
    navigate('/order', { state: { product } });
  };

  return (
    <div className='flex justify-center h-[60vh] items-center gap-6'>
      {
        response.map((item, key) => (
          <div key={key} className="flex flex-col items-center">
            <MainCard 
              index={key} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image}
            />
            <button 
              onClick={() => handleOrder(item)} 
              className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Order
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default CardSection;
