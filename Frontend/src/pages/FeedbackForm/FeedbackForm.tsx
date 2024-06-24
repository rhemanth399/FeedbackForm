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
import './FeedbackForm.css'

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formId,setFormId] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/allForms`);
        if (response.data.success && response.data.message.length > 0) {
          const firstForm = response.data.message[0];
          setQuestions(firstForm.questions);
          setFormId(firstForm._id)
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

    const payload = {
      formId: formId,  
      user: formData.user,
      responses: questions.map((question) => {
        const response = formData.multiple_choice[question._id] || formData.single_choice[question._id] || formData.dropdown[question._id] || formData.textarea[question._id]|| formData.ratingscale[question._id] || formData.likestscale[question._id] || formData.textinput[question._id] || formData.datepicker[question._id] || formData.fileupload[question._id] || formData.checkbox[question._id] ;
        return {
          questionId: question._id,
          response: Array.isArray(response) ? response.join(', ') : response,
        };
      }),
    };
    console.log("hemanth",payload)

    try {
      const response = await axios.post(`${apiUrl}/api/feedback`, payload);
      if (response.data) {
        toast.success('Form submitted successfully');
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
      <form className='form' onSubmit={handleSubmit}>
        {questions.map((question, index) => {
          switch (question.type) {
            case 'Multiple choice':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <MultipleChoice question={question.prompt} options={question.options || []} questionId={question._id} />
                </span>
              );
            case 'Single choice':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <SingleChoice question={question.prompt} options={question.options || []} questionId={question._id} />
                </span>
              );
            case 'Dropdown':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <DropDown question={question.prompt} options={question.options || []} questionId={question._id} />
                </span>
              );
            case 'Rating scale':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <RatingScale question={question.prompt} scale={5} questionId={question._id} />
                </span>
              );
            case 'Likert scale':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <LikestScale question={question.prompt} options={question.options || []} questionId={question._id} />
                </span>
              );
            case 'Text input (short answer)':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <TextInput question={question.prompt} questionId={question._id} />
                </span>
              );
            case 'Text area (long answer)':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <TextArea question={question.prompt} questionId={question._id} />
                </span>
              );
            case 'Date picker':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <DatePicker question={question.prompt} questionId={question._id} />
                </span>
              );
            case 'File upload':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <FileUpload question={question.prompt} questionId={question._id} />
                </span>
              );
            case 'Checkbox':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <Checkbox question={question.prompt} options={question.options || []} questionId={question._id} />
                </span>
              );
            default:
              return null;
          }
        })}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default FeedbackForm;
