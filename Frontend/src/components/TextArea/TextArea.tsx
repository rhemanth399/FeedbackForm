import React from 'react';
import './TextArea.css';

type TextAreaProps = {
  question: string;
};

const TextArea: React.FC<TextAreaProps> = ({ question }) => {
  return (
    <div className="text-area">
      <p>{question}</p>
      <textarea />
    </div>
  );
};

export default TextArea;