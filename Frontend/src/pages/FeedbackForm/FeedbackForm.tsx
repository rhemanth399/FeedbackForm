import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
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
import './FeedbackForm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

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
  const { formData, apiUrl } = useFormContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title,setTitle] =useState<(any)>('')
  const [formId, setFormId] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the formId from the query parameters
  const searchParams = new URLSearchParams(location.search);
  const dbformId = searchParams.get('formId');

  useEffect(() => {
    const fetchData = async () => {
      if (!dbformId) {
        toast.error('Form ID is missing');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://feedbackform-backend-ao0d.onrender.com/api/forms/${dbformId}`);
        console.log(response)
        if (response.data.success && response.data.message) {
          const firstForm = response.data.message;
          setTitle(firstForm.title)
          setQuestions(firstForm.questions);
          setFormId(firstForm._id);
        } else {
          toast.error('No forms available');
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [apiUrl]);


  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const form = new FormData();
    
  //   if (formData.fileupload) {
  //     Object.keys(formData.fileupload).forEach((questionId) => {
  //       const file = formData.fileupload[questionId];
  //       if (file) {
  //         form.append('file', file);
  //       }
  //     });
  //   }
  
  //   const payload = {
  //     formId: formId,
  //     user: formData.user,
  //     responses: questions
  //       .map((question) => {
  //         const response = formData.multiple_choice[question._id] ||
  //           formData.single_choice[question._id] ||
  //           formData.dropdown[question._id] ||
  //           formData.textarea[question._id] ||
  //           formData.ratingscale[question._id] ||
  //           formData.likestscale[question._id] ||
  //           formData.textinput[question._id] ||
  //           formData.datepicker[question._id] ||
  //           formData.fileupload[question._id] ||
  //           formData.checkbox[question._id];
          
  //         if (response === undefined || response === null) {
  //           return null; // Skip questions with no response
  //         }
  
  //         return {
  //           questionId: question._id,
  //           questionType: question.type,
  //           response: Array.isArray(response) ? response.join(', ') : response,
  //         };
  //       })
  //       .filter(response => response !== null), // Filter out null responses
  //   };
  
  //   console.log("Payload:", payload);
  //   form.append("json", JSON.stringify(payload));
    
  //   try {
  //     console.log("Submitting form...");
  //     const response = await axios.post(`https://feedbackform-backend-ao0d.onrender.com/api/feedback`, form, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       }
  //     });
  //     if (response.data) {
  //       toast.success('Form submitted successfully');
  //       navigate("/");
  //     } else {
  //       toast.error('Failed to submit form');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     toast.error('An error occurred while submitting the form');
  //   }
  // };
  




  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    if (formData.fileupload) {
      Object.keys(formData.fileupload).forEach((questionId) => {
        const file = formData.fileupload[questionId];
        if (file) {
          form.append('file', file);
        }
      });
    }
    const payload = {
      formId: formId,
      user: formData.user,
      responses: questions.map((question) => {
        {console.log(question._id)}
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
          questionType: question.type,
          response: Array.isArray(response) ? response.join(', ') : response,
        };
      }),
    };
    console.log("hhhh",payload)
    form.append("json", JSON.stringify(payload))
    


    try {
      console.log("Hi")
      const response = await axios.post(`https://feedbackform-backend-ao0d.onrender.com/api/feedback`, form,{
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      });
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
      {loading ? (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      ) : questions.length > 0 ? (
        <>
        <h1>{title}</h1>
          {withData && <Inputs />}
          <form className="form" onSubmit={handleSubmit}>
            
            {questions.map((question, index) => (
              <div className="question-container" key={question._id}>
                <div className="question-number">{index + 1}.</div>
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
                        case 'Text area (upto 250 characters)':
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
      ) : (
        <div>404 Not Found</div>
      )}
    </>
  )

}
export default FeedbackForm;