import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './EditForm.css';
import { useNavigate } from 'react-router-dom';

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
] as const;

type QuestionType = typeof questionTypes[number];

interface Question {
  type: QuestionType;
  prompt: string;
  options: string[];
}

interface Form {
  _id: string;
  title: string;
  questions: Question[];
  submittedAt: String,
  qrCode:string
}

const EditForm: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/allForms');
        console.log("1", response)
        setForms(response.data.message);
      } catch (error) {
        console.error('Error fetching forms', error);
      }
    };
    fetchForms();
  }, []);

  const fetchForm = async (formId: string) => {
    try {
      const response = await axios.get(`https://feedbackform-backend-ao0d.onrender.com/api/forms/${formId}`);
      console.log("2", response)
      setForm(response.data.message);
    } catch (error) {
      console.error('Error fetching form', error);
    }
  };

  const updateQuestion = (index: number, key: keyof Question, value: any) => {
    if (form) {
      const newQuestions = [...form.questions];
      newQuestions[index][key] = value;
      setForm({ ...form, questions: newQuestions });
    }
  };

  const deleteQuestion = async (index: number) => {
    if (form) {
      try {
        const response = await axios.delete(`https://feedbackform-backend-ao0d.onrender.com/api/forms/${form._id}/questions/${index}`);
        setForm(response.data.form);
        alert('Question deleted successfully!');
      } catch (error) {
        console.error('Error deleting question', error);
        alert('Failed to delete question');
      }
    }
  };

  const addNewQuestion = () => {
    if (form) {
      const newQuestion: Question = {
        type: questionTypes[0], // Default to first question type
        prompt: '',
        options: [],
      };
      setForm({ ...form, questions: [...form.questions, newQuestion] });
    }
  };

  const saveForm = async () => {
    if (form) {
      try {
        await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/forms/${form._id}`, form);
        alert('Form updated successfully!');
        navigate("/editforms")
      } catch (error) {
        console.error('Error updating form', error);
        alert('Failed to update form');
      }
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedQuestions = Array.from(form?.questions || []);
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

    if (form) {
      setForm({ ...form, questions: reorderedQuestions });
    }
  };

  return (
    <div className="form-editor">
    {selectedFormId ? (
      form ? (
        <div>
          <h2>Edit Form</h2>
          <input
            type="text"
            placeholder="Form Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <img src={form.qrCode} alt="QR Code" style={{ display: 'block', margin: '20px auto' }} />
  
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {form.questions.map((question, index) => (
                    <Draggable key={index} draggableId={String(index)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="question"
                        >
                          <span className="question-number">{index + 1}) </span>
                          <select
                            value={question.type}
                            onChange={(e) => updateQuestion(index, 'type', e.target.value as QuestionType)}
                          >
                            <option value="">Select question type</option>
                            {questionTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          
                          <input
                            type="text"
                            placeholder="Question prompt"
                            value={question.prompt}
                            onChange={(e) => updateQuestion(index, 'prompt', e.target.value)}
                          />
                          
                          {['Multiple choice', 'Single choice', 'Dropdown'].includes(question.type) && (
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
                          <button onClick={() => deleteQuestion(index)} className="delete-btn">
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className='add-save'>
            <button onClick={addNewQuestion} className='add-question'>Add New Question</button>
            <button onClick={saveForm} className='save-form'>Save Form</button>
          </div>
        </div>
      ) : (
        <p>Loading form...</p>
      )
    ) : (
      <div>
        <h2>Select a form to edit</h2>
        <ul className="form-list">
          {forms.map((form) => (
            <li
              key={form._id}
              onClick={() => {
                setSelectedFormId(form._id);
                fetchForm(form._id);
              }}
              className={form._id === selectedFormId ? 'selected' : ''}
            >
              {form.title}
              <p className='created-date'>{form.submittedAt.split('T')[0]}</p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  
  )
}

export default EditForm