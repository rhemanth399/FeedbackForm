import React from 'react';
import { FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
import './CommentsField.css'

interface CommentsFieldProps {
  question: string;
  id: string;
}

const CommentsField: React.FC<CommentsFieldProps> = ({ question, id }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [id]: event.target.value });
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">{question}</FormLabel>
      <TextareaAutosize
        minRows={6}
        
        placeholder="Your comments"
        
        value={formData[id] || ''}
        onChange={handleChange}
        className='text-area'
        
      />
    </FormControl>
  );
};

export default CommentsField;
