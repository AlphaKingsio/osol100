import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { CoinDetail } from '../../types';
import { PriceChart } from './PriceChart';
import { StatsCard } from './StatsCard';
import { SocialLinks } from './SocialLinks';
import { formatUSD, formatNumber } from '../../utils/formatters';

interface CoinModalProps {
  coin: CoinDetail;
  onClose: () => void;
  isOpen: boolean;
}

export const CoinModal: React.FC<CoinModalProps> = ({ coin, onClose, isOpen }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6 overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={coin.image} 
              alt={coin.name} 
              className="h-12 w-12 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/48';
              }}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{coin.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <div className="h-64 mb-6 bg-white dark:bg-gray-900 rounded-lg p-4">
            <PriceChart sparklineData={coin.sparkline_in_7d?.price} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatsCard label="Price" value={formatUSD(coin.current_price)} />
            <StatsCard label="Market Cap" value={formatUSD(coin.market_cap)} />
            <StatsCard label="FDV" value={formatUSD(coin.fully_diluted_valuation)} />
            <StatsCard label="Supply" value={formatNumber(coin.total_supply)} />
          </div>

          {coin.description?.en && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h3>
              <div 
                className="text-gray-600 dark:text-gray-300 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: coin.description.en }}
              />
            </div>
          )}

          <SocialLinks links={coin.links} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};