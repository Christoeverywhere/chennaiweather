import React from 'react';
import { AlertTriangle, Cloud, Zap, Thermometer, Droplets } from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  language: 'en' | 'ta';
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts, language }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'rain': return <Droplets className="w-5 h-5" />;
      case 'cyclone': return <Cloud className="w-5 h-5" />;
      case 'heat': return <Thermometer className="w-5 h-5" />;
      case 'thunderstorm': return <Zap className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-yellow-400 bg-yellow-400/20 text-yellow-300';
      case 'moderate': return 'border-orange-400 bg-orange-400/20 text-orange-300';
      case 'high': return 'border-red-400 bg-red-400/20 text-red-300';
      case 'extreme': return 'border-purple-400 bg-purple-400/20 text-purple-300';
      default: return 'border-gray-400 bg-gray-400/20 text-gray-300';
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const title = language === 'en' ? 'Weather Alerts' : 'வானிலை எச்சரிக்கைகள்';
  const noAlerts = language === 'en' ? 'No active weather alerts' : 'செயலில் உள்ள வானிலை எச்சரிக்கைகள் இல்லை';

  if (alerts.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <div className="text-center py-8">
          <div className="text-green-400 mb-2">✅</div>
          <p className="text-white/80">{noAlerts}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`rounded-2xl p-4 border-2 backdrop-blur-sm ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">
                    {language === 'en' ? alert.title : 
                      alert.type === 'rain' ? 'கனமழை எதிர்பார்ப்பு' :
                      alert.type === 'heat' ? 'வெப்ப அலை எச்சரிக்கை' :
                      alert.type === 'cyclone' ? 'புயல் எச்சரிக்கை' :
                      alert.title
                    }
                  </h4>
                  <span className="text-xs opacity-80 uppercase font-medium">
                    {language === 'en' ? alert.severity : 
                      alert.severity === 'low' ? 'குறைவு' :
                      alert.severity === 'moderate' ? 'மிதமான' :
                      alert.severity === 'high' ? 'அதிக' :
                      'தீவிர'
                    }
                  </span>
                </div>
                
                <p className="text-sm mb-3 opacity-90">
                  {language === 'en' ? alert.description :
                    alert.type === 'rain' ? 'இன்று மதியம் 3 மணி முதல் இரவு 8 மணி வரை சென்னை மற்றும் சுற்றியுள்ள பகுதிகளில் கனமழை எதிர்பார்க்கப்படுகிறது.' :
                    alert.type === 'heat' ? 'வெப்பநிலை 42°C ஐ எட்டலாம். நீர்ச்சத்து பராமரித்து நேரடி சூரிய ஒளியைத் தவிர்க்கவும்.' :
                    alert.description
                  }
                </p>
                
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>
                    {language === 'en' ? 'Source:' : 'மூலம்:'} {alert.source}
                  </span>
                  <span>
                    {language === 'en' ? 'Valid until:' : 'செல்லுபடியாகும் வரை:'} {formatTime(alert.valid_until)}
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