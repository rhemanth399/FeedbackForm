// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Card, Grid, CardContent, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Pagination, Box, CircularProgress } from '@mui/material';
// import './ListOfFeedback.css'

// interface User {
//   name: string;
//   email: string;
//   phone: string;
// }

// interface Response {
//   questionText: string;
//   response: string;
//   questionPrompt: string;
//   questionType:string;
// }

// interface Feedback {
//   _id: string;
//   formId: string;
//   user: User;
//   responses: Response[];
//   submittedAt: string;
//   assignedAdmin?: Admin;
//   status?: string;
//   resolutionComment?: string;
//   adminSubmittedDate: string
// }

// interface Admin {
//   _id: string;
//   name: string;
//   email: string;
// }

// const ListOfFeedback: React.FC = () => {
//   const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState<number>(1);
//   const [feedbacksPerPage] = useState<number>(2);
//   const [comments, setComments] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const feedbackResponse = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/listOfFeedback');
//         setFeedbacks(feedbackResponse.data.message);
//         const adminResponse = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/listofadmins');
//         setAdmins(adminResponse.data.admins);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };
//     fetchFeedbacks();
//   }, []);

//   const handleAssignAdmin = async (feedbackId: string, adminId: string) => {
//     const comment = comments[feedbackId];
//     try {
//       await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/${feedbackId}/assign`, { adminId, comment });
//       const assignedAdmin = admins.find(admin => admin._id === adminId);
//       setFeedbacks(prevFeedbacks =>
//         prevFeedbacks.map(feedback =>
//           feedback._id === feedbackId
//             ? {
//                 ...feedback,
//                 assignedAdmin,
//                 status: 'assigned',
//                 resolutionComment: comment,
//               }
//             : feedback
//         )
//       );
//     } catch (err) {
//       setError('Error assigning admin');
//     }
//   };

//   const handleCommentChange = (feedbackId: string, value: string) => {
//     setComments(prevComments => ({
//       ...prevComments,
//       [feedbackId]: value,
//     }));
//   };

//   const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
//   if (error) return <div>Error: {error}</div>;

//   const indexOfLastFeedback = page * feedbacksPerPage;
//   const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
//   const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

//   return (
//     <Container className="feedback-list">
//       <Typography variant="h4" gutterBottom>
//         List of Feedback
//       </Typography>
//       <Grid container spacing={2}>
//         {currentFeedbacks.map(feedback => (
//           <Grid item xs={12} sm={6} key={feedback._id}>
//             <Card className={`feedback-item ${feedback.status || 'unassigned'}`} sx={{ mb: 2 }}>
//               <CardContent>
//               <Typography variant="h6" className="highlight-name">{feedback.user.name || 'Anonymous'}</Typography>
//                 <div className='top-content'>
                
//                 <Typography>📧: {feedback.user.email || 'N/A'}</Typography>
//                 <Typography>📞: {feedback.user.phone || 'N/A'}</Typography>
//                 <Typography>🥲: {feedback.status || 'unassigned'}</Typography>
//                 {feedback.assignedAdmin && (
//                   <Typography>👨‍💼: {feedback.assignedAdmin.name}</Typography>
//                 )}
//                 {feedback.resolutionComment && (
//                   <>
//                     <Typography>💬: {feedback.resolutionComment}</Typography>
//                     <Typography>📅: {new Date(feedback.adminSubmittedDate).toLocaleDateString('en-GB', {
//                                       day: 'numeric',
//                                       month: 'short', // Short month format
//                                       year: 'numeric',
//                                       })}
//                     </Typography>
//                   </>
//                 )}
//                 </div>
//                 <Typography variant="subtitle1"></Typography>
//                 <ul className="ul-items">
//                   {feedback.responses.map((response, index) => (
//                     <li key={index}>
//                       <span className='question'>{index + 1}) {response.questionPrompt}</span>
//                       <p>A) {
//                 response.questionType==="File upload"?(<img src={response.response} alt ='file upload' className="file-upload"/>):(response.response)
//               }</p>
//                     </li>
//                   ))}
//                 </ul>
//                 <TextField
//                   label="Add a Comment"
//                   fullWidth
//                   value={comments[feedback._id] || ''}
//                   onChange={(e) => handleCommentChange(feedback._id, e.target.value)}
//                 />
//                 <FormControl fullWidth sx={{ mt: 2 }}>
//                   <InputLabel htmlFor={`assign-admin-${feedback._id}`}>Assign to Admin</InputLabel>
//                   <Select
//                     id={`assign-admin-${feedback._id}`}
//                     onChange={e => handleAssignAdmin(feedback._id, e.target.value)}
//                     value={feedback.assignedAdmin?._id || ''}
//                   >
//                     <MenuItem value="">
//                       <em>Select Admin</em>
//                     </MenuItem>
//                     {admins.map(admin => (
//                       <MenuItem key={admin._id} value={admin._id}>
//                         {admin.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
//         <Pagination count={Math.ceil(feedbacks.length / feedbacksPerPage)} page={page} onChange={handleChangePage} />
//       </Box>
//     </Container>
//   );
// };

// export default ListOfFeedback;










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Container,IconButton, Card, Grid, CardContent, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Pagination, Box, CircularProgress } from '@mui/material';
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
  questionType:string;
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
  adminSubmittedDate: string
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
  const [feedbacksPerPage] = useState<number>(2);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null);

  const handleToggleExpand = (feedbackId: string) => {
    setExpandedFeedbackId(prevId => (prevId === feedbackId ? null : feedbackId));
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackResponse = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/listOfFeedback');
        setFeedbacks(feedbackResponse.data.message);
        const adminResponse = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/listofadmins');
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
    const comment = comments[feedbackId];
    try {
      await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/${feedbackId}/assign`, { adminId, comment });
      const assignedAdmin = admins.find(admin => admin._id === adminId);
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback._id === feedbackId
            ? {
                ...feedback,
                assignedAdmin,
                status: 'assigned',
                resolutionComment: comment,
              }
            : feedback
        )
      );
    } catch (err) {
      setError('Error assigning admin');
    }
  };

  const handleCommentChange = (feedbackId: string, value: string) => {
    setComments(prevComments => ({
      ...prevComments,
      [feedbackId]: value,
    }));
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
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
      <Grid container spacing={2}>
        {currentFeedbacks.map(feedback => (
          <Grid item xs={12} sm={6} key={feedback._id}>
            <Card className={`feedback-item ${feedback.status || 'unassigned'}`} sx={{ mb: 2 }}>
              <CardContent>
              <Typography variant="h6" className="highlight-name">{feedback.user.name || 'Anonymous'}</Typography>
                <div className='top-content'>
                {expandedFeedbackId === feedback._id ? (
                  <>
                <Typography>📧: {feedback.user.email || 'N/A'}</Typography>
                <Typography>📞: {feedback.user.phone || 'N/A'}</Typography>
                <Typography>🥲: {feedback.status || 'unassigned'}</Typography>
                {feedback.assignedAdmin && (
                  <Typography>👨‍💼: {feedback.assignedAdmin.name}</Typography>
                )}
                <Typography>📅: {new Date(feedback.adminSubmittedDate).toLocaleDateString('en-GB', {
                                      day: 'numeric',
                                      month: 'short', // Short month format
                                      year: 'numeric',
                                      })}
                </Typography>
                </>
                ):(
                  <div className="ellipsis-content">
                  <IconButton onClick={() => handleToggleExpand(feedback._id)}>
                    <MoreHorizIcon />
                  </IconButton>
                </div>
              )}
                {feedback.resolutionComment && (
                  <>
                    <Typography>💬: {feedback.resolutionComment}</Typography>
                    
                  </>
                )}
                </div>
                {expandedFeedbackId === feedback._id && (
                  <div>
                <Typography variant="subtitle1"></Typography>
                <ul className="ul-items">
                  {feedback.responses.map((response, index) => (
                    <li key={index}>
                      <span className='question'>{index + 1}) {response.questionPrompt}</span>
                      <p>A) {
                response.questionType==="File upload"?(<img src={response.response} alt ='file upload' className="file-upload"/>):(response.response)
              }</p>
                    </li>
                  ))}
                </ul>
                <TextField
                  label="Add a Comment"
                  fullWidth
                  value={comments[feedback._id] || ''}
                  onChange={(e) => handleCommentChange(feedback._id, e.target.value)}
                />
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
                </div>
                  )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination count={Math.ceil(feedbacks.length / feedbacksPerPage)} page={page} onChange={handleChangePage} />
      </Box>
    </Container>
  );
};

export default ListOfFeedback;

