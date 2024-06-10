import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'


const Navbar :React.FC = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={""} alt="logo"/>
      <img className='profile' src={assets.profile_image} alt=""/>
    </div>
  )
}

export default Navbar
