import React from 'react';
import { useFormContext } from '../../context/FormContext';

interface YesNoFieldProps {
  question: string;
  id: string;
}

const YesNoField: React.FC<YesNoFieldProps> = ({ question }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ yesNo: event.target.value });
  };

  return (
    <div>
      <label>{question}</label>
      <input type="radio" value="yes" checked={formData.yesNo === "yes"} onChange={handleChange} /> Yes
      <input type="radio" value="no" checked={formData.yesNo === "no"} onChange={handleChange} /> No
    </div>
  );
};

export default YesNoField;
