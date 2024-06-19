import React, { useState } from 'react';
import './DatePicker.css';

type DatePickerProps = {
  question: string;
};

const DatePicker: React.FC<DatePickerProps> = ({ question }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="date-picker">
      <p>{question}</p>
      <input type="date" value={selectedDate || ''} onChange={handleChange} />
    </div>
  );
};

export default DatePicker;