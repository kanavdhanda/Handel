import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NavigationBar from '../../components/Navbar/NavigationBar';
import MainCard from '../../components/Cards/MainCard';
import Modal from '../../components/Modal';  // Import the modal component

export default function Products() {
  const [response, setResponse] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);  // To store the selected product

  const dataLao = async () => {
    const response = await fetch('http://172.16.130.72:8080/getprod');
    const data = await response.json();
    const final = data.data;
    setResponse(final);
  };

  React.useEffect(() => {
    dataLao();
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
    </>
  );
}