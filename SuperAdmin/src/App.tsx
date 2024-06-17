import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import CreateForms from './pages/CreateForms/CreateForms.tsx'
import EditForms from './pages/EditForms/EditForms.tsx'
import ManageTemplates from './pages/ManageTemplates/ManageTemplates.tsx'

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
          </Routes>
          </div>
        </div>
    
  )
}

export default App
