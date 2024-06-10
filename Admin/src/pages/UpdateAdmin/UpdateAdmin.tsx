import React, { useState, useEffect } from "react";
import './UpdateAdmin.css';
import { getQuestions } from '../../service/api';
import "./UpdateAdmin.css"

// Define the type for the API response
interface ApiResponse {
  success: boolean;
  data: {
    _id: string;
    questions: string[];
    __v: number;
  }[];
}

const UpdateAdmin: React.FC = () => {
  const [listOfQuestions, setListOfQuestions] = useState<string[]>([]);

  const fetchListOfQuestions = async () => {
    const response: ApiResponse = await getQuestions();
    if (response.success && response.data.length > 0) {
      setListOfQuestions(response.data[0].questions);
    }
  };

  useEffect(() => {
    fetchListOfQuestions();
  }, []);
  console.log(listOfQuestions)

  return (
    <div className="list-of-questions">
     
      <ul>
        {listOfQuestions.map((question, index) => (
          <li key={index} ><span>{question}</span>
          
          <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateAdmin;
