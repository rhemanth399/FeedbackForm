import React, { useState } from 'react'
import axios from 'axios';
import './CreateForm.css'

const questionTypes = [
  'Multiple choice',
  'Single choice',
  'Dropdown',
  'Rating scale',
  'Likert scale',
  'Text input (upto 150 characters)',
  'Text area (upto 250 characters)',
  'Date picker',
  'File upload',
  'Checkbox'
];

const CreateForm : React.FC = () => {
  
    
    const [questions, setQuestions] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');

  const addQuestion = () => {
    setQuestions([...questions, { type: '', prompt: '', options: [] }]);
  };

  const updateQuestion = (index: number, key: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const saveForm = async () => {
    try {
      console.log(title,questions)
      await axios.post('http://192.168.1.3:4000/api/create', { title, questions });
      alert('Form saved successfully!');
    } catch (error) {
      console.error('Error saving form', error);
      alert('Failed to save form');
    }
    console.log(questions)
    setQuestions([])
    setTitle("")
  };

  return (
    <div className='add flex-col'>
      
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <div key={index}>
          <select
            value={question.type}
            onChange={(e) => updateQuestion(index, 'type', e.target.value)}
          >
            <option value="">Select question type</option>
            {questionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className='input-main'>
          <input
            type="text"
            placeholder="Question prompt"
            value={question.prompt}
            onChange={(e) => updateQuestion(index, 'prompt', e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveQuestion(index)} className='question-remove-btn'>Remove</button>
          </div>
          {['Multiple choice', 'Single choice', 'Dropdown','Checkbox','Likert scale'].includes(question.type) && (
            <div>
              <textarea
                placeholder="Options (comma separated)"
                value={question.options.join(',')}
                onChange={(e) =>
                  updateQuestion(index, 'options', e.target.value.split(','))
                }
              />
            </div>
          )}
        </div>
      ))}
      <button onClick={addQuestion} className='question-add-btn'>Add Question</button>
      <button onClick={saveForm} className='save-btn'>Save Form</button>
    </div>
  )
}

export default CreateForm
