// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

// // const OrderPage = () => {

// //   const { state } = useLocation();
// //   const navigate = useNavigate();
// //   const product = state?.product;
// //   function parseDimensions(dimensions) {
// //     // Remove the "cm" part and split by " x "
// //     const [length, breadth, height] = dimensions.replace(' cm', '').split(' x ').map(Number);
    
// //     return {
// //       length,
// //       breadth,
// //       height
// //     };
// //   }
  
// //   // Example usage
// //   const parsedDimensions = parseDimensions(product.dimensions);
// //   product.length = parsedDimensions.length;
// //   product.height = parsedDimensions.height;
// //   product.breadth = parsedDimensions.breadth;
// //   // console.log(parsedDimensions); // { length: 42, breadth: 42, height: 42 }

// //   // product.length = 
// //   const productPrice = product.mrp;
// //   // console.log(product);
// //   const productName = product?.name;
  
  
// //   // Example usage
// //   // const parsedDimensions = parseDimensions(dimensions);
// //   // console.log(parsedDimensions); // { length: 42, breadth: 42, height: 42 }
// //   const [billingDetails, setBillingDetails] = useState({
// //     billing_customer_name: '',
// //     billing_last_name: '',
// //     billing_address: '',
// //     billing_city: '',
// //     billing_pincode: '',
// //     billing_state: '',
// //     billing_country: '',
// //     billing_email: '',
// //     billing_phone: '',
// //   });
// //   const formValid = Object.values(billingDetails).every((val) => val.trim() !== '');
// //   // Handle form input changes
// //   const handleChange = (e) => {
// //     setBillingDetails({
// //       ...billingDetails,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   // Generate a unique order ID using date and time
// //   const generateOrderId = () => {
// //     const now = new Date();
// //     return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
// //       .getDate()
// //       .toString()
// //       .padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes()
// //       .toString()
// //       .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
// //   };
// //   const handleOrderSubmit = async (e) => {
// //     e.preventDefault(); // Prevent form reload

// //     if (!product || !product.sku) {
// //       alert('Product information is missing.');
// //       return;
// //     }

// //     // Fetch product details ${product.sku}
// //     try {
// //       const res = await fetch(`https://apiv2.shiprocket.in/v1/external/products`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwNTY4NzQsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI1OTk2MDYxLCJqdGkiOiJlOVNFWlFqZWFIY1dra0drIiwiaWF0IjoxNzI1MTMyMDYxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTEzMjA2MSwiY2lkIjo0ODczOTI3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.0nCQkx_o7Mj48ssbE3EbnCPl_AItWswsTZ9oKQmg9UU',
// //         },
// //       });

// //       if (res.ok) {
// //         const data = await res.json();
// //         const fetchedProduct = data.data.find((p) => p.sku === product.sku);
// //         const sellingPrice = fetchedProduct?.mrp !== 0 ? parseFloat(fetchedProduct.mrp) : 100;
// //         const hsn = fetchedProduct?.hsn !== 0 ? parseInt(fetchedProduct.hsn) : 100;

// //         const orderDetails = {
// //           order_id: generateOrderId(),
// //           order_date: new Date().toISOString(),
// //           pickup_location: 'Primary',
// //           billing_customer_name: billingDetails.billing_customer_name,
// //           billing_last_name: billingDetails.billing_last_name,
// //           billing_address: billingDetails.billing_address,
// //           billing_city: billingDetails.billing_city,
// //           billing_pincode: parseInt(billingDetails.billing_pincode),
// //           billing_state: billingDetails.billing_state,
// //           billing_country: billingDetails.billing_country,
// //           billing_email: billingDetails.billing_email,
// //           billing_phone: parseInt(billingDetails.billing_phone),
// //           shipping_is_billing: true,
// //           order_items: [
// //             {
// //               name: product.name,
// //               sku: product.sku,
// //               units: 1,
// //               selling_price: sellingPrice || 100,
// //             },
// //           ],
// //           payment_method: 'Prepaid',
// //           sub_total: sellingPrice || 100,
// //           length: parseFloat(product.length) || 2.0,
// //           breadth: parseFloat(product.breadth) || 2.0,
// //           height: parseFloat(product.height) || 2.0,
// //           weight: parseFloat(product.weight) || 2.0,// Converted from "0.5 Kg" to float
// //           hsn: parseInt(product.hsn),
// //         };

// //         const orderRes = await fetch('https://api.handelexports.com/order', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(orderDetails),
// //         }); 
// //         if (orderRes.ok) {
// //           alert('Order placed successfully');
// //           navigate('/');
// //         } else {
// //           alert('Error placing order');
// //         }
// //       } else {
// //         alert('Error fetching product details');
// //       }
// //     } catch (error) {
// //       console.error('Error placing order:', error);
// //     }};

  

// //   return (
// //   <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
// //     <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Complete Your Order</h2>

// //     {/* Display selected product details */}
// //     <div className="product-details bg-gray-100 p-4 rounded-lg mb-6">
// //       <p className="text-lg font-medium text-gray-700">
// //         <strong>Product Name:</strong> {product.name || 'N/A'}
// //       </p>
// //       <p className="text-lg font-medium text-gray-700">
// //         <strong>Price:</strong> ${product.mrp || 'N/A'}
// //       </p>
// //     </div>

// //     {/* Order form */}
// //     <form onSubmit={handleOrderSubmit} className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <input
// //           type="text"
// //           name="billing_customer_name"
// //           placeholder="First Name"
// //           value={billingDetails.billing_customer_name}
// //           onChange={handleChange}
// //           className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="billing_last_name"
// //           placeholder="Last Name"
// //           value={billingDetails.billing_last_name}
// //           onChange={handleChange}
// //           className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />
// //       </div>

// //       <input
// //         type="text"
// //         name="billing_address"
// //         placeholder="Address"
// //         value={billingDetails.billing_address}
// //         onChange={handleChange}
// //         className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         required
// //       />

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <input
// //           type="text"
// //           name="billing_city"
// //           placeholder="City"
// //           value={billingDetails.billing_city}
// //           onChange={handleChange}
// //           className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="billing_pincode"
// //           placeholder="Pincode"
// //           value={billingDetails.billing_pincode}
// //           onChange={handleChange}
// //           className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <input
// //           type="text"
// //           name="billing_state"
// //           placeholder="State"
// //           value={billingDetails.billing_state}
// //           onChange={handleChange}
// //           className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="billing_country"
// //           placeholder="Country"
// //           value={billingDetails.billing_country}
// //           onChange={handleChange}
// //           className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />
// //       </div>

// //       <input
// //         type="email"
// //         name="billing_email"
// //         placeholder="Email"
// //         value={billingDetails.billing_email}
// //         onChange={handleChange}
// //         className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         required
// //       />

// //       <input
// //         type="text"
// //         name="billing_phone"
// //         placeholder="Phone Number"
// //         value={billingDetails.billing_phone}
// //         onChange={handleChange}
// //         className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         required
// //       />

// //       {/* <button
// //         type="submit"
// //         className="w-full bg-amber-800 text-white py-3 rounded-lg hover:border-2 hover:bg-white hover:text-amber-900 hover:border-amber-700 transition-all duration-300"
// //       >
// //         Place Order
// //       </button> */}
// //       {!formValid && <p className="text-red-500">Please fill all the fields to proceed</p>}
// //       {formValid && <PayPalScriptProvider options={{ "client-id": "AR02Lr1koiZV9rdSvF90JJSrI8S1gMd0FVURtZ2Bd4IfBGUmTiXu8HSG07kj2vrnPSI-jOcfbUBww8Bw" }}>
// //           <PayPalButtons
// //             createOrder={(data, actions) => {
// //               if (productPrice <= 0) {
// //                 console.error('Invalid product price');
// //                 return;
// //               }
// //               return actions.order.create({
// //                 purchase_units: [
// //                   {
// //                     amount: { value: productPrice.toString() },
// //                   },
// //                 ],
// //               });
// //             }}
// //             onApprove={(data, actions) => {
// //               return actions.order.capture().then(() => {
// //                 handleOrderSubmit(); // Call after successful paymentx
// //               });
// //             }}
// //             onError={(err) => {
// //               console.error('PayPal Checkout onError', err);
// //               alert('There was an error with PayPal. Please try again.');
// //             }}
// //           />
// //         </PayPalScriptProvider>}
      
// //     </form>
// //   </div>
// // );}

// // export default OrderPage;
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

// const OrderPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const product = state?.product;

//   function parseDimensions(dimensions) {
//     const [length, breadth, height] = dimensions.replace(' cm', '').split(' x ').map(Number);
//     return { length, breadth, height };
//   }

//   const parsedDimensions = parseDimensions(product.dimensions);
//   product.length = parsedDimensions.length;
//   product.height = parsedDimensions.height;
//   product.breadth = parsedDimensions.breadth;
//   const productPrice = product.mrp;
//   const productName = product?.name;

//   const [billingDetails, setBillingDetails] = useState({
//     billing_customer_name: '',
//     billing_last_name: '',
//     billing_address: '',
//     billing_city: '',
//     billing_pincode: '',
//     billing_state: '',
//     billing_country: '',
//     billing_email: '',
//     billing_phone: '',
//   });

//   const formValid = Object.values(billingDetails).every((val) => val.trim() !== '');

//   const handleChange = (e) => {
//     setBillingDetails({
//       ...billingDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const generateOrderId = () => {
//     const now = new Date();
//     return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
//       .getDate()
//       .toString()
//       .padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes()
//       .toString()
//       .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
//   };

//   const handleOrderSubmit = async (details) => {
//     try {
//       const sellingPrice = product.mrp || 100;
//       const orderDetails = {
//         order_id: generateOrderId(),
//         order_date: new Date().toISOString(),
//         pickup_location: 'Primary',
//         billing_customer_name: billingDetails.billing_customer_name,
//         billing_last_name: billingDetails.billing_last_name,
//         billing_address: billingDetails.billing_address,
//         billing_city: billingDetails.billing_city,
//         billing_pincode: parseInt(billingDetails.billing_pincode),
//         billing_state: billingDetails.billing_state,
//         billing_country: billingDetails.billing_country,
//         billing_email: billingDetails.billing_email,
//         billing_phone: parseInt(billingDetails.billing_phone),
//         shipping_is_billing: true,
//         order_items: [
//           {
//             name: product.name,
//             sku: product.sku,
//             units: 1,
//             selling_price: sellingPrice,
//           },
//         ],
//         payment_method: 'PayPal',
//         sub_total: sellingPrice,
//         length: parseFloat(product.length) || 2.0,
//         breadth: parseFloat(product.breadth) || 2.0,
//         height: parseFloat(product.height) || 2.0,
//         weight: parseFloat(product.weight) || 2.0,
//         hsn: parseInt(product.hsn),
//       };

//       const orderRes = await fetch('https://api.handelexports.com/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderDetails),
//       });

//       if (orderRes.ok) {
//         alert('Order placed successfully');
//         navigate('/');
//       } else {
//         alert('Error placing order');
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <PayPalScriptProvider options={{ "client-id": "AR02Lr1koiZV9rdSvF90JJSrI8S1gMd0FVURtZ2Bd4IfBGUmTiXu8HSG07kj2vrnPSI-jOcfbUBww8Bw" }}>
//       <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Complete Your Order</h2>

//         <div className="product-details bg-gray-100 p-4 rounded-lg mb-6">
//           <p className="text-lg font-medium text-gray-700">
//             <strong>Product Name:</strong> {product.name || 'N/A'}
//           </p>
//           <p className="text-lg font-medium text-gray-700">
//             <strong>Price:</strong> ${product.mrp || 'N/A'}
//           </p>
//         </div>

//         <form className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input
//               type="text"
//               name="billing_customer_name"
//               placeholder="First Name"
//               value={billingDetails.billing_customer_name}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="text"
//               name="billing_last_name"
//               placeholder="Last Name"
//               value={billingDetails.billing_last_name}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <input
//             type="text"
//             name="billing_address"
//             placeholder="Address"
//             value={billingDetails.billing_address}
//             onChange={handleChange}
//             className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input
//               type="text"
//               name="billing_city"
//               placeholder="City"
//               value={billingDetails.billing_city}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="text"
//               name="billing_pincode"
//               placeholder="Pincode"
//               value={billingDetails.billing_pincode}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input
//               type="text"
//               name="billing_state"
//               placeholder="State"
//               value={billingDetails.billing_state}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="text"
//               name="billing_country"
//               placeholder="Country"
//               value={billingDetails.billing_country}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <input
//             type="email"
//             name="billing_email"
//             placeholder="Email"
//             value={billingDetails.billing_email}
//             onChange={handleChange}
//             className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <input
//             type="text"
//             name="billing_phone"
//             placeholder="Phone Number"
//             value={billingDetails.billing_phone}
//             onChange={handleChange}
//             className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           {!formValid && <p className="text-red-500">Please fill all the fields to proceed</p>}

//           {formValid && (
//             <PayPalButtons
//               createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [{
//                     amount: {
//                       value: productPrice.toString(),
//                     },
//                   }],
//                 });
//               }}
//               onApprove={async (data, actions) => {
//                 const details = await actions.order.capture();
//                 handleOrderSubmit(details);
//               }}
//               onError={(err) => {
//                 console.error('PayPal Checkout Error:', err);
//               }}
//             />
//           )}
//         </form>
//       </div>
//     </PayPalScriptProvider>
//   );
// };

// export default OrderPage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (state && state.cart) {
      const updatedCart = state.cart.map(item => ({
        ...item,
        ...parseDimensions(item.dimensions),
      }));
      setCart(updatedCart);
    }
  }, [state]);

  function parseDimensions(dimensions) {
    const [length, breadth, height] = dimensions.replace(' cm', '').split(' x ').map(Number);
    return { length, breadth, height };
  }

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

  const formValid = Object.values(billingDetails).every((val) => val.trim() !== '');

  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const generateOrderId = () => {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
      .getDate()
      .toString()
      .padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes()
      .toString()
      .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.mrp * item.cartQuantity), 0);
  };

  const handleOrderSubmit = async (details) => {
    try {
      const orderItems = cart.map(item => ({
        name: item.name,
        sku: item.sku,
        units: item.cartQuantity,
        selling_price: item.mrp,
      }));

      const orderDetails = {
        order_id: generateOrderId(),
        order_date: new Date().toISOString(),
        pickup_location: 'Primary',
        billing_customer_name: billingDetails.billing_customer_name,
        billing_last_name: billingDetails.billing_last_name,
        billing_address: billingDetails.billing_address,
        billing_city: billingDetails.billing_city,
        billing_pincode: parseInt(billingDetails.billing_pincode),
        billing_state: billingDetails.billing_state,
        billing_country: billingDetails.billing_country,
        billing_email: billingDetails.billing_email,
        billing_phone: parseInt(billingDetails.billing_phone),
        shipping_is_billing: true,
        order_items: orderItems,
        payment_method: 'PayPal',
        sub_total: calculateTotal(),
        length: Math.max(...cart.map(item => parseFloat(item.length) || 2.0)),
        breadth: Math.max(...cart.map(item => parseFloat(item.breadth) || 2.0)),
        height: Math.max(...cart.map(item => parseFloat(item.height) || 2.0)),
        weight: cart.reduce((total, item) => total + (parseFloat(item.weight) || 2.0) * item.cartQuantity, 0),
      };

      const orderRes = await fetch('https://api.handelexports.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (orderRes.ok) {
        alert('Order placed successfully');
        navigate('/');
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AR02Lr1koiZV9rdSvF90JJSrI8S1gMd0FVURtZ2Bd4IfBGUmTiXu8HSG07kj2vrnPSI-jOcfbUBww8Bw" }}>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Complete Your Order</h2>

        <div className="product-details bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <p className="text-lg">{item.name} (x{item.cartQuantity})</p>
              <p className="text-lg font-medium">${(item.mrp * item.cartQuantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <p className="text-xl font-bold text-right">Total: ${calculateTotal().toFixed(2)}</p>
          </div>
        </div>

        <form className="space-y-6">
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

          {!formValid && <p className="text-red-500">Please fill all the fields to proceed</p>}

          {formValid && (
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: calculateTotal().toFixed(2),
                    },
                  }],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                handleOrderSubmit(details);
              }}
              onError={(err) => {
                console.error('PayPal Checkout Error:', err);
              }}
            />
          )}
        </form>
      </div>
    </PayPalScriptProvider>
  );
};

export default OrderPage;