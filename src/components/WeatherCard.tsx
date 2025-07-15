import React from 'react';
import { Cloud, Droplets, Wind, Eye, Thermometer, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const convertTemp = (temp: number) => {
    return unit === 'fahrenheit' ? Math.round((temp * 9/5) + 32) : Math.round(temp);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{weather.name}</h2>
          <p className="text-white/80 text-lg">{weather.country}</p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-light text-white mb-2">
            {convertTemp(weather.temp)}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
          <p className="text-white/80 text-lg capitalize">{weather.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Feels like</span>
          </div>
          <p className="text-white text-xl font-semibold">
            {convertTemp(weather.feels_like)}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Humidity</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Wind</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.wind_speed} m/s</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Visibility</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.visibility} km</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Pressure</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.pressure} hPa</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">UV Index</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.uv_index}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/20">
        <div className="text-center">
          <p className="text-white/80 text-sm mb-1">Sunrise</p>
          <p className="text-white font-semibold">{formatTime(weather.sunrise)}</p>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-sm mb-1">Sunset</p>
          <p className="text-white font-semibold">{formatTime(weather.sunset)}</p>
        </div>
      </div>
    </div>
  );
};