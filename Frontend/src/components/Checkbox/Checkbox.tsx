import React, { useEffect, useState } from 'react';
import './Checkbox.css';
import { useFormContext } from '../../context/FormContext';

type CheckboxProps = {
  question: string;
  options: string[];
  questionId:string
};

const Checkbox: React.FC<CheckboxProps> = ({ question, options,questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(formData.checkbox[questionId]||[]);
  
  const handleChange = (option: string) => {
    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter(o => o !== option)
        : [...prevSelectedOptions, option]
    );
  };

  useEffect(()=>{
    setFormData({checkbox:{...formData.checkbox,[questionId]:selectedOptions}})
  },[selectedOptions])

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