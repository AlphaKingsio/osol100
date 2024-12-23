export const formatUSD = (value?: number): string => {
  if (value === undefined || value === null) return 'N/A';
  return `$${value.toLocaleString()}`;
};

export const formatNumber = (value?: number): string => {
  if (value === undefined || value === null) return 'N/A';
  return value.toLocaleString();
};

export const formatPercentage = (value?: number): string => {
  if (value === undefined || value === null) return 'N/A';
  return `${Math.abs(value).toFixed(2)}%`;
};