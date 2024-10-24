const Cart = ({ item }) => {
    return (
      <div className='cart-item bg-white shadow-md rounded-lg p-4 m-2'>
        <img src={item.image} alt={item.name} className='w-full h-32 object-cover rounded-md' />
        <div className='mt-2'>
          <h2 className='text-lg font-bold'>{item.name}</h2>
          <p className='text-gray-600'>{item.description}</p>
          <div className='text-right mt-2'>
            <span className='text-xl font-semibold'>${item.mrp}</span>
          </div>
        </div>
      </div>      
    );
  };
  
  export default Cart;