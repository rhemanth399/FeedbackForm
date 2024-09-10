// import React, { useState } from 'react'
// import axios from 'axios';
// import './CreateForms.css'

// const questionTypes = [
//   'Multiple choice',
//   'Single choice',
//   'Dropdown',
//   'Rating scale',
//   'Likert scale',
//   'Text input (upto 150 characters)',
//   'Text area (upto 250 characters)',
//   'Date picker',
//   'File upload',
//   'Checkbox'
// ];

// const CreateForms : React.FC = () => {
  
    
//     const [questions, setQuestions] = useState<any[]>([]);
//   const [title, setTitle] = useState<string>('');

//   const addQuestion = () => {
//     setQuestions([...questions, { type: '', prompt: '', options: [] }]);
//   };

//   const updateQuestion = (index: number, key: string, value: any) => {
//     const newQuestions = [...questions];
//     newQuestions[index][key] = value;
//     setQuestions(newQuestions);
//   };

//   const handleRemoveQuestion = (index: number) => {
//     const newQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(newQuestions);
//   };

//   const saveForm = async () => {
//     const filteredQuestions = questions.filter(question => {
//       // Ensure that the question has a type and a prompt
//       if (!question.type || !question.prompt.trim()) {
//         return false;
//       }
//       // For question types that require options, ensure options are provided and valid
//       if (['Multiple choice', 'Single choice', 'Dropdown', 'Checkbox', 'Likert scale'].includes(question.type)) {
//         return question.options.length > 0 && question.options.every((option:any) => option.trim() !== '');
//       }
//       return true;
//     });
//     if (!title.trim()) {
//       alert('Form title is required.');
//       return;
//     }
  
//     if (filteredQuestions.length === 0) {
//       alert('Please provide at least one complete question.');
//       return;
//     }

//     try {
//       console.log(title,questions)
//       await axios.post('https://feedbackform-backend-ao0d.onrender.com/api/create', { title, questions:filteredQuestions });
//       alert('Form saved successfully!');
//       setQuestions([])
//     setTitle("")
//     } catch (error) {
//       console.error('Error saving form', error);
//       alert('Failed to save form');
//     }
//     console.log(questions)
    
//   };

//   return (
//     <div className='add flex-col'>
      
//       <input
//         type="text"
//         placeholder="Form Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       {questions.map((question, index) => (
//         <div key={index} className='whole'>
//            <span>{index + 1}. </span>
//           <select
//             value={question.type}
//             onChange={(e) => updateQuestion(index, 'type', e.target.value)}
//           >
//             <option value="">Select question type</option>
//             {questionTypes.map((type) => (
//               <option key={type} value={type} >
//                 {type}
//               </option>
//             ))}
//           </select>
        
//           <div className='input-main'>
          
//           <input
//             type="text"
//             placeholder="Question prompt"
//             value={question.prompt}
//             onChange={(e) => updateQuestion(index, 'prompt', e.target.value)}
//           />
//           <button type="button" onClick={() => handleRemoveQuestion(index)} className='question-remove-btn'>Remove</button>
//           </div>
//           {['Multiple choice', 'Single choice', 'Dropdown','Checkbox','Likert scale'].includes(question.type) && (
//             <div>
//               <textarea
//                 placeholder="Options (comma separated)"
//                 className='option'
//                 value={question.options.join(',')}
//                 onChange={(e) =>
//                   updateQuestion(index, 'options', e.target.value.split(','))
//                 }
//               />
//             </div>
//           )}
//         </div>
//       ))}
//       <button onClick={addQuestion} className='question-add-btn'>Add Question</button>
//       <button onClick={saveForm} className='save-btn'>Save Form</button>
//     </div>
//   )
// }

// export default CreateForms










import React, { useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './CreateForms.css';

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

const CreateForms: React.FC = () => {
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

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);

    setQuestions(reorderedQuestions);
  };

  const saveForm = async () => {
    const filteredQuestions = questions.filter((question) => {
      if (!question.type || !question.prompt.trim()) {
        return false;
      }
      if (['Multiple choice', 'Single choice', 'Dropdown', 'Checkbox', 'Likert scale'].includes(question.type)) {
        return question.options.length > 0 && question.options.every((option: any) => option.trim() !== '');
      }
      return true;
    });
    if (!title.trim()) {
      alert('Form title is required.');
      return;
    }

    if (filteredQuestions.length === 0) {
      alert('Please provide at least one complete question.');
      return;
    }

    try {
      await axios.post('https://feedbackform-backend-ao0d.onrender.com/api/create', { title, questions: filteredQuestions });
      alert('Form saved successfully!');
      setQuestions([]);
      setTitle('');
    } catch (error) {
      console.error('Error saving form', error);
      alert('Failed to save form');
    }
  };

  return (
    <div className='add flex-col'>
      <input
        type='text'
        placeholder='Form Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='questions'>
          {(provided:any) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided:any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='whole'
                    >
                      <span>{index + 1}. </span>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                      >
                        <option value=''>Select question type</option>
                        {questionTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className='input-main'>
                        <input
                          type='text'
                          placeholder='Question prompt'
                          value={question.prompt}
                          onChange={(e) => updateQuestion(index, 'prompt', e.target.value)}
                        />
                        <button type='button' onClick={() => handleRemoveQuestion(index)} className='question-remove-btn'>
                          Remove
                        </button>
                      </div>
                      {['Multiple choice', 'Single choice', 'Dropdown', 'Checkbox', 'Likert scale'].includes(question.type) && (
                        <div>
                          <textarea
                            placeholder='Options (comma separated)'
                            className='option'
                            value={question.options.join(',')}
                            onChange={(e) =>
                              updateQuestion(index, 'options', e.target.value.split(','))
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={addQuestion} className='question-add-btn'>
        Add Question
      </button>
      <button onClick={saveForm} className='save-btn'>
        Save Form
      </button>
    </div>
  );
};

export default CreateForms;
