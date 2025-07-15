import React from 'react';
import { ForecastData } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastData;
  unit: 'celsius' | 'fahrenheit';
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const convertTemp = (temp: number) => {
    return unit === 'fahrenheit' ? Math.round((temp * 9/5) + 32) : Math.round(temp);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.forecast.map((day, index) => (
          <div 
            key={index} 
            className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-white/80 font-medium min-w-20">
                  {formatDate(day.date)}
                </div>
                <div className="capitalize text-white/90">
                  {day.description}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-white/80 text-sm">
                  {day.humidity}% • {day.wind_speed} m/s
                </div>
                <div className="text-white font-semibold text-right">
                  <span className="text-lg">{convertTemp(day.temp_max)}°</span>
                  <span className="text-white/70 text-sm ml-1">
                    {convertTemp(day.temp_min)}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};