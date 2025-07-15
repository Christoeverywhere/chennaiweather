import { WeatherData, HourlyForecast, DailyForecast, AirQuality, WeatherAlert, MonsoonData } from '../types/weather';

// Mock data specifically for Chennai
const mockChennaiWeather: WeatherData = {
  location: 'Chennai, Tamil Nadu',
  temp: 32,
  feels_like: 38,
  description: 'Hot and humid',
  icon: '01d',
  humidity: 78,
  wind_speed: 12,
  wind_direction: 'SW',
  pressure: 1008,
  visibility: 8,
  uv_index: 9,
  sunrise: 1634025600,
  sunset: 1634068800,
  rain_probability: 15,
};

const mockHourlyForecast: HourlyForecast[] = Array.from({ length: 24 }, (_, i) => ({
  time: new Date(Date.now() + i * 3600000).toISOString(),
  temp: 28 + Math.random() * 8,
  rain_probability: Math.floor(Math.random() * 60),
  wind_speed: 8 + Math.random() * 10,
  wind_direction: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
  icon: ['01d', '02d', '03d', '04d', '09d', '10d'][Math.floor(Math.random() * 6)],
  description: ['Clear', 'Partly cloudy', 'Cloudy', 'Light rain', 'Heavy rain'][Math.floor(Math.random() * 5)],
}));

const mockDailyForecast: DailyForecast[] = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
  temp_max: 30 + Math.random() * 8,
  temp_min: 24 + Math.random() * 4,
  rain_probability: Math.floor(Math.random() * 80),
  description: ['Sunny', 'Partly cloudy', 'Thunderstorms', 'Heavy rain', 'Light rain'][Math.floor(Math.random() * 5)],
  icon: ['01d', '02d', '11d', '09d', '10d'][Math.floor(Math.random() * 5)],
  humidity: 65 + Math.random() * 20,
  wind_speed: 8 + Math.random() * 12,
  uv_index: 6 + Math.random() * 5,
}));

const mockAirQuality: AirQuality = {
  aqi: 156,
  pm25: 89,
  pm10: 134,
  no2: 45,
  so2: 12,
  co: 1.2,
  o3: 78,
  quality_level: 'Unhealthy',
  health_advice: 'Avoid outdoor activities. Use air purifier indoors.',
};

const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'rain',
    severity: 'moderate',
    title: 'Heavy Rain Expected',
    description: 'Heavy rainfall expected in Chennai and surrounding areas from 3 PM to 8 PM today.',
    issued_time: Date.now() - 3600000,
    valid_until: Date.now() + 18000000,
    source: 'IMD Chennai',
  },
  {
    id: '2',
    type: 'heat',
    severity: 'high',
    title: 'Heat Wave Warning',
    description: 'Temperature may reach 42°C. Stay hydrated and avoid direct sunlight.',
    issued_time: Date.now() - 7200000,
    valid_until: Date.now() + 86400000,
    source: 'Tamil Nadu Disaster Management',
  },
];

const mockMonsoonData: MonsoonData = {
  onset_date: '2024-06-15',
  withdrawal_date: '2024-10-20',
  current_rainfall: 1247,
  normal_rainfall: 1200,
  deviation_percentage: 3.9,
  flood_risk: 'moderate',
  reservoir_levels: {
    poondi: 78,
    cholavaram: 45,
    redhills: 67,
    chembarambakkam: 89,
  },
};

export const fetchChennaiWeather = async (): Promise<WeatherData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    ...mockChennaiWeather,
    temp: 28 + Math.random() * 10,
    humidity: 65 + Math.random() * 25,
    rain_probability: Math.floor(Math.random() * 60),
  };
};

export const fetchHourlyForecast = async (): Promise<HourlyForecast[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockHourlyForecast;
};

export const fetchDailyForecast = async (): Promise<DailyForecast[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockDailyForecast;
};

export const fetchAirQuality = async (): Promise<AirQuality> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    ...mockAirQuality,
    aqi: 120 + Math.random() * 80,
    pm25: 60 + Math.random() * 40,
    pm10: 80 + Math.random() * 60,
  };
};

export const fetchWeatherAlerts = async (): Promise<WeatherAlert[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockWeatherAlerts;
};

export const fetchMonsoonData = async (): Promise<MonsoonData> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return mockMonsoonData;
};

export const getLocalTips = (weather: WeatherData, language: 'en' | 'ta') => {
  const tips = {
    hot: {
      en: "It's very hot today! Carry water and avoid direct sunlight between 11 AM - 4 PM.",
      ta: "இன்று மிகவும் வெப்பமாக உள்ளது! தண்ணீர் எடுத்துச் செல்லுங்கள் மற்றும் காலை 11 - மதியம் 4 மணி வரை நேரடி சூரிய ஒளியைத் தவிர்க்கவும்."
    },
    humid: {
      en: "High humidity today - carry a towel and stay in air-conditioned spaces when possible.",
      ta: "இன்று அதிக ஈரப்பதம் - ஒரு துண்டு எடுத்துச் செல்லுங்கள் மற்றும் முடிந்தால் குளிரூட்டப்பட்ட இடங்களில் இருங்கள்."
    },
    rain: {
      en: "Rain expected! Carry an umbrella and avoid waterlogged areas in Chennai.",
      ta: "மழை எதிர்பார்க்கப்படுகிறது! குடை எடுத்துச் செல்லுங்கள் மற்றும் சென்னையில் தண்ணீர் தேங்கிய பகுதிகளைத் தவிர்க்கவும்."
    },
    normal: {
      en: "Pleasant weather today! Perfect for outdoor activities.",
      ta: "இன்று இனிமையான காலநிலை! வெளிப்புற நடவடிக்கைகளுக்கு ஏற்றது."
    }
  };

  if (weather.temp > 35) return tips.hot[language];
  if (weather.humidity > 80) return tips.humid[language];
  if (weather.rain_probability > 60) return tips.rain[language];
  return tips.normal[language];
};