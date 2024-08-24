import React from "react";
import './CustomInput.css'

interface CustomInputProps {
    placeholder: string;
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="custom-input-container">
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="custom-input"
                placeholder=" "
                required
            />
            <label className="label">{placeholder}</label>
        </div>
    );
}

export default CustomInput;
