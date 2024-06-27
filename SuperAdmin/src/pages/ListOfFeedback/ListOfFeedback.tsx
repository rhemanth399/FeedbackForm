import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  phone: string;
}



interface Response {
  questionId: string;
  response: string;
  prompt:string;
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

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackResponse = await axios.get('http://localhost:4000/api/listOfFeedback')
        setFeedbacks(feedbackResponse.data.message);
        const adminResponse = await axios.get('http://localhost:4000/api/admin/listofadmins');
        console.log(adminResponse.data.admins)
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
      await axios.put(`/api/feedbacks/${feedbackId}/assign`, { adminId });
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback._id === feedbackId
            ? {
                ...feedback,
                assignedAdmin: admins.find(admin => admin._id === adminId),
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
      await axios.put(`/api/feedbacks/${feedbackId}/resolve`, { resolutionComment });
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>List of Feedback</h1>
      {feedbacks.map(feedback => (
        <div key={feedback._id} className="feedback-item">
          <h2>Feedback from {feedback.user.name || 'Anonymous'}</h2>
          <p>Email: {feedback.user.email || 'N/A'}</p>
          <p>Phone: {feedback.user.phone || 'N/A'}</p>
          <p>Status: {feedback.status || 'unassigned'}</p>
          <div>
            <h3>Responses:</h3>
            <ul>
              {feedback.responses.map(response => (
                <li key={response.questionId}>
                  Question ID: {response.questionId}, Response: {response.response || 'N/A'}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor={`assign-admin-${feedback._id}`}>Assign to Admin: </label>
            <select
              id={`assign-admin-${feedback._id}`}
              onChange={e => handleAssignAdmin(feedback._id, e.target.value)}
              value={feedback.assignedAdmin?._id || ''}
            >
              <option value="">Select Admin</option>
              {admins.map(admin => (
                <option key={admin._id} value={admin._id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div>
          {feedback.status === 'assigned' && (
            <div>
              <label htmlFor={`resolution-comment-${feedback._id}`}>Resolution Comment: </label>
              <input
                type="text"
                id={`resolution-comment-${feedback._id}`}
                onBlur={e => handleResolveFeedback(feedback._id, e.target.value)}
              />
              <button onClick={() => handleResolveFeedback(feedback._id, feedback.resolutionComment || '')}>
                Resolve
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListOfFeedback;
