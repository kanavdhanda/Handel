import React from 'react';

const MainCard = ({ name, description, onClick, image}) => {
  return (
    <div 
      className="bg-white shadow-md rounded-md p-5 max-w-[260px] min-w-[260px] h-[360px] flex flex-col justify-between cursor-pointer transition-transform transform hover:scale-[1.03]" 
      onClick={onClick}  // Added onClick to trigger modal
    >
      <img 
        src={image ||'./trial.jpg'} 
        alt={name} 
        className="rounded-lg h-60 mb-3 transition-transform duration-300 ease-in-out"
      />
      <h1 className="font-semibold text-lg text-gray-700">{name}</h1>
      <h2 className="text-gray-500 text-sm">{description}</h2>
    </div>
  );
};

export default MainCard;