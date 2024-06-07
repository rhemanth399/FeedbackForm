import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getQuestions, createQuestions } from '.././service/api';

interface Question {
  _id: string;
  question: string;
}

interface QuestionsContextProps {
  questions: Question[];
  addQuestions: (newQuestions: string[]) => Promise<void>;
  fetchQuestions: () => Promise<void>;
}

const QuestionsContext = createContext<QuestionsContextProps | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const addQuestions = async (newQuestions: string[]) => {
    const addedQuestions = await createQuestions(newQuestions);
    setQuestions(prevQuestions => [...prevQuestions, ...addedQuestions]);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuestionsContext.Provider value={{ questions, addQuestions, fetchQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = (): QuestionsContextProps => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
