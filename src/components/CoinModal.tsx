import React from 'react';
import { X } from 'lucide-react';
import { CoinDetail } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CoinModalProps {
  coin: CoinDetail;
  onClose: () => void;
}

export const CoinModal: React.FC<CoinModalProps> = ({ coin, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <img src={coin.image} alt={coin.name} className="h-12 w-12 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{coin.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coin.sparkline_in_7d?.price?.map((price, index) => ({ time: index, price }))}>
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#0ea5e9" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${coin.current_price.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${coin.market_cap.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">FDV</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${coin.fully_diluted_valuation?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Supply</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {coin.total_supply?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>

          {coin.description?.en && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h3>
              <p className="text-gray-600 dark:text-gray-300" 
                 dangerouslySetInnerHTML={{ __html: coin.description.en }} />
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Links</h3>
            <div className="flex flex-wrap gap-4">
              {coin.links?.homepage[0] && (
                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:text-primary-700">Website</a>
              )}
              {coin.links?.twitter_screen_name && (
                <a href={`https://twitter.com/${coin.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:text-primary-700">Twitter</a>
              )}
              {coin.links?.telegram_channel_identifier && (
                <a href={`https://t.me/${coin.links.telegram_channel_identifier}`} target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:text-primary-700">Telegram</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};