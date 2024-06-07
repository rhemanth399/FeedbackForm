import React from 'react';
import './App.css';
import Admin from './pages/Admin/Admin';
import Navbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  
  return (
    <div className='app'>
      <Navbar/>
      <Admin/>
    </div>
  );
};

export default App;
