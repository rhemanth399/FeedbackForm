import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext'; 
import './TextInput.css';

type TextInputProps = {
  question: string;
  questionId: string;
};

const TextInput: React.FC<TextInputProps> = ({ question, questionId}) => {
  const { formData, setFormData } = useFormContext();
  const [text, setText] = useState<any>(formData.textinput[questionId] || '');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setFormData({ textinput: { ...formData.textinput, [questionId]: event.target.value } });
    
  };
  return (
    <div className="text-input">
      <p>{question}</p>
      <input type={text} onChange={handleChange} />
    </div>
  );
};

export default TextInput;