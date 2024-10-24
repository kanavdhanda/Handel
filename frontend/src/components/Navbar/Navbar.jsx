import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import SearchBar from '../SearchBar/SearchBar';
import Cookies from 'js-cookie'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);

    const onLogout = () => {
        Cookies.set("sellerID", '', { expires: 0 });
        setIsLogged(false);
        navigate(0);
    }

    const handleSearch = () => {
        // Implement search functionality
    }

    const onClearSearch = () => {
        setSearchQuery('')
    }

    useEffect(() => {
        const sellerID = Cookies.get('sellerID');
        if (sellerID) {
            setIsLogged(true);
        }
    }, []); // Added dependency array to avoid running this effect on every render

    return (
        <div className="bg-white flex items-center justify-between px-8 py-2 drop-shadow sticky top-0 z-50">
            <h2 className='text-2xl text-black py-2 cursor-pointer logo' onClick={() => { navigate('/') }}>HANDEL</h2>

            <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <div className="flex gap-4 items-center">
                
                {isLogged ? (
                    <><button className="flex items-center text-slate-800 hover:text-slate-600 transition-colors" onClick={() => { navigate("/cart") }}>
                    <FaShoppingCart className="mr-2" />
                    Cart
                </button>
                <button onClick={onLogout} className="rounded-lg bg-slate-800 text-white px-12 py-2 text-sm hover:text-slate-800 hover:bg-white transition-all border-2 border-slate-800">
                        Logout
                    </button>
                </>
                    
                ) : (
                    <Link to="/login" className='rounded-lg bg-slate-800 text-white px-12 py-2 text-sm hover:text-slate-800 hover:bg-white transition-all border-2 border-slate-800'>
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar