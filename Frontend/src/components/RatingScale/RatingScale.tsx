import React, { useState } from 'react';
import './RatingScale.css';

type RatingScaleProps = {
  question: string;
  scale: number;
};

const RatingScale: React.FC<RatingScaleProps> = ({ question, scale }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  return (
    <div className="rating-scale">
      <p>{question}</p>
      <div className="rating-options">
        {Array.from({ length: scale }, (_, i) => i + 1).map(value => (
          <button
            key={value}
            className={`rating-button ${rating === value ? 'selected' : ''}`}
            onClick={() => handleRatingChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingScale;