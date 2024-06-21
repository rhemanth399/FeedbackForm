import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext'; // Ensure the correct path
import './MultipleChoice.css';

type MultipleChoiceProps = {
  question: string;
  options?: string[];
  questionId: string; // Add questionId to map responses
};

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ question, options = [], questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(formData.multiple_choice[questionId] || []);

  useEffect(() => {
    
    setFormData({ multiple_choice: { ...formData.multiple_choice, [questionId]: selectedOptions } });
  }, [selectedOptions]);


  const handleChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  console.log(selectedOptions)

  return (
    <div className="multiple-choice">
      <p>{question}</p>
      {options.map(option => (
        <div key={option}>
          <input 
            type="checkbox" 
            value={option} 
            checked={selectedOptions.includes(option)}
            onChange={() => handleChange(option)} 
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoice;
