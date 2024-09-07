
import Navbar from '../../components/Navbar/Navbar'
import NavigationBar from '../../components/Navbar/NavigationBar'
import CardSection from '../../components/Section/CardSection'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

const  Home = () => {
  return (
    <>
      <Navbar />
      <NavigationBar />
      <div className='flex justify-center items-center w-full h-[85vh]'>
        <img src={'./HeroBg.jpg'} alt="" className='w-full absolute h-[85vh] -z-40 ' />
        <div className="flex flex-col border border-gray-600 p-10 rounded-lg w-[60%] backdrop-blur-sm">
            <h1 className='text-6xl text-white'>Embrace tradition, shop sustainably</h1>
            <h2 className='text-sm text-white mt-7'>Handicrafted items delivered at your doorstep</h2>
        <Link to="/signup" className='bg-white w-fit px-10 rounded-lg mt-7 py-3 hover:bg-black hover:text-white transition-all'>Sign Up to Shop</Link>
        </div>
      </div>
      <h5 className='flex justify-center items-center text-5xl mt-20 font-serif '>The best Products exist in the makret</h5>
      <CardSection/>
      <div className='flex justify-center items-center bg-amber-800 bg-opacity-60 w-full h-[30vh]'>
        <div className="grid grid-cols-2 mx-32 gap-12">
            <h1 className='text-2xl text-white'>Sign Up to HANDEL's newesletter and get the important infomration first in the market</h1>
            <div className="field flex border-2 rounded-lg border-white justify-between h-14">
                <input type="text" className='bg-transparent active:outline-none focus:outline-none w-full mx-3 text-white' />
                <button className='bg-white px-10 text-nowrap font-semibold flex-nowrap'>Sign Up</button>
            </div>
        </div>
      </div>
      <div className='flex flex-col  justify-center items-center w-full h-[80vh]'>
        <h1 className='mb-10 text-5xl font-serif text-gray-600'>Get organic content from all over the world</h1>
        <img src={'./world_map.png'} alt="" />
      </div>
      <div className='bg-amber-200 bg-opacity-80 flex justify-center items-center w-full h-[50vh]'>
        <div className="grid mx-40 gap-10 grid-cols-2 items-center">
            <div className="">
                <h1 className='text-4xl font-serif mb-5'>We do this</h1>
                <p className='text-gray-900'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus quia esse hic rerum magni temporibus quo reiciendis itaque tenetur, asperiores magnam eligendi, provident eum recusandae fuga alias iusto, natus distinctio.</p>
            </div>
            <div className="">
                <img src={'./world_map.png'} alt="" className=' h-[45vh] rounded-lg' />
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home