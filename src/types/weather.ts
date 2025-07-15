export interface WeatherData {
  location: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  pressure: number;
  visibility: number;
  uv_index: number;
  sunrise: number;
  sunset: number;
  rain_probability: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rain_probability: number;
  wind_speed: number;
  wind_direction: string;
  icon: string;
  description: string;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  rain_probability: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  uv_index: number;
}

export interface AirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  quality_level: string;
  health_advice: string;
}

export interface WeatherAlert {
  id: string;
  type: 'rain' | 'cyclone' | 'heat' | 'flood' | 'thunderstorm';
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  title: string;
  description: string;
  issued_time: number;
  valid_until: number;
  source: string;
}

export interface MonsoonData {
  onset_date: string;
  withdrawal_date: string;
  current_rainfall: number;
  normal_rainfall: number;
  deviation_percentage: number;
  flood_risk: 'low' | 'moderate' | 'high';
  reservoir_levels: {
    poondi: number;
    cholavaram: number;
    redhills: number;
    chembarambakkam: number;
  };
}

export interface LocalTips {
  en: string;
  ta: string;
}
</parameter>