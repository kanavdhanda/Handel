import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

const DashTopNav = () => {
  return (
    <div className="bg-white flex items-center justify-between px-8 py-2 drop-shadow">
      <Link to='/' className='text-2xl font-normal text-black py-2 cursor-pointer'>HANDEL</Link>
      <div className="flex items-center space-x-4">
        <button className="flex items-center">
          <FaShoppingCart className="mr-2" />
          Cart
        </button>
        <button>Account</button>
      </div>
    </div>
  )
}

export default DashTopNav