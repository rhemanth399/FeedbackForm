import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './EditForms.css';
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
  submittedAt:String
}

const FormEditor: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/allForms');
        console.log("1",response)
        setForms(response.data.message);
      } catch (error) {
        console.error('Error fetching forms', error);
      }
    };
    fetchForms();
  }, []);

  const fetchForm = async (formId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/forms/${formId}`);
      console.log("2",response)
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

  const saveForm = async () => {
    if (form) {
      try {
        await axios.put(`http://localhost:4000/api/forms/${form._id}`, form);
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
      <h1>Edit Form</h1>
      {selectedFormId ? (
        form ? (
          <div>
            <input
              type="text"
              placeholder="Form Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided:any) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {form.questions.map((question, index) => (
                      <Draggable key={index} draggableId={String(index)} index={index}>
                        {(provided:any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="question"
                          >
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
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button onClick={saveForm}>Save Form</button>
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
                {form.title}{form.submittedAt.split('T')[0]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormEditor;
