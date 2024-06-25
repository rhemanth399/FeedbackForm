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
      <Route  index element={<Home/>}/>
      <Route path="withData" element={<FeedbackForm withData={true}/>}/>
      <Route path="withoutData" element={<FeedbackForm withData={false}/>}/>

      </Routes>
    </div>
  );
};

export default App;
