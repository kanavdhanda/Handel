import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [billingDetails, setBillingDetails] = useState({
    billing_customer_name: '',
    billing_last_name: '',
    billing_address: '',
    billing_city: '',
    billing_pincode: '',
    billing_state: '',
    billing_country: '',
    billing_email: '',
    billing_phone: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Generate a unique order ID using date and time
  const generateOrderId = () => {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
      .getDate()
      .toString()
      .padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes()
      .toString()
      .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  };

  // Handle form submission (place order)
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      order_id: generateOrderId(),
      order_date: new Date().toISOString(),
      pickup_location: 'Primary',
      billing_customer_name: billingDetails.billing_customer_name,
      billing_last_name: billingDetails.billing_last_name,
      billing_address: billingDetails.billing_address,
      billing_city: billingDetails.billing_city,
      billing_pincode: billingDetails.billing_pincode,
      billing_state: billingDetails.billing_state,
      billing_country: billingDetails.billing_country,
      billing_email: billingDetails.billing_email,
      billing_phone: billingDetails.billing_phone,
      shipping_is_billing: true,
      order_items: [
        {
          name: product.name,
          sku: '32f3',
          units: 1,
          selling_price: product.selling_price || 100,  // Ensure it has a valid value
        },
      ],
      payment_method: 'COD',
      sub_total: product.selling_price || 100,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 2.5,
    };

    try {
      const res = await fetch('http://localhost:8080/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (res.ok) {
        alert('Order placed successfully');
        navigate('/');  // Navigate back to product page or another page
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Complete Your Order</h2>

    {/* Display selected product details */}
    <div className="product-details bg-gray-100 p-4 rounded-lg mb-6">
      <p className="text-lg font-medium text-gray-700">
        <strong>Product Name:</strong> {product.name || 'N/A'}
      </p>
      <p className="text-lg font-medium text-gray-700">
        <strong>Price:</strong> ₹{product.price || 'N/A'}
      </p>
    </div>

    {/* Order form */}
    <form onSubmit={handleOrderSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="billing_customer_name"
          placeholder="First Name"
          value={billingDetails.billing_customer_name}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="billing_last_name"
          placeholder="Last Name"
          value={billingDetails.billing_last_name}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <input
        type="text"
        name="billing_address"
        placeholder="Address"
        value={billingDetails.billing_address}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="billing_city"
          placeholder="City"
          value={billingDetails.billing_city}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="billing_pincode"
          placeholder="Pincode"
          value={billingDetails.billing_pincode}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="billing_state"
          placeholder="State"
          value={billingDetails.billing_state}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="billing_country"
          placeholder="Country"
          value={billingDetails.billing_country}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <input
        type="email"
        name="billing_email"
        placeholder="Email"
        value={billingDetails.billing_email}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="billing_phone"
        placeholder="Phone Number"
        value={billingDetails.billing_phone}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-amber-800 text-white py-3 rounded-lg hover:border-2 hover:bg-white hover:text-amber-900 hover:border-amber-700 transition-all duration-300"
      >
        Place Order
      </button>
    </form>
  </div>
);}

export default OrderPage;
