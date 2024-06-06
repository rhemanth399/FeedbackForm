import React from 'react';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import FeedbackForm from './pages/FeedbackForm/FeedbackForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Routes>
      <Route path ="/home" element={<Home/>}/>
      <Route path="home/withData" element={<FeedbackForm/>}/>
      <Route path="home/withoutData" element={<FeedbackForm/>}/>

      </Routes>
    </div>
  );
};

export default App;
