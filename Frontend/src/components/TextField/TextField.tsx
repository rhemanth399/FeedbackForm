import React from 'react';
import { useFormContext } from '../../context/FormContext';
import './TextField.css'

interface TextFieldProps {
  question: string;
  id: string;
}

const TextFieldComponent: React.FC<TextFieldProps> = ({ question}) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ name: event.target.value });
  };
  return (
    <div>
    <label>{question}</label>
    <input type="text" value={formData.name} onChange={handleChange} />
  </div>
  );
};

export default TextFieldComponent;
