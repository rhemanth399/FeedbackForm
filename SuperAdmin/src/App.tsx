import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import CreateForms from './pages/CreateForms/CreateForms.tsx'

function App() {
  
  return (
    
      <div >
          <Navbar/>
          
          <hr/>
          
          <div className="app-content">
          <Sidebar/>

          <Routes>
            <Route path="/createForm" element={<CreateForms/>}/>
          </Routes>
          </div>
        </div>
    
  )
}

export default App
