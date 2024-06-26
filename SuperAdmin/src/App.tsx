import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import CreateForms from './pages/CreateForms/CreateForms.tsx'
import EditForms from './pages/EditForms/EditForms.tsx'
import ManageTemplates from './pages/ManageTemplates/ManageTemplates.tsx'
import CreateAdmin from './pages/CreateAdmin/CreateAdmin.tsx'
import ListOfFeedback from './pages/ListOfFeedback/ListOfFeedback.tsx'
import ListOfAdmin from './pages/ListOfAdmin/ListOfAdmin.tsx'

function App() {
  
  return (
    
      <div >
          <Navbar/>
          
          <hr/>
          
          <div className="app-content">
          <Sidebar/>

          <Routes>
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
