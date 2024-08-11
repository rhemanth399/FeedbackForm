import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Grid,CardContent, Typography, MenuItem, Select, InputLabel, FormControl, Button, TextField, Pagination, Box, CircularProgress } from '@mui/material';
import './ListOfFeedback.css'

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Response {
  questionText: string;
  response: any;
  questionPrompt: string;
}

interface Feedback {
  _id: string;
  formId: string;
  user: User;
  responses: Response[];
  submittedAt: string;
  assignedAdmin?: Admin;
  status?: string;
  resolutionComment?: string;
}

interface Admin {
  _id: string;
  name: string;
  email: string;
}

const ListOfFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [feedbacksPerPage] = useState<number>(5);
  const [comment, setComment] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token")
        const feedbackResponse = await axios.get('http://localhost:4000/api/admin/listoffeedback',{
          headers:{
            Authorization :`Bearer ${token}`
          }
        });
        console.log(feedbackResponse)
        setFeedbacks(feedbackResponse.data);
        const adminResponse = await axios.get('http://localhost:4000/api/admin/listofadmins');
        setAdmins(adminResponse.data.admins);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  

  const handleResolveFeedback = async (feedbackId: string, resolutionComment: string) => {
    try {
      await axios.put(`http://localhost:4000/api/${feedbackId}/resolve`, { resolutionComment });
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback._id === feedbackId
            ? { ...feedback, status: 'resolved', resolutionComment }
            : feedback
        )
      );
      setComment(prevComment => ({ ...prevComment, [feedbackId]: '' }));
    } catch (err) {
      setError('Error resolving feedback');
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastFeedback = page * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  return (
    <Container className="feedback-list">
      <Typography>Feedback List</Typography>
    <Grid container spacing={2}>
    {currentFeedbacks.map(feedback => (
      <Grid item xs={12} sm={6} key={feedback._id}>
      <Card key={feedback._id} className={`feedback-item ${feedback.status || 'unassigned'}`}  sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Feedback from {feedback.user.name || 'Anonymous'}</Typography>
          <Typography>Email: {feedback.user.email || 'N/A'}</Typography>
          <Typography>Phone: {feedback.user.phone || 'N/A'}</Typography>
          <Typography>Status: {feedback.status || 'unassigned'}</Typography>
          {feedback.assignedAdmin && (
            <Typography>Assigned Admin: {feedback.assignedAdmin.name}</Typography>
          )}
          <Typography variant="subtitle1">Responses:</Typography>
          <ul className="ul-items">
            {feedback.responses.map((response, index) => (
              <li key={index}>
              <span className='question'>{index+1}){response.questionPrompt}</span>
              <p>
              A) {response.file ? (
            response.file.endsWith('.jpg') || response.file.endsWith('.png') ? (
              <img src={response.file} alt="uploaded file" style={{ maxWidth: '100px', height: '100px' }} />
            ) : (
              <a href={response.file} download>
                Download File
              </a>
            )
          ) : (
            response.response || 'N/A'
          )}
              </p>
             
              </li>
            ))}
          </ul>
       
         
        </CardContent>
        <TextField
                  label="Add a Comment"
                  variant="outlined"
                  fullWidth
                  value={comment[feedback._id] || ''}
                  onChange={(e) => setComment({ ...comment, [feedback._id]: e.target.value })}
                  sx={{ mt: 2 }}
                />
        <Button
                  style={{ backgroundColor: 'violet', color: '#fff', marginTop: '10px' }}
                  onClick={() => handleResolveFeedback(feedback._id, comment[feedback._id] || '')}
                >
                  Add Comment
                </Button>
          </Card>
      </Grid>
    ))}
    
    <Box display="flex" justifyContent="center" alignItems="center" mt={2} sx={{ height: '100px' }}>
      <Pagination count={Math.ceil(feedbacks.length / feedbacksPerPage)} page={page} onChange={handleChangePage} />
    </Box>
    </Grid>
  </Container>
  );
};

export default ListOfFeedback;





// {feedback.status === 'assigned' && (
//   <Box sx={{ mt: 2 }}>
//     <TextField
//       fullWidth
//       label="Resolution Comment"
//       variant="outlined"
//       onBlur={e => handleResolveFeedback(feedback._id, e.target.value)}
//     />
//     <Button
//       sx={{ mt: 1 }}
//       variant="contained"
//       color="primary"
//       onClick={() => handleResolveFeedback(feedback._id, feedback.resolutionComment || '')}
//     >
//       Resolve
//     </Button>
//   </Box>
// )}