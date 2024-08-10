import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'


const Navbar :React.FC = () => {
  return (
    <div className='navbar'>
      <h1>Super Admin</h1>
      <img className='profile' src={assets.profile_image} alt="logo" />
      
    </div>
  )
}

export default Navbar
