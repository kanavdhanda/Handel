import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NavigationBar from '../../components/Navbar/NavigationBar';
import MainCard from '../../components/Cards/MainCard';
import Modal from '../../components/Modal';
import Cookies from 'js-cookie';
import ClipLoader from 'react-spinners/ClipLoader';  // Import the ClipLoader

export default function Products() {
  const [response, setResponse] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const dataLao = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.handelexports.com/getprod');
      const data = await response.json();
      const final = data.data;
      console.log(final);
      setResponse(final);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const setItem = async (item) => {
      setSelectedProduct(item);
  }

  React.useEffect(() => {
    dataLao();
  }, []);

  return (
    <>
      <Navbar />
      <NavigationBar />
      <div className="flex justify-center h-full items-center gap-6 flex-wrap mb-4">
        {loading ? (
          <ClipLoader color="#36D7B7" loading={loading} size={50} />  // Display ClipLoader when loading
        ) : (
          response.map((item, key) => (
            <MainCard
              key={key}
              name={item.name}
              description={item.description}
              image={item.image}
              onClick={() => setItem(item)}
            />
          ))
        )}
      </div>

      {/* Modal that shows when a product is selected */}
      {selectedProduct && (
        <Modal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
