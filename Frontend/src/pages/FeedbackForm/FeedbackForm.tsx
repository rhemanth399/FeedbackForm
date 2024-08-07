import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
import MultipleChoice from '../../components/MultipleChoice/MultipleChoice';
import SingleChoice from '../../components/SingleChoice/SingleChoice';
import DropDown from '../../components/DropDown/DropDown';
import RatingScale from '../../components/RatingScale/RatingScale';
import LikestScale from '../../components/LikestScale/LikestScale';
import TextInput from '../../components/TextInput/TextInput';
import TextArea from '../../components/TextArea/TextArea';
import DatePicker from '../../components/DatePicker/DatePicker';
import FileUpload from '../../components/FileUpload/FileUpload';
import Checkbox from '../../components/Checkbox/Checkbox';
import Inputs from '../../components/Inputs/Inputs';
import './FeedbackForm.css';
import { useNavigate } from 'react-router-dom';

interface Question {
  type: string;
  prompt: string;
  options?: string[];
  _id: string;
}

interface FeedbackFormProps {
  withData: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ withData }) => {
  const { formData, apiUrl, setFormData } = useFormContext();
  console.log('heelo', formData)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formId, setFormId] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/allForms`);
        if (response.data.success && response.data.message.length > 0) {
          const firstForm = response.data.message[0];
          setQuestions(firstForm.questions);
          setFormId(firstForm._id);
        } else {
          toast.error('No forms available');
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);




  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append('file', formData.fileupload?.[`667b20c475465408fd442bab`]);
    const payload = {
      formId: formId,
      user: formData.user,
      responses: questions.map((question) => {
        const response = formData.multiple_choice[question._id] ||
          formData.single_choice[question._id] ||
          formData.dropdown[question._id] ||
          formData.textarea[question._id] ||
          formData.ratingscale[question._id] ||
          formData.likestscale[question._id] ||
          formData.textinput[question._id] ||
          formData.datepicker[question._id] ||
          formData.fileupload[question._id] ||
          formData.checkbox[question._id];
        return {
          questionId: question._id,
          response: Array.isArray(response) ? response.join(', ') : response,
        };
      }),
    };
    form.append("json", JSON.stringify(payload))


    try {
      const response = await axios.post(`${apiUrl}/api/feedback`, form);
      if (response.data) {
        toast.success('Form submitted successfully');
        navigate("/");
      } else {
        toast.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form');
    }
  };

  return (
    <>
      {withData && <Inputs />}
      <form className="form" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div className="question-container" key={question._id}>
            <span className="question-number">{index + 1}.</span>
            <div className="question-content">

              <div className="question-options">
                {(() => {
                  switch (question.type) {
                    case 'Multiple choice':
                      return <MultipleChoice question={question.prompt} options={question.options || []} questionId={question._id} />;
                    case 'Single choice':
                      return <SingleChoice question={question.prompt} options={question.options || []} questionId={question._id} />;
                    case 'Dropdown':
                      return <DropDown question={question.prompt} options={question.options || []} questionId={question._id} />;
                    case 'Rating scale':
                      return <RatingScale question={question.prompt} scale={5} questionId={question._id} />;
                    case 'Likert scale':
                      return <LikestScale question={question.prompt} options={question.options || []} questionId={question._id} />;
                    case 'Text input (upto 150 characters)':
                      return <TextInput question={question.prompt} questionId={question._id} />;
                    case 'Text area (upto 500 characters)':
                      return <TextArea question={question.prompt} questionId={question._id} />;
                    case 'Date picker':
                      return <DatePicker question={question.prompt} questionId={question._id} />;
                    case 'File upload':
                      return <FileUpload question={question.prompt} questionId={question._id} />;
                    case 'Checkbox':
                      return <Checkbox question={question.prompt} options={question.options || []} questionId={question._id} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
          </div>
        ))}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default FeedbackForm;











