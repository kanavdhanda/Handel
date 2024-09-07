import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DashTopNav = () => {
  return (
    <div className=" bg-white flex items-center justify-between px-8 py-2 drop-shadow">
        <Link to='/' className=' text-2xl font-normal text-black py-2 cursor-pointer'>HANDEL</Link>
        <button>Account</button>
    </div>
  )
}

export default DashTopNav