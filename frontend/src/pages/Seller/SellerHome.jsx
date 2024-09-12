import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'

const SellerHome = () => {
  return (
    <div>
        <Navbar/>
        <div className="hero flex justify-center items-center h-[85vh] w-full flex-col">
            <img src={'./sellerHero.jpg'} alt="" className='w-full absolute h-[85vh] -z-40 text-opacity-' />
            <div className="flex flex-col border border-gray-600 p-10 rounded-lg w-[60%] backdrop-blur-sm">
            <h1 className='text-6xl text-white'>Export from India with Handel</h1>
            <h2 className='text-sm text-white mt-7'>Export via e-commerce and reach hundreds of millions of customers shopping on Handel.</h2>
        <Link to="/signup" className='bg-white w-fit px-10 rounded-lg mt-7 py-3 hover:bg-black hover:text-white transition-all'>Sign Up to Shop</Link>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full mt-10">
            <h1 className='text-4xl font-semibold mb-7'>3 steps to sell your product....</h1>
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
        <div className=" bg-white mt-10 h-[50vh] flex justify-center items-center w-full flex-col">
            <h1 className='text-5xl font-semibold mb-10'>Why export through Handel?</h1>
                <div className="grid grid-cols-3 mx-20 gap-10 ">
                    <div className="card p-10 shadow-lg bg-amber-100">
                        <h1 className='font-bold mb-3 text-2xl'>1200+</h1>
                        <hr className='text-amber-800 mb-3' />
                        <p>Indian exporters crossed $120,000 (INR 1 crore) in sales on Amazon Global Selling in 2022. You could be next.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-amber-100">
                        <h1 className='font-bold mb-2 text-2xl'>$8 billion+</h1>
                        <hr className='text-amber-800 mb-2' />
                        <p>Amazon Global Selling enabled $8 billion in cumulative e-commerce exports from India by end of 2023.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-amber-100">
                        <h1 className='font-bold mb-2 text-2xl'>266 million+</h1>
                        <hr className='text-amber-800 mb-2' />
                        <p>Products sold to international customers on Amazon marketplaces by Indian exporters.</p>
                    </div>
                    
                </div>
        </div>

        <div className='bg-amber-100 bg-opacity-80 flex justify-center items-center w-full mt-10 h-[60vh]'>
        <div className="grid mx-40 gap-10 grid-cols-2 items-center">
            <div className="">
                <h1 className='text-5xl font-serif mb-8'>We Help In Selling Organic Content</h1>
                <p className='text-gray-900 text-[15px]'>At Handel, we focus on exporting premium organic products sourced from certified farms. We ensure that all our products meet international organic standards, maintaining their quality through strict checks. By handling global logistics and customs regulations, we help farmers and producers bring their organic goods to international markets. Our commitment to sustainability and transparency builds trust with consumers, while supporting eco-friendly farming practices and promoting the global demand for organic products.</p>
            </div>
            <div className="">
                <img src={'./world_map.png'} alt="" className=' h-[45vh] rounded-lg' />
            </div>
        </div>
        </div>

        <div className=" bg-white mt-10 h-[100vh] flex justify-center items-center w-full flex-col">
            <h1 className='text-5xl font-semibold mb-10 text-left'>Support at every step of your export journey</h1>
                <div className="grid grid-cols-3 mx-20 gap-10 ">
                    <div className="card p-10 shadow-lg bg-gray-100">
                        <h1 className='font-semibold mb-3 text-2xl'>Assistance for export documentation</h1>
                        <p className='text-[12px]'>Get guidance on documents required for registration, product, shipping, tax and payment reconciliation with Amazon Export Compliance Dashboard.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-gray-100">
                        <h1 className='font-semibold mb-2 text-2xl'>Hassle-free global logistics</h1>
                        <p className='text-[12px]'>You can ship directly to customers using your own logistics service through Merchant Fulfilled Network (MFN). If you opt for Fulfillment by Amazon (FBA), you store your products in Amazon global FCs, while Amazon picks, packs, ships orders and provides customer service.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-gray-100">
                        <h1 className='font-semibold mb-2 text-2xl'>Services for every need</h1>
                        <p className='text-[12px]'>Explore and get support from our network of qualified third-party service providers. They can help you with everything you need to register, manage, and grow your export business across the world.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-gray-100">
                        <h1 className='font-semibold mb-3 text-2xl'>Get noticed with advertising</h1>
                        <p className='text-[12px]'>To increase visibility and sales on international marketplaces, Amazon offers advertising where exporters can run sponsored ads, sponsored brands and display ads.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-gray-100">
                        <h1 className='font-semibold mb-3 text-2xl'>Protect and grow your global brand</h1>
                        <p className='text-[12px]'>Amazon helps brands of all types and sizes build, grow and protect their business by offering tools like A+ Content and Brand Registry.</p>
                    </div>
                    <div className="card p-10 shadow-lg bg-gray-100">
                        <h1 className='font-semibold mb-3 text-2xl'>Upgrade your skills with webinars</h1>
                        <p className='text-[12px]'>Attend webinars, events and watch training videos to optimize your exports business that help you no matter where you are in your seller journey.</p>
                    </div>

                </div>
        </div>

        <div className='flex justify-center flex-col gap-7 items-center bg-amber-800 bg-opacity-60 w-full h-[30vh]'>
            <h1 className='text-2xl text-white'>Sign Up to HANDEL and be a part of this marketplace</h1>
                <Link to='/signup' className='bg-white px-36 text-nowrap font-semibold flex-nowrap rounded-full py-3 hover:border-2 hover:text-white transition-all  hover:bg-amber-800 hover:bg-opacity-60'>Sign Up</Link>
        </div>
        <Footer/>
    </div>
  )
}

export default SellerHome