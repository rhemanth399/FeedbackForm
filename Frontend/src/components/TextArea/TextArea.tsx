import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext'; // Ensure the correct path
import './TextArea.css';

type TextAreaProps = {
  question: string;
  questionId: string; 
};

const TextArea: React.FC<TextAreaProps> = ({ question, questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [text, setText] = useState<any>(formData.textarea[questionId] || '');


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setFormData({ textarea: { ...formData.textarea, [questionId]: event.target.value } });
    
  };

  return (
    <div className="text-area">
      <p>{question}</p>
      <textarea value={text} onChange={handleChange} />
    </div>
  );
};

export default TextArea;
