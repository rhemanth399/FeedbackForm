import React, { useState ,useEffect } from 'react';
import { useFormContext } from '../../context/FormContext'; 
import './DropDown.css';

type DropdownProps = {
  question: string;
  options: string[];
  questionId: string; 
};

const DropDown: React.FC<DropdownProps> = ({ question, options,questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>(formData.dropdown[questionId] || '');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    
    setFormData({ dropdown: { ...formData.dropdown, [questionId]: selectedOption } });
  }, [selectedOption]);


  console.log(formData)
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