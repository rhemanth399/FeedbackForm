import './App.css'
import AdminDashboard from './pages/Dashboard/AdminDashboard/AdminDashboard'
import Login from './pages/Login/Login'
import {Routes,Route} from 'react-router-dom'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<AdminDashboard/>}/>

    </Routes>
     
       
    </>
  )
}

export default App
