import React, { useState } from "react"
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import image from '../../assets/Screenshot (116).png'
import './Login.css'
import axios from 'axios'
 const Login : React.FC=()=>{

    const [email,setEmail] =useState<string>('');
    const [password,setPassword] =useState<string>('');

    const handleLogin = async()=>{
        try{
        const login:any =await axios.post('http://localhost:4000/api/admin/login',{email,password})
        if(login){
            alert("Login sucess")
        }
        }
        catch(err){
            alert("Server Error");
        }
    }

    return(
        <div className="container">
            <div className="form-wrapper">
        <div className="form">
        <h2 className="title">Welcome Back, Log In...</h2>
        <CustomInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <CustomInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button text="Login" onClick={handleLogin}/>
        </div>
        </div>
        <div className="image-wrapper">
        <img src={image} alt="Workout" className="image" />
      </div>
        </div>
    )
}

export default Login