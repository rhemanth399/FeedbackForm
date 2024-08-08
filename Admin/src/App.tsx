import './App.css'
import AdminDashboard from './pages/Dashboard/AdminDashboard/AdminDashboard'
import FeedbackDetails from './pages/Dashboard/FeedbackDetails/FeedbackDetails'
import Feedback from './pages/Dashboard/FeedbackStatistics/FeedbackStatistics'
import Login from './pages/Login/Login'
import {Routes,Route} from 'react-router-dom'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='' element={<Login/>}/>
      <Route path='/dashboard' element={<AdminDashboard/>}/>
      <Route path='/dashboard/FeedbackStatistics' element={<Feedback/>}/>
      <Route path='/dashboard/FeedbackDetails' element={<FeedbackDetails/>}/>

    </Routes>
     
       
    </>
  )
}

export default App
