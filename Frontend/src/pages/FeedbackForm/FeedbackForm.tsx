import React ,{useState, useEffect} from 'react';
import './FeedbackForm.css';
import { Button } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
import { questionsData } from '../../questionsData'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import Inputs from '../../components/Inputs/Inputs'; 
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

interface FeedbackFormProps {
  withData: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ withData }) => {
  const { formData, apiUrl, setFormData } = useFormContext();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the first form from the API
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

  console.log(questions)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    // try {
    //   const response = await axios.post(`${apiUrl}/api/create`, formData);

    //   if (response.data.success) {
    //     setFormData({
    //       rating: "",
    //       comment: "",
    //       yesNo: "",
    //       name: ""
    //     });
    //     toast.success(response.data.message);
    //   }
    // } catch (error) {
    //   toast.error("Error");
    // }
  };

  return (
    <>
      {withData && <Inputs />}
      <form className='form' onSubmit={handleSubmit}>
        {questions.map((question, index) => {
          
          switch (question) {
            case 'multiple_choice':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <MultipleChoice question={question.question} options={question.options || []} />
                </span>
              );
            case 'single_choice':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <SingleChoice question={question.question} options={question.options || []} />
                </span>
              );
            case 'dropdown':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <DropDown question={question.question} options={question.options || []} />
                </span>
              );
            case 'rating_scale':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <RatingScale question={question.question} scale={question.scale || 5} />
                </span>
              );
            case 'likert_scale':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <LikestScale question={question.question} options={question.options || []} />
                </span>
              );
            case 'text_input':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <TextInput question={question.question} />
                </span>
              );
            case 'text_area':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <TextArea question={question.question} />
                </span>
              );
            case 'date_picker':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <DatePicker question={question.question} />
                </span>
              );
            case 'file_upload':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <FileUpload question={question.question} />
                </span>
              );
            case 'checkbox':
              return (
                <span className='main' key={question.id}>
                  <span className='question-number'>
                    {index + 1} .
                  </span>
                  <Checkbox question={question.question} options={question.options || []} />
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
