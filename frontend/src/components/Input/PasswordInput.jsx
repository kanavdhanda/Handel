import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({value , onChange , placeholder}) => {

    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

  return (
    <div className=' select-none flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input type={showPassword ? 'text': "password"} value={value} onChange={onChange}  placeholder={placeholder || "Password"} 
        className=' select-none w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
        />

        {showPassword? <FaRegEye
        size={22}
        className='text-primary cursor-pointer select-none'
        onClick={() => togglePassword()}
        /> : <FaRegEyeSlash
        size={22}
        className='text-slate-400 cursor-pointer select-none'
        onClick={() => togglePassword()}
        />}
        
    </div>
  )
}

export default PasswordInput