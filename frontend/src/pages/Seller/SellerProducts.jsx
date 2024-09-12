import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NavigationBar from '../../components/Navbar/NavigationBar';
import MainCard from '../../components/Cards/MainCard';
import Modal from '../../components/Modal';  // Import the modal component
import Cookies from 'js-cookie';
import {useEffect} from 'react';
export default function SellerProducts() {
  const [response, setResponse] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);  // To store the selected product

const sellerID = Cookies.get('sellerID');

const dataLao = async () => {
  try {
    const response = await fetch('http://localhost:8080/myproducts');
    const data = await response.json();
    setResponse(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const filterResponse = (data) => {
  const filteredResponse = data.filter((item) => item.sellerid === sellerID);
  setResponse(filteredResponse);
};

useEffect(() => {
  const fetchData = async () => {
    await dataLao();
  };

  fetchData();
}, []);

useEffect(() => {
  if (response.length > 0) {
    filterResponse(response);
  }
}, [response]); // Ensure filtering is triggered when response is updated


  return (
    <>
      <Navbar />
      <NavigationBar />
      <div className="flex justify-center h-full items-center gap-6 flex-wrap mb-4">
        {response.map((item, key) => (
          <MainCard
            key={key}
            name={item.name}
            description={item.description}
            onClick={() => setSelectedProduct(item)}  // Open modal with the selected product
          />
        ))}
      </div>

      {/* Modal that shows when a product is selected */}
      {selectedProduct && (
        <Modal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}  // Close modal
        />
      
      )}
      {!selectedProduct && (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-3xl">No product Uploaded till now</h1>
        </div>
      )}
    </>
  );
}