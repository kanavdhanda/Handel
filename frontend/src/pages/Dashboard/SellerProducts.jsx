import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NavigationBar from '../../components/Navbar/NavigationBar';
import MainCard from '../../components/Cards/MainCard';
import Modal from '../../components/Modal';  // Import the modal component
import Cookies from 'js-cookie';
import DashTopNav from '../../components/Navbar/DashTopNav';
import DashSideNav from '../../components/Navbar/DashSideNav';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner

export default function SellerProducts() {
  const [response, setResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]); // State for filtered products
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product
  const [loading, setLoading] = useState(true); // State for loading

  const sellerID = Cookies.get('sellerID');

  const dataLao = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch('https://api.handelexports.com/myproducts');
      const data = await res.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dataLao();
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the response only if it's not empty
    if (response.length > 0) {
      const filtered = response.filter((item) => item.sellerid === sellerID);
      setFilteredResponse(filtered); // Update the filtered response state
    }
  }, [response, sellerID]); // Add sellerID as a dependency to avoid stale closures

  return (
    <>
      <DashTopNav />
      <DashSideNav />
      <div className="ml-[22vw] mt-[14vh] absolute top-0 p-4">
        <div className="flex justify-center h-full items-center gap-6 flex-wrap mb-4">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : filteredResponse.length > 0 ? (
            filteredResponse.map((item, key) => (
              <MainCard
                key={key}
                name={item.name}
                description={item.description}
                image={item.image_url}
                onClick={() => setSelectedProduct(item)} // Open modal with the selected product
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-96">
              <h1 className="text-3xl">No product Uploaded till now</h1>
            </div>
          )}
        </div>

        {/* Modal that shows when a product is selected */}
        {selectedProduct && (
          <Modal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)} // Close modal
          />
        )}
      </div>
    </>
  );
}
