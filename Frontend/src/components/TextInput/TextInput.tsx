import React from 'react';
import './TextInput.css';

type TextInputProps = {
  question: string;
};

const TextInput: React.FC<TextInputProps> = ({ question }) => {
  return (
    <div className="text-input">
      <p>{question}</p>
      <input type="text" />
    </div>
  );
};

export default TextInput;