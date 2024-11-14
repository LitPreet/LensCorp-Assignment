"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TaskBarChartProps {
  completed: number;
  pending: number;
  all: number;
}

const TaskBarChart = ({ completed, pending, all }: TaskBarChartProps) => {
  const data = [
    { name: 'Completed', count: completed },
    { name: 'Pending', count: pending },
    { name: 'All', count: all },
  ];

  return (
    <ResponsiveContainer width="100%" height={300} className={'my-4'}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FF7000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskBarChart;
