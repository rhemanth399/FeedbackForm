import React, { useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import './StatusDistributionChart.css'; // Import the CSS file

interface FeedbackTrend {
  date: string;
  count: number;
}

interface RepeatedIssue {
  _id: string;
  count: number;
}

const StatusDistributionChart: React.FC = () => {
  const [data, setData] = useState<FeedbackTrend[]>([]);
  const [_error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<RepeatedIssue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/feedbackstatistics', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setData(response.data);
        const response2 = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/feedback/repeatedissues', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setIssues(response2.data);
      } catch (err) {
        setError('Failed to fetch feedback data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="status-distribution-container">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="_id" tickFormatter={(date) => format(parseISO(date), 'MMM dd')} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="table-container">
        <h3>Repeated Issues</h3>
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue._id}</td>
                <td>{issue.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusDistributionChart;
