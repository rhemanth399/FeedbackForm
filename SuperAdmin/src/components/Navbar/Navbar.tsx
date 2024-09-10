// import React from 'react'
// import { assets } from '../../assets/assets'
// import './Navbar.css'


// const Navbar :React.FC = () => {
//   return (
//     <div className='navbar'>
//       <h1>Super Admin</h1>
//       <img className='profile' src={assets.profile_image} alt="logo" />
      
//     </div>
//   )
// }

// export default Navbar



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Menu, MenuItem } from '@mui/material';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // or useNavigate for React Router v6

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event: any) => {
    console.log(event)
    navigate("/")
  };

  return (
    <div className="navbar">
      <h1>Super Admin</h1>
      <button onClick={handleClick}>
        <img className="profile" src={assets.profile_image} alt="logo" />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
