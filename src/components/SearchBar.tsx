import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { fetchLocationSuggestions, getCurrentLocationWeather } from '../services/weatherApi';
import { LocationSuggestion } from '../types/weather';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationWeather: (weather: any) => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationWeather, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (value: string) => {
    setQuery(value);
    
    if (value.length > 2) {
      try {
        const results = await fetchLocationSuggestions(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const weather = await getCurrentLocationWeather();
      onLocationWeather(weather);
    } catch (error) {
      console.error('Error getting current location:', error);
      alert('Unable to get current location. Please search manually.');
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <div className="relative mb-8" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200"
            />
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden z-10">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors duration-150 flex items-center gap-3 border-b border-white/20 last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-800">{suggestion.name}, {suggestion.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Search
        </button>
        
        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={locationLoading}
          className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {locationLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          Location
        </button>
      </form>
    </div>
  );
};