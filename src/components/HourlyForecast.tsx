import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';

interface HourlyForecastProps {
  forecast: HourlyForecastType[];
  unit: 'celsius' | 'fahrenheit';
  language: 'en' | 'ta';
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, unit, language }) => {
  const convertTemp = (temp: number) => {
    return unit === 'fahrenheit' ? Math.round((temp * 9/5) + 32) : Math.round(temp);
  };

  const formatTime = (timeStr: string) => {
    const time = new Date(timeStr);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const title = language === 'en' ? '24-Hour Forecast' : '24 மணி நேர முன்னறிவிப்பு';

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
          {forecast.slice(0, 24).map((hour, index) => (
            <div 
              key={index}
              className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 min-w-32"
            >
              <div className="text-center">
                <p className="text-white/80 text-sm mb-2">
                  {formatTime(hour.time)}
                </p>
                
                <div className="text-2xl mb-2">
                  {hour.icon === '01d' && '☀️'}
                  {hour.icon === '02d' && '⛅'}
                  {hour.icon === '03d' && '☁️'}
                  {hour.icon === '04d' && '☁️'}
                  {hour.icon === '09d' && '🌧️'}
                  {hour.icon === '10d' && '🌦️'}
                  {hour.icon === '11d' && '⛈️'}
                </div>
                
                <p className="text-white font-semibold text-lg mb-2">
                  {convertTemp(hour.temp)}°
                </p>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-300" />
                    <span className="text-white/80 text-xs">{hour.rain_probability}%</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3 text-green-300" />
                    <span className="text-white/80 text-xs">
                      {Math.round(hour.wind_speed)} {hour.wind_direction}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};