import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../context/FormContext'; 
import './RatingScale.css';

type RatingScaleProps = {
  question: string;
  scale: number;
  questionId: string; 
};

const RatingScale: React.FC<RatingScaleProps> = ({ question, scale, questionId }) => {
  const { formData, setFormData } = useFormContext();
  const [rating, setRating] = useState<any>(formData.ratingscale[questionId] || null);

  useEffect(() => {
    setFormData({ ratingscale: { ...formData.ratingscale, [questionId]: rating } });
  }, [rating]);


  const handleRatingChange = (value: any) => {
    setRating(value);
  };

  return (
    <div className="rating-scale">
      <p>{question}</p>
      <div className="rating-options">
        {Array.from({ length: scale }, (_, i) => i + 1).map(value => (
          <span
            key={value}
            className={`rating-star ${rating !== null && rating >= value ? 'selected' : ''}`}
            onClick={() => handleRatingChange(value)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingScale;
