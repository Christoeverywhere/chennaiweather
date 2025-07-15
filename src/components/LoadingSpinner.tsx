import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-12 h-12 animate-spin text-white mb-4" />
      <p className="text-white/80 text-lg">Loading weather data...</p>
    </div>
  );
};