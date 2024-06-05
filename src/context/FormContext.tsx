import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  formData: Record<string, string>;
  setFormData: (data: Record<string, string>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
};
