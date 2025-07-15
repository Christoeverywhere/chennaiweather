import React from 'react';

interface UnitToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: (unit: 'celsius' | 'fahrenheit') => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="text-white/80 text-sm">Temperature unit:</span>
      <div className="bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30">
        <div className="flex">
          <button
            onClick={() => onToggle('celsius')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              unit === 'celsius'
                ? 'bg-white text-gray-800 shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => onToggle('fahrenheit')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              unit === 'fahrenheit'
                ? 'bg-white text-gray-800 shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};