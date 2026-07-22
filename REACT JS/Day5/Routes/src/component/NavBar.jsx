import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <div className='p-5 flex justify-between items-center bg-blue-400'>
        <div className='mx-10 text-black bg-blue-700 p-2 rounded w-20 flex justify-center items-center' >
         Logo
        </div>
        <div className='mx-10 flex gap-10'>
         <Link to="/">Home</Link>
         <Link to="/about">About</Link>
         <Link to="/contact">Contact</Link>

        </div>
       
    </div>
    
    </>
  )
}

export default NavBar