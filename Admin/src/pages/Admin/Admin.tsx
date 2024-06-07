import React, { useState } from 'react';
import { createQuestions } from '../../service/api';
import "./Admin.css"

const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>(['']);

  const handleInputChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.some(q => q.trim())) {
      await createQuestions(questions.filter(q => q.trim()));
      setQuestions(['']);
    }
  };

  return (
    <div className='admin'>
      <h6>Admin Panel</h6>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              value={question}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter your question"
              required
            />
            <button type="button" onClick={() => handleRemoveQuestion(index)} className='question-remove-btn'>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className='question-add-btn'>Add Another Question</button>
        <button type="submit" className='questions-add-btn'>Add Questions</button>
      </form>
    </div>
  );
};

export default Admin;
