import React from 'react'
import { NavLink } from 'react-router-dom'

const DashSideNav = () => {
  return (
    <div className="w-[300px] h-screen bg-white shadow-lg text-slate-600 flex flex-col font-medium ">
      <div className="p-3">
      </div>
      <nav className="flex flex-col flex-grow">
        <NavLink 
          to="/dashboard" 
          className="py-4 px-12 hover:bg-gray-200 transition-colors"
          activeClassName="bg-gray-700"
        >
          Home
        </NavLink>
        <NavLink 
          to="/addprod" 
          className="py-4 px-12 hover:bg-gray-200 transition-colors"
          activeClassName="bg-gray-700"
        >
          Add New Product
        </NavLink>
        <NavLink 
          to="/settings" 
          className="py-4 px-12 hover:bg-gray-200 transition-colors"
          activeClassName="bg-gray-700"
        >
          Product Documentation
        </NavLink>
        <NavLink 
          to="/settings" 
          className="py-4 px-12 hover:bg-gray-200 transition-colors"
          activeClassName="bg-gray-700"
        >
          Shipping Documentation
        </NavLink>
        <NavLink 
          to="/settings" 
          className="py-4 px-12 hover:bg-gray-200 transition-colors"
          activeClassName="bg-gray-700"
        >
          Tax Documentation
        </NavLink>
        <NavLink 
          to="/settings" 
          className="py-4 px-12 hover:bg-gray-200 transition-colors"
          activeClassName="bg-gray-700"
        >
          Global Export News
        </NavLink>
      </nav>
    </div>
  )
}

export default DashSideNav