"use client";

import useSWR from "swr";

interface WeatherData {
  current: {
    temp_F: string;
    temp_C: string;
    condition: {
      text: string;
      icon: string;
    };
    humidity: string;
    wind_speed: string;
    wind_dir: string;
  };
  forecast: {
    maxtemp_F: string;
    mintemp_F: string;
    maxtemp_C: string;
    mintemp_C: string;
  }[];
}

const fetcher = async (url: string): Promise<WeatherData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await response.json();
  
  return {
    current: {
      temp_F: data.current_condition[0].temp_F,
      temp_C: data.current_condition[0].temp_C,
      condition: {
        text: data.current_condition[0].weatherDesc[0].value,
        icon: data.current_condition[0].weatherIconUrl[0].value,
      },
      humidity: data.current_condition[0].humidity,
      wind_speed: data.current_condition[0].windspeedMiles,
      wind_dir: data.current_condition[0].winddir16Point,
    },
    forecast: data.weather.map((day: any) => ({
      maxtemp_F: day.maxtempF,
      mintemp_F: day.mintempF,
      maxtemp_C: day.maxtempC,
      mintemp_C: day.mintempC,
    })),
  };
};

export function useWeather() {
  const { data, error, isLoading } = useSWR<WeatherData>(
    "https://wttr.in/Inlet,NY?format=j1",
    fetcher,
    {
      refreshInterval: 900000, // 15 minutes
      revalidateOnFocus: false,
    }
  );

  return {
    weather: data,
    isLoading,
    error: error?.message || null,
  };
}
