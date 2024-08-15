import React, { useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

interface FeedbackTrend {
  date: string;
  count: number;
}

interface RepeatedIssue {
  _id: string;
  count: number;
}


// Define the component
const StatusDistributionChart: React.FC = () => {
  const [data, setData] = useState<FeedbackTrend[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<RepeatedIssue[]>([]);


  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        
        const response = await axios.get('http://localhost:4000/api/admin/feedbackstatistics', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setData(response.data);
        const response2 = await axios.get('http://localhost:4000/api/admin/feedback/repeatedissues', {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your token
          },
        });
        console.log("The issues",response2.data)
        setIssues(response2.data);
      }
      catch(err){
        setError('Failed to fetch feedback data');
      }
    }
    fetchData()
},[])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
    <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="_id" tickFormatter={(date) => format(parseISO(date), 'MMM dd')}/>
    <YAxis/>
    
    <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    </LineChart>
    
    <div className="repeated-issues-table">
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
