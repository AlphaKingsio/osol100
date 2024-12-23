import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  sparklineData?: number[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ sparklineData }) => {
  if (!sparklineData?.length) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Loading price data...
      </div>
    );
  }

  const chartData = sparklineData.map((price, index) => ({
    time: index,
    price
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis 
          dataKey="time" 
          type="number"
          domain={['dataMin', 'dataMax']}
          hide 
        />
        <YAxis 
          domain={['auto', 'auto']}
          hide
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          labelFormatter={(label: number) => `${Math.round((label / sparklineData.length) * 168)}h ago`}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};