import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/login")
    }

    const handleSearch = () => {

    }
    const onClearSearch = () => {
        setSearchQuery('')
    }

  return (
    <div className=" bg-white flex items-center justify-between px-8 py-2 drop-shadow sticky top-0 z-50">
        <h2 className='text-2xl  text-black py-2 cursor-pointer logo' onClick={() => {navigate('/')}}>HANDEL</h2>

        <SearchBar value={searchQuery} onChange={({target}) => {
            setSearchQuery(target.value)
        }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <div className="flex gap-4 items-center">
            <Link to="/sellerhome" className='rounded-xl bg-slate-800 text-white px-6 py-2 text-sm hover:text-slate-800 hover:bg-white transition-all border-2 border-slate-800'>Manfacture</Link>
            <Link to='/signup' className='text-sm text-slate-500'>Become a seller </Link>
          </div>

    </div>
  )
}

export default Navbar