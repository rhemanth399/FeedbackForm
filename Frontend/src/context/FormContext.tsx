import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  mobile: string;
  email: string;
}

interface TextArea {
  [questionId:string]:string;
}

interface TextInput {
  [questionId:string]:string;
}
interface DropDown {
  [questionId:string]:string;
}

interface FormData {
  multiple_choice: { [questionId: string]: string[] };
  single_choice: { [questionId: string]: string[] };
  dropdown: DropDown;
  ratingscale: { [questionId: string]: number | null };
  likestscale: string;
  textinput: TextInput;
  textarea: TextArea
  datepicker: string;
  fileupload: string;
  checkbox: { [questionId: string]: number | null };
  user: User;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  apiUrl: string;
}

const initialFormData: FormData = {
  multiple_choice: {},
  single_choice: {},
  dropdown: {},
  ratingscale: {},
  likestscale: "",
  textinput: {},
  textarea: {},
  datepicker: "",
  fileupload: "",
  checkbox: {},
  user: {
    name: "",
    mobile: "",
    email: ""
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

  return (
    <FormContext.Provider value={{ formData, setFormData, apiUrl }}>
      {children}
    </FormContext.Provider>
  );
};
