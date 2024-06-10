import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Sidebar.css'
const Sidebar: React.FC = () =>{
    return (
        <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to="/createForm" className="sidebar-option">
         <img src={assets.add_icon} alt=""/>
         <p>Create Form</p>
        </NavLink>
        
      </div>
    </div>
    )
}

export default Sidebar