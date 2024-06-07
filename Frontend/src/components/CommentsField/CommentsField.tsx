import React from 'react';
import { useFormContext } from '../../context/FormContext';
import './CommentsField.css'

interface CommentsFieldProps {
  question: string;
  id: string;
}

const CommentsField: React.FC<CommentsFieldProps> = ({ question }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ comment: event.target.value });
  };

  return (
    <div>
    <label>{question}</label>
    <input type="text" value={formData.comment} onChange={handleChange} />
  </div>
  );
};

export default CommentsField;
