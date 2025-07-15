import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: 'celsius' | 'fahrenheit';
  language: 'en' | 'ta';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit, language }) => {
  const convertTemp = (temp: number) => {
    return unit === 'fahrenheit' ? Math.round((temp * 9/5) + 32) : Math.round(temp);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-400', ta: 'குறைவு' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400', ta: 'மிதமான' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-400', ta: 'அதிக' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-400', ta: 'மிக அதிக' };
    return { level: 'Extreme', color: 'text-purple-400', ta: 'தீவிர' };
  };

  const uvLevel = getUVLevel(weather.uv_index);

  const labels = {
    en: {
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      pressure: 'Pressure',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      rainChance: 'Rain Chance'
    },
    ta: {
      feelsLike: 'உணர்வு',
      humidity: 'ஈரப்பதம்',
      wind: 'காற்று',
      visibility: 'தெரிவுநிலை',
      pressure: 'அழுத்தம்',
      uvIndex: 'UV குறியீடு',
      sunrise: 'சூரிய உதயம்',
      sunset: 'சூரிய அஸ்தமனம்',
      rainChance: 'மழை வாய்ப்பு'
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{weather.location}</h2>
          <p className="text-white/80 text-lg capitalize">{weather.description}</p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-light text-white mb-2">
            {convertTemp(weather.temp)}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
          <p className="text-white/80 text-lg">
            {labels[language].feelsLike} {convertTemp(weather.feels_like)}°
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-300" />
            <span className="text-white/80 text-sm">{labels[language].humidity}</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-green-300" />
            <span className="text-white/80 text-sm">{labels[language].wind}</span>
          </div>
          <p className="text-white text-xl font-semibold">
            {weather.wind_speed} km/h {weather.wind_direction}
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-purple-300" />
            <span className="text-white/80 text-sm">{labels[language].visibility}</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.visibility} km</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5 text-orange-300" />
            <span className="text-white/80 text-sm">{labels[language].pressure}</span>
          </div>
          <p className="text-white text-xl font-semibold">{weather.pressure} hPa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-300" />
            <span className="text-white/80 text-sm">{labels[language].uvIndex}</span>
          </div>
          <p className={`text-xl font-semibold ${uvLevel.color}`}>
            {weather.uv_index} - {language === 'en' ? uvLevel.level : uvLevel.ta}
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sunrise className="w-5 h-5 text-yellow-300" />
            <span className="text-white/80 text-sm">{labels[language].sunrise}</span>
          </div>
          <p className="text-white text-xl font-semibold">{formatTime(weather.sunrise)}</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sunset className="w-5 h-5 text-orange-300" />
            <span className="text-white/80 text-sm">{labels[language].sunset}</span>
          </div>
          <p className="text-white text-xl font-semibold">{formatTime(weather.sunset)}</p>
        </div>
      </div>

      <div className="mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-5 h-5 text-blue-300" />
          <span className="text-white/80 text-sm">{labels[language].rainChance}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/20 rounded-full h-2">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${weather.rain_probability}%` }}
            />
          </div>
          <span className="text-white text-lg font-semibold">{weather.rain_probability}%</span>
        </div>
      </div>
    </div>
  );
};