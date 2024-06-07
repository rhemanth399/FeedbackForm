import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  mobile: string;
}
interface FormData {
  rating: string;
  comment: string;
  yesNo: string;
  name: string;
  user:User
}
interface FormContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  apiUrl: string;
}




const initialFormData: FormData = {
  rating: "",
  comment: "",
  yesNo: "",
  name: "",
  user:{
    name:"",
    mobile:""
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
