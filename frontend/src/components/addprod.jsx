import { useState } from 'react';
import Cookie from 'js-cookie';
function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [type, setType] = useState('');
  const [qty, setQty] = useState('');
  const [sku, setSku] = useState('');
  const [mrp, setMrp] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [hsn, setHsn] = useState('');
  const [imgLink, setImgLink] = useState('');
  //const [taxCode, setTaxCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const sellerid = Cookie.get('sellerID');
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any fields are empty
    if (!name || !categoryCode || !type || !qty || !sku || !mrp || !width || !height || !weight || !length) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Prepare the product data to be sent
    try {
      const productData = {
        name,
        category_code: categoryCode,
        type,
        qty,
        sku,
        mrp,
        description,
        length,
        width,
        hsn,
        //tax_code: taxCode,
        height,
        weight,
        sellerid,
        image_url: imgLink,
      };
      console.log(productData);
      setLoading(true); // Start loading
      const response = await fetch('https://api.handelexports.com/addprod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Product not added'}`);
      } else {
        const data = await response.json();
        setMessage(`Success: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding product');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className=" w-[700px] p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">List a new product</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-medium text-gray-700">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Category Code:
            <input
              type="text"
              value={categoryCode}
              onChange={(e) => setCategoryCode(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Type:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Quantity:
            <input
              type="text"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            SKU:
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            MRP:
            <input
              type="text"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Length:
            <input
              type="text"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Width:
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Height:
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Weight:
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            HSN:
            <input
              type="text"
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Image Link:
            <input
              type="text"
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-amber-800 text-white rounded-md hover:bg-amber-700 transition-all"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 p-2 text-center rounded-md ${
            message.startsWith('Success')
              ? 'bg-green-100 text-green-800'
              : 'bg-green-100 text-green-8000'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ProductForm;