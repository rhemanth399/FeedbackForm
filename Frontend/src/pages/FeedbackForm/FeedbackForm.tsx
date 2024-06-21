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
// Define the type for the question object
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/allForms`);
        if (response.data.success && response.data.message.length > 0) {
          const firstForm = response.data.message[0];
          setQuestions(firstForm.questions);
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
    console.log(formData);
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
                  <MultipleChoice question={question.prompt} options={question.options || []} />
                </span>
              );
            case 'Single choice':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <SingleChoice question={question.prompt} options={question.options || []} />
                </span>
              );
            case 'Dropdown':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <DropDown question={question.prompt} options={question.options || []} />
                </span>
              );
            case 'Rating scale':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <RatingScale question={question.prompt}  scale={5}/>
                </span>
              );
            case 'Likert scale':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <LikestScale question={question.prompt} options={question.options || []} />
                </span>
              );
            case 'Text input (short answer)':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <TextInput question={question.prompt} />
                </span>
              );
            case 'Text area (long answer)':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <TextArea question={question.prompt} />
                </span>
              );
            case 'Date picker':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <DatePicker question={question.prompt} />
                </span>
              );
            case 'File upload':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <FileUpload question={question.prompt} />
                </span>
              );
            case 'Checkbox':
              return (
                <span className='main' key={question._id}>
                  <span className='question-number'>
                    {index + 1}.
                  </span>
                  <Checkbox question={question.prompt} options={question.options || []} />
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
