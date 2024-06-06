import React from 'react';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { useFormContext } from '../../context/FormContext';

interface YesNoFieldProps {
  question: string;
  id: string;
}

const YesNoField: React.FC<YesNoFieldProps> = ({ question, id }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [id]: event.target.value });
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">{question}</FormLabel>
      <RadioGroup row onChange={handleChange} name={id} value={formData[id] || ''}>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
};

export default YesNoField;
