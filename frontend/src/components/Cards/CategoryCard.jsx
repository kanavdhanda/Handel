import React from 'react';

const CategoryCard = ({ name, description, onClick }) => {
  return (
    <div 
      className=" rounded-md p-5 w-[260px] flex flex-col justify-between cursor-pointer " 
      onClick={onClick}  // Added onClick to trigger modal
    >
      <img 
        src={'./trial.jpg'} 
        alt={name} 
        className="rounded-sm duration-300 ease-in-out mb-4 transition-transform transform hover:scale-[1.03]"
      />
      <h1 className="font-semibold text-lg text-gray-700 text-center">Category</h1>
    </div>
  );
};

export default CategoryCard;