import React, { useState } from 'react';
import './DropDown.css';

type DropdownProps = {
  question: string;
  options: string[];
};

const DropDown: React.FC<DropdownProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dropdown">
      <p>{question}</p>
      <select value={selectedOption} onChange={handleChange}>
        <option value="" disabled>Select an option</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;