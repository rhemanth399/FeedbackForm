import React from "react";
import "./Navbar.css"

const Navbar: React.FC = () =>{

    return (
        <div className="navbar">
            <h6>Feedback Form</h6>
            <ul className="list">
                <li>Home</li>
                <li>Edit</li>
            </ul>
        </div>
    )
}


export default Navbar