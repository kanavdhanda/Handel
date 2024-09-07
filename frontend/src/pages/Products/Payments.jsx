import { useLocation } from 'react-router-dom';
export default function Payments(){
    


  const location = useLocation();
  const data = location.state;

    return(
        <div className=''>
            <div className="relative">
            <div className='absolute top-0'>
                <div className='bg-[#333] w-full h-12 flex items-center justify-between px-4'>
                    <div className='text-white text-lg font-bold'>Payments</div>
                </div>
            </div>
            <div className="ml-[330px] mt-[80px] absolute top-0">
                <div>
                    <img src="./payment.webp" className='grayscale' alt="" />
                    akjdasjdnj
                </div>
            </div>
            </div>
        </div>
    )
}