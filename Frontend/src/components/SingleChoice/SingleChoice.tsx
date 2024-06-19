import React, { useState } from 'react';
import './SingleChoice.css';

type SingleChoiceProps = {
  question: string;
  options: string[];
};

const SingleChoice: React.FC<SingleChoiceProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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