import React from 'react';
import { Droplets, Wind, Sun } from 'lucide-react';
import { DailyForecast } from '../types/weather';

interface WeeklyForecastProps {
  forecast: DailyForecast[];
  unit: 'celsius' | 'fahrenheit';
  language: 'en' | 'ta';
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast, unit, language }) => {
  const convertTemp = (temp: number) => {
    return unit === 'fahrenheit' ? Math.round((temp * 9/5) + 32) : Math.round(temp);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return language === 'en' ? 'Today' : 'இன்று';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return language === 'en' ? 'Tomorrow' : 'நாளை';
    }
    
    return date.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const title = language === 'en' ? '7-Day Forecast' : '7 நாள் முன்னறிவிப்பு';

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">
                  {day.icon === '01d' && '☀️'}
                  {day.icon === '02d' && '⛅'}
                  {day.icon === '03d' && '☁️'}
                  {day.icon === '04d' && '☁️'}
                  {day.icon === '09d' && '🌧️'}
                  {day.icon === '10d' && '🌦️'}
                  {day.icon === '11d' && '⛈️'}
                </div>
                
                <div className="flex-1">
                  <p className="text-white font-medium text-lg">
                    {formatDate(day.date)}
                  </p>
                  <p className="text-white/80 text-sm capitalize">
                    {day.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-300" />
                    <span>{day.rain_probability}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-4 h-4 text-green-300" />
                    <span>{Math.round(day.wind_speed)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sun className="w-4 h-4 text-yellow-300" />
                    <span>{Math.round(day.uv_index)}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold text-lg">
                    {convertTemp(day.temp_max)}°
                  </div>
                  <div className="text-white/70 text-sm">
                    {convertTemp(day.temp_min)}°
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};