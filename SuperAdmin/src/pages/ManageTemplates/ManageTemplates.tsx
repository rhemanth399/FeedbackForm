import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageTemplates.css';

const questionTypes = [
  'Multiple choice',
  'Single choice',
  'Dropdown',
  'Rating scale',
  'Likert scale',
  'Text input (short answer)',
  'Text area (long answer)',
  'Date picker',
  'File upload',
  'Checkbox'
] as const;

type QuestionType = typeof questionTypes[number];

interface Question {
  _id?:string;
  type: QuestionType;
  prompt: string;
  options: string[];
}

interface Form {
  _id: string;
  title: string;
  questions: Question[];
  qrCode:string,
}

const ManageTemplates: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/templates');
        console.log("1", response);
        setForms(response.data.message);
      } catch (error) {
        console.error('Error fetching forms', error);
      }
    };
    fetchForms();
  }, []);

  const fetchForm = async (formId: string) => {
    try {
      const response = await axios.get(`https://feedbackform-backend-ao0d.onrender.com/api/template/${formId}`);
      console.log("2", response);
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

  const deleteQuestion = async (questionId:string) => {
    if (form) {
      try {
        const response = await axios.delete(`https://feedbackform-backend-ao0d.onrender.com/api/templates/${form._id}/questions/${questionId}`);
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
        
        type: questionTypes[0], // Default to the first question type
        prompt: '',
        options: [],
      };
      setForm({ ...form, questions: [...form.questions, newQuestion] });
    }
  };

  // const updatedTemplate = async () => {
  //   if (form) {
  //     try {
  //       await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/forms/${form._id}`, form);
  //       alert('Form updated successfully!');
  //     } catch (error) {
  //       console.error('Error updating form', error);
  //       alert('Failed to update form');
  //     }
  //   }
  // };

  const saveForm = async () => {
    if (form) {
      try {
        await axios.post('https://feedbackform-backend-ao0d.onrender.com/api/create', form);
        alert('Form saved successfully!');
      } catch (error) {
        console.error('Error saving form', error);
        alert('Failed to save form');
      }
    }
  };

  return (
    <>
    <h1>Manage Templates</h1>
    <div className="form-editor">
      
      {selectedFormId ? (
        form ? (
          <div>
            <input
              type="text"
              placeholder="Form Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            
            {form.questions.map((question, index) => (
              <div key={index} className="question">
                <span className="question-number">{index + 1})</span>
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
                <button onClick={() => deleteQuestion(question._id!)}>Delete</button>
              </div>
            ))}
            <div className='add-edit-save'>
            <button onClick={addNewQuestion} >Add New Question</button>
            {/* <button onClick={updatedTemplate} className="edit-template">Edit Template</button> */}
            <button onClick={saveForm} >Save Template</button>
            </div>
          </div>
        ) : (
          <p>Loading form...</p>
        )
      ) : (
        <div>
          <h2>Select a Template</h2>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default ManageTemplates;
