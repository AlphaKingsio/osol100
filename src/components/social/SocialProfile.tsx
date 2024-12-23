import React from 'react';
import type { SocialProfileType } from '../../types';

export const SocialProfile: React.FC<{ profile: SocialProfileType }> = ({ profile }) => (
  <div className="flex-none w-[220px] p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow mx-1">
    <div className="flex items-center space-x-3">
      <img 
        src={profile.imageUrl} 
        alt={profile.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
          {profile.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {profile.description}
        </p>
      </div>
    </div>
    <a
      href={profile.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 w-full inline-flex justify-center items-center px-3 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-full hover:bg-primary-600 transition-colors"
    >
      Follow
    </a>
  </div>
);