import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import './Login.css';
import axios from 'axios';

import { useNavigate } from "react-router";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg,setErrorMsg] =useState<string>('');
    const [error,setError] =useState<boolean>(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email) {
            setErrorMsg("Email is required")
            setError(true)
            return;
        }
        if(!password){
            setErrorMsg("Password is required");
            setError(true)
            return;
        }
        try {
            
            
            const login: any = await axios.post('http://localhost:4000/api/admin/login', { email, password });
            if (login) {
                localStorage.setItem('token',login.data.token)
                alert("Login success");
                navigate('/dashboard')
            }
        } catch (err) {
            
            alert("Server Error");
        }
    };

    return (
        <div className="main-container">
            <div className="login-container">
                <div className="login-form">
                    <h2 className="login-title">ADMIN</h2>
                    <p className="login-subtitle">Welcome back! Please enter your details</p>
                    <CustomInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                     {error&&<div className="error-msg">{errorMsg==='Email is required'?errorMsg:''}</div>}
                    <CustomInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error&&<div className="error-msg">{errorMsg==='Password is required'?errorMsg:''}</div>}
                    <Button onClick={handleLogin} text="Login"></Button>
                </div>
                <div className="login-image">
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
