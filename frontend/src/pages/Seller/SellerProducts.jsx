import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NavigationBar from '../../components/Navbar/NavigationBar';
import MainCard from '../../components/Cards/MainCard';
import Modal from '../../components/Modal';  // Import the modal component
import Cookies from 'js-cookie';

export default function SellerProducts() {
  const [response, setResponse] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);  // To store the selected product

const sellerID = Cookies.get('sellerID');

  const dataLao = async () => {
    const response = await fetch('http://localhost:8080/getprod');
    const data = await response.json();
    const final = data.data;
    setResponse(final);
  };
  const filterResponse = () => {
    const filteredResponse = response.filter((item) => item.sellerID === sellerID);
    // console.log(filteredResponse);
    setResponse(filteredResponse);
  };

  React.useEffect(() => {
    dataLao().then(() => {
      filterResponse();
    });
  }, []);

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