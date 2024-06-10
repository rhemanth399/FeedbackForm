import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";

const Navbar: React.FC = () =>{

    return (
        <div className="navbar">
            <h6>Feedback Form</h6>
            <ul className="list">
               <Link to="/home"><li>Home</li></Link> 
                <Link to="/updateAdmin"><li>Edit</li></Link>
            </ul>
        </div>
    )
}


export default Navbar