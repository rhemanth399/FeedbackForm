import { Route, Routes ,useLocation} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import CreateForms from './pages/CreateForms/CreateForms.tsx'
import EditForms from './pages/EditForms/EditForms.tsx'
import ManageTemplates from './pages/ManageTemplates/ManageTemplates.tsx'
import CreateAdmin from './pages/CreateAdmin/CreateAdmin.tsx'
import ListOfFeedback from './pages/ListOfFeedback/ListOfFeedback.tsx'
import ListOfAdmin from './pages/ListOfAdmin/ListOfAdmin.tsx'
import Login from './pages/Login/Login.tsx'

function App() {
  const location = useLocation();

  // Check if the current path is the login page
  const isLoginPage = location.pathname === '/';

  
  return (
    
      <div >
          {!isLoginPage && <Navbar />}
          
          {!isLoginPage && <hr/>}
          
          <div className="app-content">
          {!isLoginPage && <Sidebar />}

          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/createForm" element={<CreateForms/>}/>
            <Route path="/editForms" element={<EditForms/>}/>
            <Route path="/manageTemplates" element={<ManageTemplates/>}/>
            <Route path="/createAdmin" element={<CreateAdmin/>}/>
            <Route path="/listofadmins" element={<ListOfAdmin/>}/>
            <Route path="/listOfFeedback" element={<ListOfFeedback/>}/>
          </Routes>
          </div>
        </div>
    
  )
}

export default App
