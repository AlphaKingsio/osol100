import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SocialProfile } from './SocialProfile';
import { SOCIAL_PROFILES } from '../../constants/socialProfiles';

export const SocialSlider: React.FC = () => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 py-4 mb-6">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Follow Us
        </h2>
        
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollContainer}
            className="flex overflow-x-auto scrollbar-hide gap-3 py-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {SOCIAL_PROFILES.map((profile) => (
              <SocialProfile key={profile.id} profile={profile} />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};