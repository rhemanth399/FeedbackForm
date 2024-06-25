import React, { useEffect, useState } from 'react';
import './LikestScale.css';
import { useFormContext } from '../../context/FormContext';

type LikertScaleProps = {
  question: string;
  options: string[];
  questionId: string;
};

const LikestScale: React.FC<LikertScaleProps> = ({ question, questionId}) => {
  const { formData, setFormData } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>(formData.likestscale[questionId] || '');
  
  const options=['😡', '😞', '😐', '😊', '😍'];

  
  useEffect(() => {
    setFormData({ likestscale: { ...formData.likestscale, [questionId]: selectedOption } });
  }, [selectedOption]);

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