import React from 'react'
import DashTopNav from '../../components/Navbar/DashTopNav'
import DashSideNav from '../../components/Navbar/DashSideNav'

const ShippingDoc = () => {
  return (
    <div className=''>
        
        <div className="relative">
        <DashTopNav className='absolute top-0' />
        <DashSideNav className='absolute top-0' />
        <div className="ml-[330px] mt-[80px] absolute top-0"><div>
          <img src="./ship.webp" className='grayscale' alt="" />
          </div>
          </div>
        </div>
        
    </div>
  )
}

export default ShippingDoc