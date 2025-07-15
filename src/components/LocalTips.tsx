import React from 'react';
import { Lightbulb, Calendar } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getLocalTips } from '../services/weatherApi';

interface LocalTipsProps {
  weather: WeatherData;
  language: 'en' | 'ta';
}

export const LocalTips: React.FC<LocalTipsProps> = ({ weather, language }) => {
  const tip = getLocalTips(weather, language);
  
  const getFestivalTip = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // Pongal (January 14-17)
    if (month === 1 && day >= 14 && day <= 17) {
      return {
        en: "🎉 Happy Pongal! Perfect weather for outdoor celebrations. Don't forget sunscreen!",
        ta: "🎉 பொங்கல் வாழ்த்துக்கள்! வெளிப்புற கொண்டாட்டங்களுக்கு ஏற்ற காலநிலை. சன்ஸ்கிரீன் மறக்காதீர்கள்!"
      };
    }
    
    // Tamil New Year (April 14)
    if (month === 4 && day === 14) {
      return {
        en: "🎊 Tamil New Year wishes! Stay hydrated in the summer heat.",
        ta: "🎊 தமிழ் புத்தாண்டு வாழ்த்துக்கள்! கோடை வெப்பத்தில் நீர்ச்சத்து பராமரிக்கவும்."
      };
    }
    
    // Diwali (varies, but typically October/November)
    if ((month === 10 && day > 20) || (month === 11 && day < 15)) {
      return {
        en: "🪔 Diwali celebrations ahead! Good air quality for fireworks, but use them responsibly.",
        ta: "🪔 தீபாவளி கொண்டாட்டங்கள்! பட்டாசுகளுக்கு நல்ல காற்று தரம், ஆனால் பொறுப்புடன் பயன்படுத்தவும்."
      };
    }
    
    return null;
  };

  const festivalTip = getFestivalTip();
  
  const title = language === 'en' ? 'Local Tips for Chennai' : 'சென்னைக்கான உள்ளூர் குறிப்புகள்';

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-300" />
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-white text-lg leading-relaxed">{tip}</p>
        </div>

        {festivalTip && (
          <div className="bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-2xl p-4 backdrop-blur-sm border border-orange-400/30">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-orange-300 mt-0.5 flex-shrink-0" />
              <p className="text-white text-lg leading-relaxed">
                {festivalTip[language]}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2">
              {language === 'en' ? '🌊 Marina Beach' : '🌊 மெரினா கடற்கரை'}
            </h4>
            <p className="text-white/80 text-sm">
              {language === 'en' 
                ? 'Best time: Early morning or evening. Avoid midday sun.'
                : 'சிறந்த நேரம்: அதிகாலை அல்லது மாலை. மதிய வெயிலைத் தவிர்க்கவும்.'
              }
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2">
              {language === 'en' ? '🚗 Traffic Tips' : '🚗 போக்குவரத்து குறிப்புகள்'}
            </h4>
            <p className="text-white/80 text-sm">
              {weather.rain_probability > 50
                ? (language === 'en' 
                    ? 'Heavy traffic expected due to rain. Plan extra time.'
                    : 'மழையால் அதிக போக்குவரத்து எதிர்பார்க்கப்படுகிறது. கூடுதல் நேரம் திட்டமிடுங்கள்.')
                : (language === 'en'
                    ? 'Normal traffic conditions expected.'
                    : 'சாதாரண போக்குவரத்து நிலைமைகள் எதிர்பார்க்கப்படுகின்றன.')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};