import React from 'react';
import { CloudRain, Droplets, AlertCircle, TrendingUp } from 'lucide-react';
import { MonsoonData } from '../types/weather';

interface MonsoonTrackerProps {
  monsoonData: MonsoonData;
  language: 'en' | 'ta';
}

export const MonsoonTracker: React.FC<MonsoonTrackerProps> = ({ monsoonData, language }) => {
  const getFloodRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getFloodRiskText = (risk: string) => {
    const texts = {
      low: { en: 'Low', ta: 'குறைவு' },
      moderate: { en: 'Moderate', ta: 'மிதமான' },
      high: { en: 'High', ta: 'அதிக' }
    };
    return texts[risk as keyof typeof texts]?.[language] || risk;
  };

  const labels = {
    en: {
      title: 'Chennai Monsoon Tracker',
      onsetDate: 'Monsoon Onset',
      withdrawalDate: 'Expected Withdrawal',
      rainfall: 'Rainfall Progress',
      current: 'Current',
      normal: 'Normal',
      deviation: 'Deviation',
      floodRisk: 'Flood Risk',
      reservoirs: 'Chennai Reservoirs',
      above: 'above normal',
      below: 'below normal'
    },
    ta: {
      title: 'சென்னை பருவமழை கண்காணிப்பு',
      onsetDate: 'பருவமழை தொடக்கம்',
      withdrawalDate: 'எதிர்பார்க்கப்படும் முடிவு',
      rainfall: 'மழைப்பொழிவு முன்னேற்றம்',
      current: 'தற்போதைய',
      normal: 'சாதாரண',
      deviation: 'விலகல்',
      floodRisk: 'வெள்ள அபாயம்',
      reservoirs: 'சென்னை நீர்த்தேக்கங்கள்',
      above: 'சாதாரணத்திற்கு மேல்',
      below: 'சாதாரணத்திற்கு கீழ்'
    }
  };

  const reservoirNames = {
    en: {
      poondi: 'Poondi',
      cholavaram: 'Cholavaram',
      redhills: 'Red Hills',
      chembarambakkam: 'Chembarambakkam'
    },
    ta: {
      poondi: 'பூண்டி',
      cholavaram: 'சோழவரம்',
      redhills: 'ரெட் ஹில்ஸ்',
      chembarambakkam: 'செம்பரம்பாக்கம்'
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <CloudRain className="w-6 h-6 text-blue-300" />
        <h3 className="text-2xl font-bold text-white">{labels[language].title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-white/80 text-sm mb-2">{labels[language].onsetDate}</p>
          <p className="text-white text-xl font-semibold">
            {new Date(monsoonData.onset_date).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-white/80 text-sm mb-2">{labels[language].withdrawalDate}</p>
          <p className="text-white text-xl font-semibold">
            {new Date(monsoonData.withdrawal_date).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-5 h-5 text-blue-300" />
          <span className="text-white font-medium">{labels[language].rainfall}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm">{labels[language].current}</span>
            <span className="text-white font-semibold">{monsoonData.current_rainfall} mm</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm">{labels[language].normal}</span>
            <span className="text-white font-semibold">{monsoonData.normal_rainfall} mm</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm">{labels[language].deviation}</span>
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${monsoonData.deviation_percentage > 0 ? 'text-green-400' : 'text-red-400'}`} />
              <span className={`font-semibold ${monsoonData.deviation_percentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {monsoonData.deviation_percentage > 0 ? '+' : ''}{monsoonData.deviation_percentage}% 
                {monsoonData.deviation_percentage > 0 ? labels[language].above : labels[language].below}
              </span>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((monsoonData.current_rainfall / monsoonData.normal_rainfall) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className={`w-5 h-5 ${getFloodRiskColor(monsoonData.flood_risk)}`} />
            <span className="text-white font-medium">{labels[language].floodRisk}</span>
          </div>
          <p className={`text-xl font-semibold ${getFloodRiskColor(monsoonData.flood_risk)}`}>
            {getFloodRiskText(monsoonData.flood_risk)}
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-white font-medium mb-3">{labels[language].reservoirs}</p>
          <div className="space-y-2">
            {Object.entries(monsoonData.reservoir_levels).map(([key, level]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-white/80 text-sm">
                  {reservoirNames[language][key as keyof typeof reservoirNames.en]}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-white/20 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        level > 80 ? 'bg-green-400' : level > 50 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${level}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium">{level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};