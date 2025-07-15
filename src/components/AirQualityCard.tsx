import React from 'react';
import { Wind, AlertTriangle, Leaf } from 'lucide-react';
import { AirQuality } from '../types/weather';

interface AirQualityCardProps {
  airQuality: AirQuality;
  language: 'en' | 'ta';
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality, language }) => {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    if (aqi <= 200) return 'text-red-400';
    if (aqi <= 300) return 'text-purple-400';
    return 'text-red-600';
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { en: 'Good', ta: 'நல்லது' };
    if (aqi <= 100) return { en: 'Moderate', ta: 'மிதமான' };
    if (aqi <= 150) return { en: 'Unhealthy for Sensitive', ta: 'உணர்திறன் உள்ளவர்களுக்கு தீங்கு' };
    if (aqi <= 200) return { en: 'Unhealthy', ta: 'தீங்கு' };
    if (aqi <= 300) return { en: 'Very Unhealthy', ta: 'மிகவும் தீங்கு' };
    return { en: 'Hazardous', ta: 'ஆபத்தான' };
  };

  const aqiLevel = getAQILevel(airQuality.aqi);
  const aqiColor = getAQIColor(airQuality.aqi);

  const labels = {
    en: {
      title: 'Air Quality Index',
      healthAdvice: 'Health Advice',
      pollutants: 'Pollutants (μg/m³)'
    },
    ta: {
      title: 'காற்று தர குறியீடு',
      healthAdvice: 'சுகாதார ஆலோசனை',
      pollutants: 'மாசுபடுத்திகள் (μg/m³)'
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Wind className="w-6 h-6 text-white" />
        <h3 className="text-2xl font-bold text-white">{labels[language].title}</h3>
      </div>

      <div className="text-center mb-6">
        <div className={`text-5xl font-bold ${aqiColor} mb-2`}>
          {airQuality.aqi}
        </div>
        <p className={`text-xl font-semibold ${aqiColor}`}>
          {aqiLevel[language]}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
          <p className="text-white/80 text-xs mb-1">PM2.5</p>
          <p className="text-white font-semibold">{airQuality.pm25}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
          <p className="text-white/80 text-xs mb-1">PM10</p>
          <p className="text-white font-semibold">{airQuality.pm10}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
          <p className="text-white/80 text-xs mb-1">NO₂</p>
          <p className="text-white font-semibold">{airQuality.no2}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
          <p className="text-white/80 text-xs mb-1">O₃</p>
          <p className="text-white font-semibold">{airQuality.o3}</p>
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          {airQuality.aqi > 100 ? (
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
          ) : (
            <Leaf className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">
              {labels[language].healthAdvice}
            </p>
            <p className="text-white text-sm">
              {language === 'en' ? airQuality.health_advice : 
                airQuality.aqi > 150 ? 'வெளிப்புற நடவடிக்கைகளைத் தவிர்க்கவும். உட்புறத்தில் காற்று சுத்திகரிப்பு கருவி பயன்படுத்தவும்.' :
                airQuality.aqi > 100 ? 'உணர்திறன் உள்ளவர்கள் வெளிப்புற நடவடிக்கைகளைக் குறைக்கவும்.' :
                'காற்று தரம் நல்லது. வெளிப்புற நடவடிக்கைகளுக்கு ஏற்றது.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};