import React from 'react';
import './FeedbackForm.css'
import { Button } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
import { questionsData } from '../../questionsData'; 
import RatingField from '../../components/RateField/RatingField';
import YesNoField from '../../components/YesNoField/YesNoField';
import TextFieldComponent from '../../components/TextField/TextField';
import CommentsField from '../../components/CommentsField/CommentsField';
import axios from 'axios'
import { toast } from 'react-toastify';
import Inputs from '../../components/Inputs/Inputs';

interface FeedbackFormProps {
  withData: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({withData}) => {
  const { formData ,apiUrl,setFormData } = useFormContext();


  const handleSubmit = async (event :React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    console.log(formData)
    

    try {
      const response = await axios.post(apiUrl+"/api/create",formData)
      
      if(response.data.success){
        setFormData({
          rating:"",
          comment:"",
          yesNo:"",
          name:""
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error("Error")
    }
  }
  return (
    <>
   { withData && <Inputs/> }
    <form className='form' onSubmit={handleSubmit}>
      {questionsData.map((question,index) => {
        switch (question.type) {
          case 'rating':
            return (
                <span className='main'>
                <span className='question-number'>
                    {index+1} .
                </span>
            <RatingField key={question.id} question={question.question} id={question.id} />
            </span>
            );
          case 'yes_no':
            return (
                <span className='main'>
                <span className='question-number'>
                    {index+1} .
                </span>
            <YesNoField key={question.id} question={question.question} id={question.id} />
            </span>
            );
          case 'text':
            return (
                <span className='main text-field'>
                <span className='question-number'>
                    {index+1} .
                </span>
                 <TextFieldComponent key={question.id} question={question.question} id={question.id} />
                 </span>
            );
          case 'comments':
            return (
                <span className='main comment-field'>
                <span className='question-number '>
                    {index+1} .
                </span>
                 <CommentsField key={question.id} question={question.question} id={question.id}  />
                 </span>
            );
          default:
            return null;
        }
      })}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </form>
    </>
  );
};

export default FeedbackForm;
