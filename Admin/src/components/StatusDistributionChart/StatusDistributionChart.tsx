import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// Define the type for each data entry
interface ChartData {
  name: string;
  value: number;
}

// Define the component
const StatusDistributionChart: React.FC = () => {
  // Define the data and colors
  const data: ChartData[] = [
    { name: 'Pending', value: 10 },
    { name: 'Assigned', value: 20 },
    { name: 'Resolved', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default StatusDistributionChart;
