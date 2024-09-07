import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/Passwordinput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import googlelogo from './assets/Group.svg'

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [error , setError] = useState(null)


    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name ){
            setError('Please enter your name');
            return;
        }
        if( !validateEmail(email)){
            setError('Please enter a valid email address');
            return;
        }
        if( !password ){
            setError('Please enter a password');
            return;
        }
        if( !mobileno || mobileno.length != 10){
            setError('Please enter a valid mobile number');
            return;
        }
        setError("");

        try{
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name,email,password,phone:mobileno}),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
            } else {
                alert('Signup failed: ' + data.error);
            }
        } catch (err) {
            alert('An error occurred: ' + err.message);
        }

    } 
    

  return (
    <>
    <div className='flex items-center justify-center w-full min-h-screen'>
        <div className='w-96 border rounded bg-white px-7 py-6'>
            <form onSubmit={handleSignUp}>
                <div className="flex items-center flex-col ">
                    <h4 className='text-3xl mb-3 font-light logo'>HANDEL</h4>
                    <h5 className='mb-7 text-lg'>Sign Up</h5>
                </div>

                <input type="text" placeholder='Name' className='input-box' 
                value={name} onChange={(e) => setName(e.target.value)}
                />
                <input type="text" placeholder='Email' className='input-box' 
                value={email} onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
                 <input type="text" placeholder='Mobile No.' className='input-box' 
                value={mobileno} onChange={(e) => setMobileno(e.target.value)}
                />

                {error && <p className='text-red-500 text-xs pb-1 flex justify-center'>{error}</p>}

                <button type='submit' className='btn-primary'>
                    Sign Up
                </button>
                <p className='text-sm text-center mt-2 text-gray-600'>
                    Already have an account?{" "}
                    <Link to='/login' className='text-black font-medium underline'>Login</Link>
                </p>
                <div className="flex items-center justify-center relative my-3">
                <div className="bg-slate-400 h-[2px] w-full"></div>
                  <div className="px-2 bg-white z-10 text-gray-500">OR</div>
                  <div className="bg-slate-400 h-[2px] w-full"></div>
                </div>

                <button type='button' onClick={() => window.location.href = 'http://localhost:8080/auth/google'} className='flex items-center justify-center border-2 border-gray-400 text-gray-600 mt-2 w-full py-2 gap-3 hover:bg-black hover:text-white transition-all'>
                    <img src={googlelogo} alt="asd" className='w-5' />
                    Sign Up with Google
                </button>

                
            </form>
            <h6 className='text-[10px] mt-5 flex justify-center text-slate-500'>By proceeding, you're agreeing to our Terms and Privacy Policy</h6>
        </div>
    </div>
    </>
  )
}

export default SignUp