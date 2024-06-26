import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, MenuItem, Select, InputLabel, FormControl, Button, TextField, Pagination, Box, CircularProgress } from '@mui/material';
import './ListOfFeedback.css'

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Response {
  questionText: string;
  response: string;
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

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackResponse = await axios.get('http://localhost:4000/api/listOfFeedback');
        setFeedbacks(feedbackResponse.data.message);
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

  const handleAssignAdmin = async (feedbackId: string, adminId: string) => {
    try {
      await axios.put(`http://localhost:4000/api/${feedbackId}/assign`, { adminId });
      const assignedAdmin = admins.find(admin => admin._id === adminId);
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback._id === feedbackId
            ? {
                ...feedback,
                assignedAdmin,
                status: 'assigned'
              }
            : feedback
        )
      );
    } catch (err) {
      setError('Error assigning admin');
    }
  };

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
    <Typography variant="h4" gutterBottom>
      List of Feedback
    </Typography>
    {currentFeedbacks.map(feedback => (
      <Card key={feedback._id} className={`feedback-item ${feedback.status || 'unassigned'}`} sx={{ mb: 2 }}>
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
              A){response.response || 'N/A'}
              </p>
              </li>
            ))}
          </ul>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor={`assign-admin-${feedback._id}`}>Assign to Admin</InputLabel>
            <Select
              id={`assign-admin-${feedback._id}`}
              onChange={e => handleAssignAdmin(feedback._id, e.target.value)}
              value={feedback.assignedAdmin?._id || ''}
            >
              <MenuItem value="">
                <em>Select Admin</em>
              </MenuItem>
              {admins.map(admin => (
                <MenuItem key={admin._id} value={admin._id}>
                  {admin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
        </CardContent>
      </Card>
    ))}
    <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
      <Pagination count={Math.ceil(feedbacks.length / feedbacksPerPage)} page={page} onChange={handleChangePage} />
    </Box>
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