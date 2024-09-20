import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import googlelogo from './assets/Group.svg'
import Cookies from 'js-cookie';

const SellerLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error , setError] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return
            
        }

        if (!password) {
            setError('Please enter a password');
            return
            
        }
        setError("")

        try {
            const response = await fetch('https://api.handelexports.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Login failed');
            } else {
                const data = await response.json();
                Cookies.set('sellerID', data.sellerID);
                console.log('Login successful:', data);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        }
    };

  return (
    <>

    <div className='flex items-center justify-center w-full min-h-screen'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
            <form onSubmit={handleLogin}>
            <div className="flex items-center flex-col ">
                    <h4 className='text-3xl mb-3 font-light logo'>HANDEL</h4>
                    <h5 className='mb-7 text-lg'>Seller Log In</h5>
                </div>
                <input type="text" placeholder='Email' className='input-box' 
                value={email} onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />

                 {error && <p className='text-red-500 text-xs pb-1 flex justify-center'>{error}</p>}

                <button type='submit' className='btn-primary'>
                    Login
                </button>

                <p className='text-sm text-center mt-4 text-gray-600'>
                    Want to become a Seller?{" "}
                    <Link to='/sellerSignup' className='text-black font-medium underline'>Create an account</Link>
                </p>
                <div className="flex items-center justify-center relative my-3">
                <div className="bg-slate-400 h-[2px] w-full"></div>
                  <div className="px-2 bg-white z-10 text-gray-500">OR</div>
                  <div className="bg-slate-400 h-[2px] w-full"></div>
                </div>

                {/* <button type='button' onClick={() => window.location.href = 'https://api.handelexports.com/auth/google'} className='flex items-center justify-center border-2 border-gray-400 text-gray-600 mt-2 w-full py-2 gap-3 hover:bg-black hover:text-white transition-all'>
                    <img src={googlelogo} alt="asd" className='w-5' />
                    Sign Up with Google
                </button> */}

                
            </form>
            <h6 className='text-[10px] mt-5 flex justify-center text-slate-500'>By proceeding, you're agreeing to our Terms and Privacy Policy</h6>
        </div>
    </div>
    </>
  )
}

export default SellerLogin