import React, { useState } from 'react';
import './LikestScale.css';

type LikertScaleProps = {
  question: string;
  options: string[];
};

const LikestScale: React.FC<LikertScaleProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="likest-scale">
      <p>{question}</p>
      <div>
        {options.map(option => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LikestScale;