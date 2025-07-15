import React from 'react';
import { Sun, Moon, Globe, Thermometer } from 'lucide-react';

interface ControlsProps {
  unit: 'celsius' | 'fahrenheit';
  onUnitChange: (unit: 'celsius' | 'fahrenheit') => void;
  language: 'en' | 'ta';
  onLanguageChange: (language: 'en' | 'ta') => void;
  theme: 'marina' | 'sun' | 'rain';
  onThemeChange: (theme: 'marina' | 'sun' | 'rain') => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  unit,
  onUnitChange,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  darkMode,
  onDarkModeToggle,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature Unit */}
        <div>
          <label className="block text-white/80 text-sm mb-2">
            <Thermometer className="w-4 h-4 inline mr-1" />
            {language === 'en' ? 'Temperature' : 'வெப்பநிலை'}
          </label>
          <div className="bg-white/20 rounded-full p-1">
            <div className="flex">
              <button
                onClick={() => onUnitChange('celsius')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  unit === 'celsius'
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUnitChange('fahrenheit')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
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

        {/* Language */}
        <div>
          <label className="block text-white/80 text-sm mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            {language === 'en' ? 'Language' : 'மொழி'}
          </label>
          <div className="bg-white/20 rounded-full p-1">
            <div className="flex">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  language === 'ta'
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-white/80 text-sm mb-2">
            {language === 'en' ? 'Theme' : 'தீம்'}
          </label>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as 'marina' | 'sun' | 'rain')}
            className="w-full bg-white/20 border border-white/30 rounded-full px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="marina" className="bg-gray-800">
              {language === 'en' ? '🌊 Marina Mode' : '🌊 மெரினா பயன்முறை'}
            </option>
            <option value="sun" className="bg-gray-800">
              {language === 'en' ? '☀️ Sun Mode' : '☀️ சூரிய பயன்முறை'}
            </option>
            <option value="rain" className="bg-gray-800">
              {language === 'en' ? '🌧️ Rain Mode' : '🌧️ மழை பயன்முறை'}
            </option>
          </select>
        </div>

        {/* Dark Mode */}
        <div>
          <label className="block text-white/80 text-sm mb-2">
            {language === 'en' ? 'Display' : 'காட்சி'}
          </label>
          <button
            onClick={onDarkModeToggle}
            className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-white text-sm hover:bg-white/30 transition-all duration-200 w-full justify-center"
          >
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {darkMode 
              ? (language === 'en' ? 'Dark' : 'இருள்')
              : (language === 'en' ? 'Light' : 'ஒளி')
            }
          </button>
        </div>
      </div>
    </div>
  );
};