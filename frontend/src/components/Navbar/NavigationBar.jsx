import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div className='flex justify-between px-12 h-16 items-center'>
        <div className="">All categories</div>
        <div className="">
            <ul className="flex gap-6 ">
              <Link to='/'><li className="navele">Home</li></Link>
                <li className="navele">Best Selling</li>
                <Link to='/products'><li className="navele">Products</li></Link>
                <li className="navele">Events</li>
                <li className="navele">FAQ</li>
            </ul>
        </div>
        <div className="">
            {/* <Link to='/login'>Login</Link> */}
            {/* <button>icon</button>
            <button>icon</button> */}
        </div>
    </div>
  )
}

export default NavigationBar