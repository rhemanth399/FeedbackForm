// questionsData.ts
export const questionsData = [
  
  {
    id: 'q1',
    type: 'multiple_choice',
    question: 'Which of the following features do you use the most?',
    options: ['Feature A', 'Feature B', 'Feature C', 'Feature D']
  },
  {
    id: 'q2',
    type: 'single_choice',
    question: 'Which of the following is your preferred mode of communication?',
    options: ['Email', 'Phone', 'In-Person', 'Chat']
  },
  {
    id: 'q3',
    type: 'dropdown',
    question: 'Select your country',
    options: ['USA', 'Canada', 'UK', 'Australia']
  },
  {
    id: 'q4',
    type: 'rating_scale',
    question: 'How satisfied are you with our product?',
    scale: 5
  },
  {
    id: 'q5',
    type: 'likest_scale',
    question: 'How strongly do you agree with the following statement: "Our product is easy to use."',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'q6',
    type: 'text_input',
    question: 'Please enter your email address',
  },
  {
    id: 'q7',
    type: 'text_area',
    question: 'Please describe your experience with our service in detail',
  },
  {
    id: 'q8',
    type: 'date_picker',
    question: 'Select your date of birth',
  },
  {
    id: 'q9',
    type: 'file_upload',
    question: 'Upload your profile picture',
  },
  {
    id: 'q10',
    type: 'checkbox',
    question: 'Which of the following services are you interested in?',
    options: ['Service A', 'Service B', 'Service C']
  }
];
