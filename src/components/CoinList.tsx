import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getCoins } from '../services/api';
import { CoinTableHeader } from './CoinTableHeader';
import { CoinTableRow } from './CoinTableRow';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { Pagination } from './Pagination';

const ITEMS_PER_PAGE = 25;

export const CoinList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: coins, isLoading, error } = useQuery('coins', getCoins, {
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });

  const filteredCoins = useMemo(() => {
    if (!coins) return [];

    let filtered = coins.filter(coin => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (filterBy) {
      case 'marketCap':
        return filtered.sort((a, b) => b.market_cap - a.market_cap);
      case 'price':
        return filtered.sort((a, b) => b.current_price - a.current_price);
      case 'priceAsc':
        return filtered.sort((a, b) => a.current_price - b.current_price);
      case 'gainers':
        return filtered.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      case 'losers':
        return filtered.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
      default:
        return filtered;
    }
  }, [coins, searchQuery, filterBy]);

  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCoins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCoins, currentPage]);

  const totalPages = Math.ceil(filteredCoins.length / ITEMS_PER_PAGE);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading coins" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterDropdown value={filterBy} onChange={setFilterBy} />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <CoinTableHeader />
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedCoins.map((coin) => (
              <CoinTableRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
        
        {filteredCoins.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No coins found matching your search criteria
          </div>
        )}
      </div>

      {filteredCoins.length > ITEMS_PER_PAGE && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};