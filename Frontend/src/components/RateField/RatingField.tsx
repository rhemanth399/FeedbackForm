import React from 'react';
import { useFormContext } from '../../context/FormContext';

interface RatingFieldProps {
  question: string;
  id: string;
}

const RatingField: React.FC<RatingFieldProps> = ({ question }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ rating: event.target.value });
  };

  return (
    <div>
      <label>{question}</label>
      <div>
        {[1, 2, 3, 4, 5].map((rating) => (
          <label key={rating}>
            <input
              type="radio"
              
              value={rating}
             
              onChange={handleChange}
            />
            {rating}
          </label>
        ))}
      </div>

    </div>
  );
};

export default RatingField;
