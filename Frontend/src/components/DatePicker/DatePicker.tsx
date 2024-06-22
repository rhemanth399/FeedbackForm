import React, { useState } from 'react';
import './DatePicker.css';
import { useFormContext } from '../../context/FormContext';

type DatePickerProps = {
  question: string;
  questionId:string;
};

const DatePicker: React.FC<DatePickerProps> = ({ question,questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<string | null>(formData.datepicker[questionId] || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setFormData({ datepicker: { ...formData.datepicker, [questionId]: event.target.value } });
    
  };

  return (
    <div className="date-picker">
      <p>{question}</p>
      <input type="date" value={selectedDate || ''} onChange={handleChange} />
    </div>
  );
};

export default DatePicker;