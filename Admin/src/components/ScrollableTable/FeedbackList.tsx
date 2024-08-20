import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  TextField,
  Pagination,
  Box,
  CircularProgress,
} from '@mui/material';
import './ListOfFeedback.css';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Response {
  questionText: string;
  response: any;
  file: any;
  questionPrompt: string;
  questionType: string;
}

interface Feedback {
  _id: string;
  formId: string;
  user: User;
  responses: Response[];
  comment: string;
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

interface ListOfFeedbackProps {
  searchQuery: string; // Prop passed from parent component for search
}

const ListOfFeedback: React.FC<ListOfFeedbackProps> = ({ searchQuery }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [_admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [feedbacksPerPage] = useState<number>(2);
  const [comment, setComment] = useState<{ [key: string]: string }>({});
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const feedbackResponse = await axios.get(
          'https://feedbackform-backend-ao0d.onrender.com/api/admin/listoffeedback',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFeedbacks(feedbackResponse.data);
        setFilteredFeedbacks(feedbackResponse.data); // Set filtered feedbacks initially
        const adminResponse = await axios.get(
          'https://feedbackform-backend-ao0d.onrender.com/api/admin/listofadmins'
        );
        setAdmins(adminResponse.data.admins);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const filtered = feedbacks.filter((feedback) =>
      feedback.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.user.phone.includes(searchQuery) ||
      feedback.responses.some((response) =>
        response.response.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredFeedbacks(filtered);
  }, [searchQuery, feedbacks]);

  const handleResolveFeedback = async (feedbackId: string, resolutionComment: string) => {
    const adminSubmittedDate = Date.now();
    try {
      await axios.put(
        `https://feedbackform-backend-ao0d.onrender.com/api/${feedbackId}/resolve`,
        { resolutionComment, adminSubmittedDate }
      );
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === feedbackId
            ? { ...feedback, status: 'resolved', resolutionComment }
            : feedback
        )
      );
      setComment((prevComment) => ({ ...prevComment, [feedbackId]: '' }));
    } catch (err) {
      setError('Error resolving feedback');
    }
  };

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error}</div>;

  const indexOfLastFeedback = page * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  return (
    <Container className="feedback-list">
      <Grid container spacing={2}>
        {currentFeedbacks.length > 0 ? (
          currentFeedbacks.map((feedback, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card key={index} className={`feedback-item ${feedback.status || 'unassigned'}`} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">Feedback from {feedback.user.name || 'Anonymous'}</Typography>
                  <Typography>Email: {feedback.user.email || 'N/A'}</Typography>
                  <Typography>Phone: {feedback.user.phone || 'N/A'}</Typography>
                  <Typography>Status: {feedback.status || 'unassigned'}</Typography>
                  <Typography>Comment: {feedback.comment || 'N/A'}</Typography>

                  <Typography variant="subtitle1">Responses:</Typography>
                  <ul className="ul-items">
                    {feedback.responses.map((response, index) => (
                      <li key={index}>
                        <span className="question">
                          {index + 1}) {response.questionPrompt}
                        </span>
                        <p>
                          A:{' '}
                          {response.questionType === 'File upload' ? (
                            <img src={response.response} alt="file upload" className="file-upload" />
                          ) : (
                            response.response
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
                  Resolution
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No feedback found matching your search criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2} sx={{ height: '100px' }}>
        <Pagination
          count={Math.ceil(filteredFeedbacks.length / feedbacksPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default ListOfFeedback;
