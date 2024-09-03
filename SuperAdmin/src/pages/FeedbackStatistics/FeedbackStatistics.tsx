import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'

interface FeedbackStatisticsProps {}

interface FeedbackStatisticsData {
  totalCount: number;
  assignedCount: number;
  pendingCount: number;
  resolvedCount: number;
}


const FeedbackStatistics: React.FC<FeedbackStatisticsProps> = () => {
    const [statistics, setStatistics] = useState<FeedbackStatisticsData | null>(null);
  
    useEffect(() => {
      const fetchStatistics = async () => {
        try {

            const data = await  axios.get('https://feedbackform-backend-ao0d.onrender.com/api/feedback-statistics')
            setStatistics(data.data);
          } catch (error) {
            console.error('Error fetching feedback statistics:', error);
          }
        };
    
        fetchStatistics();
      }, []);

      const chartData = [
        { name: 'Total', count: statistics?.totalCount || 0 },
        { name: 'Assigned', count: statistics?.assignedCount || 0 },
        { name: 'Pending', count: statistics?.pendingCount || 0 },
        { name: 'Resolved', count: statistics?.resolvedCount || 0 },
      ];
    
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    };
    
    export default FeedbackStatistics;