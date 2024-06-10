import React from 'react';
import './App.css';
import Admin from './pages/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import UpdateAdmin from './pages/UpdateAdmin/UpdateAdmin';

const App: React.FC = () => {
  
  return (
    <div className='app'>
      <Navbar/>
      
      <Routes>
        <Route path="/home" element={<Admin/>}/>
        <Route path="/updateadmin" element={<UpdateAdmin/>}/>
      </Routes>
    </div>
  );
};

export default App;
