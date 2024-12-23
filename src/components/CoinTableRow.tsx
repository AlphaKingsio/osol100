import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Coin, CoinDetail } from '../types';
import { CoinModal } from './CoinModal/CoinModal';
import { useQuery } from 'react-query';
import { getCoinDetails } from '../services/api';
import { formatUSD, formatPercentage } from '../utils/formatters';

interface CoinTableRowProps {
  coin: Coin;
}

export const CoinTableRow: React.FC<CoinTableRowProps> = ({ coin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coinDetails, isLoading } = useQuery<CoinDetail | null>(
    ['coin', coin.id],
    () => getCoinDetails(coin.id),
    {
      enabled: isModalOpen,
      staleTime: 60000,
      cacheTime: 3600000,
      retry: 2,
    }
  );

  return (
    <>
      <tr 
        className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" 
        onClick={() => setIsModalOpen(true)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {coin.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {coin.symbol.toUpperCase()}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 dark:text-white">
            {formatUSD(coin.current_price)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className={`flex items-center text-sm ${
            coin.price_change_percentage_24h > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {coin.price_change_percentage_24h > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {formatPercentage(coin.price_change_percentage_24h)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className={`flex items-center text-sm ${
            coin.price_change_percentage_7d_in_currency > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {coin.price_change_percentage_7d_in_currency > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {formatPercentage(coin.price_change_percentage_7d_in_currency)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {formatUSD(coin.market_cap)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {formatUSD(coin.fully_diluted_valuation)}
        </td>
      </tr>
      {isModalOpen && !isLoading && coinDetails && (
        <CoinModal 
          coin={coinDetails} 
          onClose={() => setIsModalOpen(false)} 
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};