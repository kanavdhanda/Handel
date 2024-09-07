import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full'>
        <div className="h-[2px] bg-gray-500 w-full"></div>
        <div className="mx-20">
        <div className="ender flex justify-between mb-10 mt-2">
            <div className="">
                <div className='mb-2 text-gray-500'><h2 className='text-sm font-normal'>@2024 Handel </h2></div>
                <div className='flex gap-3 text-xs font-light text-gray-500 hover:text-gray-950'>
                    <Link>T and C</Link>
                    <Link>Privacy Policy</Link>
                    <Link>Cookie Policy</Link>
                    <Link>IP Policy</Link>
                    <Link>Sitemap</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer