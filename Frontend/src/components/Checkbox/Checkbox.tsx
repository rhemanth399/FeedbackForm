import React, { useState } from 'react';
import './Checkbox.css';

type CheckboxProps = {
  question: string;
  options: string[];
};

const Checkbox: React.FC<CheckboxProps> = ({ question, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (option: string) => {
    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter(o => o !== option)
        : [...prevSelectedOptions, option]
    );
  };

  return (
    <div className="checkbox">
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

export default Checkbox;