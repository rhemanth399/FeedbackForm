import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  mobile: string;
  email:string
}
interface FormData {
  multiple_choice: string;
  single_choice: string;
  dropdown: string;
  ratingscale: string;
  likestscale:string,
  textinput:string,
  textarea:string,
  datepicker:string,
  fileupload:string,
  checkbox:string
  user:User
}
interface FormContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  apiUrl: string;
}




const initialFormData: FormData = {
  multiple_choice: "",
  single_choice: "",
  dropdown: "",
  ratingscale: "",
  likestscale:"",
  textinput:"",
  textarea:"",
  datepicker:"",
  fileupload:"",
  checkbox:"",
  user:{
    name:"",
    mobile:"",
    email:""
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormDataState] = useState<FormData>(initialFormData);
  const apiUrl: string = "http://localhost:4000";

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState(prevState => ({
      ...prevState,
      ...data,
      user: {
        ...prevState.user,
        ...data.user,
      },
    }));
  };

  return <FormContext.Provider value={{ formData, setFormData, apiUrl }}>{children}</FormContext.Provider>;
};
