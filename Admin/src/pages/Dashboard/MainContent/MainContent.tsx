import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

interface FeedbackData {
  rating: number;
  count: number;
}

const MainContent: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage or any other secure storage
        
        const response = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/feedback/starrating', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the request headers
          },
        });
        
        setFeedbackData(response.data);
        
       
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch feedback data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Calculate total count
  const totalCount = feedbackData.reduce((sum, data) => sum + data.count, 0);
  
  // Calculate percentage for each rating
  const pieChartData = feedbackData.map(data => ({
    rating: data.rating,
    value: (data.count / totalCount) * 100,
  }));

  // Define colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {/* Bar Chart */}
      <ResponsiveContainer width="45%" height={500}>
        <BarChart data={feedbackData}>
          <XAxis type="number" dataKey="rating" ticks={[1, 2, 3, 4, 5]} />
          <YAxis type="number" dataKey="count" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="violet" />
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <ResponsiveContainer width="45%" height={500}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="rating"
            outerRadius={200}
            fill="#8884d8"
            label
          >
            {pieChartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
    
    </div>
  );
};

export default MainContent;
