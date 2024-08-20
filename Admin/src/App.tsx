import './App.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminDashboard from './pages/Dashboard/AdminDashboard/AdminDashboard'
import CreateFeedback from './pages/Dashboard/CreateFeedback/CreateFeedback'
import EditFeedback from './pages/Dashboard/EditFeedback/EditFeedback'
import FeedbackDetails from './pages/Dashboard/FeedbackDetails/FeedbackDetails'
import Feedback from './pages/Dashboard/FeedbackStatistics/FeedbackStatistics'
import Login from './pages/Login/Login'
import {Routes,Route} from 'react-router-dom'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='' element={<Login/>}/>
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FeedbackDetails/>
              
            </ProtectedRoute>
          }
        />
       <Route path='dashboard/Issue Tracking' element={<Feedback/>}/>
      <Route path='/dashboard/overview' element={<AdminDashboard />}/>
      <Route path='/dashboard/createform' element={<CreateFeedback/>}/>
      <Route path='/dashboard/editform' element={<EditFeedback/>}/>
      

    </Routes>
     
       
    </>
  )
}

export default App
