import React from 'react'
import { GoCalendar } from "react-icons/go";
const Navbar = () => {
  return (
    <nav className='bg-primary p-3 flex justify-between '>
        <GoCalendar color='white' className='ml-20'/>
        <button className='bg-tertiary px-6 p-2 rounded-xl mr-20 text-white'>
            Logout
        </button>
    </nav>
  )
}

export default Navbar