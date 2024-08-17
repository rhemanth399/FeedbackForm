import './App.css'
import CreateForm from './components/CreateForm/CreateForm'
import EditForm from './components/EditForm/EditForm'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
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
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
       <Route path='/FeedbackStatistics' element={<Feedback/>}/>
      <Route path='/dashboard/FeedbackDetails' element={<FeedbackDetails/>}/>
      <Route path='/dashboard/createform' element={<CreateForm/>}/>
      <Route path='/dashboard/editform' element={<EditForm/>}/>
      

    </Routes>
     
       
    </>
  )
}

export default App
