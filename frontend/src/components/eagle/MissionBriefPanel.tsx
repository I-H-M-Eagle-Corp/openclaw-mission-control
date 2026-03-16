"use client";

import { useState, useEffect } from "react";
import { Cloud, Calendar, FileText } from "lucide-react";
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

export function MissionBriefPanel() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherData, eventsData, briefsData] = await Promise.all([
          apiClient("/weather"),
          apiClient("/calendar"),
          apiClient("/briefs"),
        ]);

        if (weatherData) setWeather(weatherData);
        if (eventsData) setEvents(eventsData);
        if (briefsData) setBriefs(briefsData);
      } catch (err) {
        console.error("Failed to load mission brief data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <div className="mb-3 flex items-center gap-2">
            <Cloud className="h-4 w-4 text-zinc-400" />
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Weather
            </span>
            <span className="text-xs text-zinc-600">{weather.location}</span>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-100">{weather.temp}°</span>
                <span className="text-zinc-400">F</span>
              </div>
              <p className="text-sm text-zinc-400">{weather.condition}</p>
            </div>

            <div className="ml-auto text-right text-xs text-zinc-500">
              <p>H: {weather.high}° L: {weather.low}°</p>
              <p>Humidity: {weather.humidity}</p>
              <p>Wind: {weather.wind}</p>
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
