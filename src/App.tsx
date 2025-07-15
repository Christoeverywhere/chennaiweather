import React, { useState, useEffect } from 'react';
import { Cloud, RefreshCw } from 'lucide-react';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { WeeklyForecast } from './components/WeeklyForecast';
import { AirQualityCard } from './components/AirQualityCard';
import { WeatherAlerts } from './components/WeatherAlerts';
import { MonsoonTracker } from './components/MonsoonTracker';
import { LocalTips } from './components/LocalTips';
import { Controls } from './components/Controls';
import { 
  fetchChennaiWeather, 
  fetchHourlyForecast, 
  fetchDailyForecast,
  fetchAirQuality,
  fetchWeatherAlerts,
  fetchMonsoonData
} from './services/weatherApi';
import { WeatherData, HourlyForecast as HourlyForecastType, DailyForecast, AirQuality, WeatherAlert, MonsoonData } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastType[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [monsoonData, setMonsoonData] = useState<MonsoonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [theme, setTheme] = useState<'marina' | 'sun' | 'rain'>('marina');
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadAllData();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(loadAllData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        weatherData,
        hourlyData,
        dailyData,
        aqiData,
        alertsData,
        monsoonInfo
      ] = await Promise.all([
        fetchChennaiWeather(),
        fetchHourlyForecast(),
        fetchDailyForecast(),
        fetchAirQuality(),
        fetchWeatherAlerts(),
        fetchMonsoonData()
      ]);

      setWeather(weatherData);
      setHourlyForecast(hourlyData);
      setDailyForecast(dailyData);
      setAirQuality(aqiData);
      setAlerts(alertsData);
      setMonsoonData(monsoonInfo);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundGradient = () => {
    if (darkMode) {
      return 'from-gray-900 via-gray-800 to-gray-900';
    }

    switch (theme) {
      case 'marina':
        return 'from-blue-400 via-cyan-500 to-teal-600';
      case 'sun':
        return 'from-yellow-400 via-orange-500 to-red-500';
      case 'rain':
        return 'from-gray-600 via-gray-700 to-gray-800';
      default:
        if (!weather) return 'from-blue-400 via-blue-500 to-blue-600';
        
        const temp = weather.temp;
        const description = weather.description.toLowerCase();
        
        if (description.includes('rain') || description.includes('storm')) {
          return 'from-gray-600 via-gray-700 to-gray-800';
        } else if (description.includes('cloud')) {
          return 'from-gray-400 via-gray-500 to-gray-600';
        } else if (temp > 35) {
          return 'from-orange-400 via-orange-500 to-red-500';
        } else if (temp < 25) {
          return 'from-blue-500 via-blue-600 to-blue-700';
        } else {
          return 'from-blue-400 via-cyan-500 to-teal-600';
        }
    }
  };

  const appTitle = {
    en: 'Chennai Weather',
    ta: 'சென்னை வானிலை'
  };

  const subtitle = {
    en: 'Your complete weather companion for Chennai',
    ta: 'சென்னைக்கான உங்கள் முழுமையான வானிலை துணை'
  };

  const refreshText = {
    en: 'Refresh',
    ta: 'புதுப்பிக்கவும்'
  };

  const lastUpdatedText = {
    en: 'Last updated',
    ta: 'கடைசியாக புதுப்பிக்கப்பட்டது'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="w-10 h-10 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {appTitle[language]}
              </h1>
            </div>
            <p className="text-white/80 text-lg mb-4">
              {subtitle[language]}
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={loadAllData}
                disabled={loading}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {refreshText[language]}
              </button>
              
              {lastUpdated && (
                <p className="text-white/60 text-sm">
                  {lastUpdatedText[language]}: {lastUpdated.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mb-8">
            <Controls
              unit={unit}
              onUnitChange={setUnit}
              language={language}
              onLanguageChange={setLanguage}
              theme={theme}
              onThemeChange={setTheme}
              darkMode={darkMode}
              onDarkModeToggle={() => setDarkMode(!darkMode)}
            />
          </div>

          {/* Weather Alerts */}
          {alerts.length > 0 && (
            <div className="mb-8">
              <WeatherAlerts alerts={alerts} language={language} />
            </div>
          )}

          {/* Main Weather Content */}
          {weather && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <div className="xl:col-span-2">
                <CurrentWeather weather={weather} unit={unit} language={language} />
              </div>
              <div className="space-y-6">
                {airQuality && (
                  <AirQualityCard airQuality={airQuality} language={language} />
                )}
                <LocalTips weather={weather} language={language} />
              </div>
            </div>
          )}

          {/* Hourly Forecast */}
          {hourlyForecast.length > 0 && (
            <div className="mb-8">
              <HourlyForecast forecast={hourlyForecast} unit={unit} language={language} />
            </div>
          )}

          {/* Weekly Forecast and Monsoon Tracker */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {dailyForecast.length > 0 && (
              <WeeklyForecast forecast={dailyForecast} unit={unit} language={language} />
            )}
            {monsoonData && (
              <MonsoonTracker monsoonData={monsoonData} language={language} />
            )}
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              {language === 'en' 
                ? 'Built for Chennai • Data from IMD & Local Sources'
                : 'சென்னைக்காக உருவாக்கப்பட்டது • IMD மற்றும் உள்ளூர் ஆதாரங்களிலிருந்து தரவு'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;