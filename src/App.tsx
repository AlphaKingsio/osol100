import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header';
import { SocialSlider } from './components/social/SocialSlider';
import { CoinList } from './components/CoinList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 30000,
      cacheTime: 3600000,
      structuralSharing: false,
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={isDarkMode ? 'dark' : ''}>
          <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <SocialSlider />
            <Routes>
              <Route path="/" element={<CoinList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;