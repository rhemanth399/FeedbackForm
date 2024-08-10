import React  from "react"
import Card from "../../../components/Card/Card"
import './MainContent.css'


  
const MainContent :React.FC=()=>{
    
    return(
        <div className="dashboard">
             <div className="card-container">
        <Card title="Feedback 1" content="This is the content of feedback 1" />
        <Card title="Feedback 2" content="This is the content of feedback 2" />
        <Card title="Feedback 3" content="This is the content of feedback 3" />
        
        
        </div>
        </div>
    )
}

export default MainContent