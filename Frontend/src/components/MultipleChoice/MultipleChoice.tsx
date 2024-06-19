import React, { useState } from 'react';
import './MultipleChoice.css';

type MultipleChoiceProps = {
  question: string;
  options?: string[];
};

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ question, options = [] }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

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