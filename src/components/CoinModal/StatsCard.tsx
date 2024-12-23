import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">
      {value}
    </p>
  </div>
);