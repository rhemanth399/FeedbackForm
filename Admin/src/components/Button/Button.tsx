import React from "react";
import './Button.css'
interface ButtonProps{
    text:string;
    onClick:()=>void
}

const Button : React.FC<ButtonProps>=({
    text,onClick
})=>{
    return(
        <>
        <button onClick={onClick} className="custom-button">
            {text}
        </button>
        </>
    )
}

export default Button