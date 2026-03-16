"use client";

import { useState, useEffect } from "react";
import { Cloud, Calendar, FileText, Droplets, Wind, Thermometer } from "lucide-react";
import { apiClient } from "@/lib/api";

interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  high: number;
  low: number;
  humidity: string;
  wind: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  priority: "high" | "medium" | "low";
}

interface Brief {
  id: number;
  title: string;
  agent: string;
  date: string;
}

// Fetch weather directly from wttr.in
const fetchWeather = async (): Promise<WeatherData> => {
  const response = await fetch("https://wttr.in/Inlet,NY?format=j1");
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }
  const data = await response.json();
  
  return {
    temp: parseInt(data.current_condition[0].temp_F),
    condition: data.current_condition[0].weatherDesc[0].value,
    location: "Inlet, NY",
    high: parseInt(data.weather[0].maxtempF),
    low: parseInt(data.weather[0].mintempF),
    humidity: `${data.current_condition[0].humidity}%`,
    wind: `${data.current_condition[0].windspeedMiles} mph ${data.current_condition[0].winddir16Point}`,
  };
};

export function MissionBriefPanel() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather directly from wttr.in
        const weatherData = await fetchWeather();
        setWeather(weatherData);
        
        // Fetch other data from backend
        const [eventsData, briefsData] = await Promise.all([
          apiClient("/calendar"),
          apiClient("/briefs"),
        ]);
        
        if (eventsData) setEvents(eventsData);
        if (briefsData) setBriefs(briefsData);
      } catch (err) {
        console.error("Failed to load mission brief data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh weather every 15 minutes
    const interval = setInterval(fetchData, 900000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 text-red-400";
      case "medium":
        return "border-amber-500/30 text-amber-400";
      default:
        return "border-zinc-500/30 text-zinc-400";
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-lg font-bold text-zinc-100">Mission Brief</h2>

      {/* Weather */}
      {weather && (
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Weather
              </span>
            </div>
            <span className="text-xs text-zinc-600">{weather.location}</span>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-100">{weather.temp}°</span>
                <span className="text-zinc-400">F</span>
              </div>
              <p className="text-sm text-zinc-400 capitalize">{weather.condition}</p>
            </div>

            <div className="text-right space-y-1 text-xs text-zinc-500">
              <div className="flex items-center gap-1 justify-end">
                <Thermometer className="h-3 w-3" />
                <span>H: {weather.high}° L: {weather.low}°</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Droplets className="h-3 w-3 text-blue-400" />
                <span>{weather.humidity}</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Wind className="h-3 w-3 text-cyan-400" />
                <span>{weather.wind}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar */}
      {events.length > 0 && (
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Upcoming
              </span>
            </div>
            <button className="text-xs text-amber-400 hover:text-amber-300">View →</button>
          </div>

          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-800/30 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-100">{event.title}</p>
                  <p className="text-xs text-zinc-500">{event.time}</p>
                </div>
                <span
                  className={`rounded border px-2 py-0.5 text-xs capitalize ${getPriorityColor(event.priority)}`}
                >
                  {event.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Briefs */}
      {briefs.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Recent Briefs
              </span>
            </div>
            <button className="text-xs text-amber-400 hover:text-amber-300">Archive →</button>
          </div>

          <div className="space-y-2">
            {briefs.map((brief) => (
              <div
                key={brief.id}
                className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-800/30 p-3 transition hover:border-zinc-700"
              >
                <p className="line-clamp-1 text-sm font-medium text-zinc-100">{brief.title}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-amber-400">{brief.agent}</span>
                  <span className="text-xs text-zinc-500">{brief.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
