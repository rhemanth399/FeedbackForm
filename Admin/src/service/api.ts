import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const getQuestions = async () => {
  const response = await api.get('/questions');
  return response.data;
};

export const createQuestions = async (questions: string[]) => {
  const response = await api.post('/questions', { questions });
  return response.data;
};
