import React from 'react';
import './RateField.css'
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { useFormContext } from '../../context/FormContext';

interface RatingFieldProps {
  question: string;
  id: string;
}

const RatingField: React.FC<RatingFieldProps> = ({ question, id }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [id]: event.target.value });
  };

  return (
    <FormControl component="fieldset" margin="normal" className='form-control'>
      <FormLabel component="legend">{question}</FormLabel>
      <RadioGroup row onChange={handleChange} name={id} value={formData[id] || ''} className='radio-group'>
        {[1, 2, 3, 4, 5].map((value) => (
          <FormControlLabel key={value} value={String(value)} control={<Radio />} label={String(value)} className='FormControlLabel' />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RatingField;
