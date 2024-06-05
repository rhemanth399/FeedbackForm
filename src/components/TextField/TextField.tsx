import React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
import './TextField.css'

interface TextFieldProps {
  question: string;
  id: string;
}

const TextFieldComponent: React.FC<TextFieldProps> = ({ question, id }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [id]: event.target.value });
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">{question}</FormLabel>
      <TextField variant="outlined" fullWidth value={formData[id] || ''} onChange={handleChange} className='textfield' />
    </FormControl>
  );
};

export default TextFieldComponent;
