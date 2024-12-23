import React from 'react';

interface SocialLinksProps {
  links: {
    homepage?: string[];
    twitter_screen_name?: string;
    telegram_channel_identifier?: string;
  };
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  if (!links) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Links</h3>
      <div className="flex flex-wrap gap-4">
        {links.homepage?.[0] && (
          <a
            href={links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700"
          >
            Website
          </a>
        )}
        {links.twitter_screen_name && (
          <a
            href={`https://twitter.com/${links.twitter_screen_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700"
          >
            Twitter
          </a>
        )}
        {links.telegram_channel_identifier && (
          <a
            href={`https://t.me/${links.telegram_channel_identifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700"
          >
            Telegram
          </a>
        )}
      </div>
    </div>
  );
};