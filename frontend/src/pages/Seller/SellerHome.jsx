import React from 'react'
import { Link } from 'react-router-dom'

const SellerHome = () => {
  return (
    <div>
        <div className="hero flex justify-center items-center h-[100vh] w-full flex-col">
            <img src={'./sellerHero.jpg'} alt="" className='w-full absolute h-[85vh] -z-40 bg-opacity-90' />
            <div className="flex flex-col border border-gray-600 p-10 rounded-lg w-[60%] backdrop-blur-sm">
            <h1 className='text-6xl text-white'>Export from India with Handel</h1>
            <h2 className='text-sm text-white mt-7'>Export via e-commerce and reach hundreds of millions of customers shopping on Amazon globally.</h2>
        <Link to="/signup" className='bg-white w-fit px-10 rounded-lg mt-7 py-3 hover:bg-black hover:text-white transition-all'>Sign Up to Shop</Link>
        </div>
        </div>
        <div className="flex justify-center items-center w-full">
            <div className="steps grid grid-cols-3 w-[80%] gap-6">
                <div className="card shadow-lg rounded-sm p-10">
                    <h1 className='mb-5'>image</h1>
                    <h1 className='mb-3 text-2xl font-semibold text-amber-950'>Register to export</h1>
                    <p className='mb-4 text-[13px]'>Choose any or all the 18 global marketplaces you want to export to. Register by submitting your identity proof, address proof and credit or debit card (international transactions enabled).</p>
                    <button className='w-full bg-amber-700 text-white rounded-lg py-2 hover:bg-white hover:text-amber-800 hover:border-2 hover:border-amber-950 transition-all'>how to register</button>
                </div>
                <div className="card shadow-lg rounded-sm p-10">
                    <h1 className='mb-5'>image</h1>
                    <h1 className='mb-3 text-2xl font-semibold text-amber-950'>List your products</h1>
                    <p className='mb-4 text-[13px]'>Once registered, list your products on Amazon marketplaces. Use latest tools and expert services to make your listings more visible to customers.</p>
                    <button className='w-full bg-amber-700 text-white rounded-lg py-2 hover:bg-white hover:text-amber-800 hover:border-2 hover:border-amber-950 transition-all'>how to register</button>
                </div>
                <div className="card shadow-lg rounded-sm p-10">
                    <h1 className='mb-5'>image</h1>
                    <h1 className='mb-3 text-2xl font-semibold text-amber-950'>Ship and deliver globally</h1>
                    <p className='mb-4 text-[13px]'>Choose to manage your own logistics or get expert support from Amazon to store, pack, ship and deliver internationally with Fulfillment by Amazon (FBA).</p>
                    <button className='w-full bg-amber-700 text-white rounded-lg py-2 hover:bg-white hover:text-amber-800 hover:border-2 hover:border-amber-950 transition-all'>how to register</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SellerHome