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

interface likestScale {
  [questionId:string]:string;
}
interface ratingScale {
  [questionId:string]:string | number;
}
interface datePicker {
  [questionId:string]:string;
}

interface fileUpload {
  [questionId:string]:string;
}

interface multipleChoice{
  [questionId:string]:string[];
}

interface singleChoice {
  [questionId:string]:string[];
}

interface checkBox {
  [questionId:string]:string[];
}


interface FormData {
  multiple_choice: multipleChoice;
  single_choice: singleChoice;
  dropdown: DropDown;
  ratingscale: ratingScale;
  likestscale: likestScale;
  textinput: TextInput;
  textarea: TextArea
  datepicker: datePicker;
  fileupload: fileUpload;
  checkbox: checkBox;
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
  likestscale: {},
  textinput: {},
  textarea: {},
  datepicker: {},
  fileupload: {},
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
      multiple_choice: {
        ...prevState.multiple_choice,
        ...data.multiple_choice,
      },
      single_choice: {
        ...prevState.single_choice,
        ...data.single_choice,
      },
      dropdown: {
        ...prevState.dropdown,
        ...data.dropdown,
      },
      ratingscale: {
        ...prevState.ratingscale,
        ...data.ratingscale,
      },
      likestscale: {
        ...prevState.likestscale,
        ...data.likestscale,
      },
      textinput: {
        ...prevState.textinput,
        ...data.textinput,
      },
      textarea: {
        ...prevState.textarea,
        ...data.textarea,
      },
      datepicker: {
        ...prevState.datepicker,
        ...data.datepicker,
      },
      fileupload: {
        ...prevState.fileupload,
        ...data.fileupload,
      },
      checkbox: {
        ...prevState.checkbox,
        ...data.checkbox,
      },
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
