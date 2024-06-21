import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext'; // Ensure the correct path
import './SingleChoice.css';

type SingleChoiceProps = {
  question: string;
  options: string[];
  questionId: string; 
};

const SingleChoice: React.FC<SingleChoiceProps> = ({ question, options, questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<any>(formData.single_choice[questionId] || '');

  
  useEffect(() => {
    setFormData({ single_choice: { ...formData.single_choice, [questionId]: selectedOption } });
  }, [selectedOption]);

  return (
    <div className="single-choice">
      <p>{question}</p>
      {options.map(option => (
        <div key={option}>
          <input 
            type="radio" 
            value={option} 
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)} 
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default SingleChoice;
