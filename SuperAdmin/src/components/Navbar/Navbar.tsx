import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Menu, MenuItem,IconButton } from '@mui/material';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); 

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
      <IconButton onClick={handleClick}>
        <img className="profile" src={assets.profile_image} alt="logo" />
      </IconButton>
      
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
        sx={{
          '.MuiPaper-root': {
            marginTop: 8, // Adds margin to ensure menu appears below profile image
          },
        }}
      >
        
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      
    </div>
  );
};

export default Navbar;
