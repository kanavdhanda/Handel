import React, { useState } from 'react'
import MainCard from '../Cards/MainCard'
import Modal from '../Modal';

const CardSection = () => {

  const [response,setResponse] = React.useState([]); 
  const [selectedProduct, setSelectedProduct] = React.useState(null);  // To store the selected product 
  const dataLao = async () =>{
    const response = await fetch("http://localhost:8080/getprod");
    const data = await response.json();
    const final = data.data;
    // return final;

    setResponse(final);

  }

  React.useEffect(()=>{
    dataLao();
  },[])
  return (
    <>
      <div className='flex justify-center h-[60vh] items-center gap-6'>
        {Array.isArray(response) && response.length > 0 ? (
          response.map((item, key) => (
            <MainCard 
              key={key} 
              name={item.name} 
              description={item.description}
              onClick={() => setSelectedProduct(item)}  // Open modal with the selected product
            />
          ))
        ) : (
          <p>No products available</p>  // Handle cases when there are no products
        )}
      </div>
      {selectedProduct && (
        <Modal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}  // Close modal
        />
      )}
    </>
  );}

export default CardSection;
