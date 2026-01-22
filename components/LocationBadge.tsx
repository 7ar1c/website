// components/LocationBadge.tsx
import React from 'react';

type Props = {
  location: string;
  timestamp?: number | null; // New optional prop
};

// Helper to format "Time Ago"
const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function LocationBadge({ location, timestamp }: Props) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-sm text-neutral-600 mt-4">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-baseline">
        <span>Based in <span className="font-semibold text-neutral-900">{location}</span></span>
        
        {/* Only show timestamp if it exists */}
        {timestamp && (
          <span className="text-xs text-neutral-400 hidden sm:inline-block">
            • Updated {getTimeAgo(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}