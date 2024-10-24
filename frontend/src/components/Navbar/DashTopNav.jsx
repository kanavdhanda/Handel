import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const DashTopNav = () => {
  const navigate = useNavigate();
  const [isLogged,setIsLogged] = React.useState(false);

  const logout = () =>{
    Cookies.set('sellerID','', {expires : 0})
    navigate('/');
  }
  React.useEffect(()=>{
    const logged = Cookies.get('sellerID');
    if(logged){
      setIsLogged(true);
    }
    else{
      alert('Please Login');
      // setTimeout(()=>{
      // },1000)
      navigate('/')

    }
  },[])

  return (
    <div className="bg-white flex items-center justify-between px-8 py-2 drop-shadow">
      <Link to='/' className='text-2xl font-normal text-black py-2 cursor-pointer'>HANDEL</Link>
      <div className="flex items-center space-x-4">
        {/* <button className="flex items-center">
          <FaShoppingCart className="mr-2" />
          Cart
        </button> */}

        <button onClick={logout} className='rounded-lg bg-slate-800 text-white px-12 py-2 text-sm hover:text-slate-800 hover:bg-white transition-all border-2 border-slate-800'>Logout</button>
      </div>
    </div>
  )
}

export default DashTopNav