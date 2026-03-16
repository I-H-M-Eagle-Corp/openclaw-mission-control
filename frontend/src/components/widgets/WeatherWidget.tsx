"use client";

import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function WeatherWidget() {
  const { weather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <h3 className="text-lg text-zinc-100 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-amber-500" />
            Weather
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-pulse text-zinc-500">Loading weather...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <h3 className="text-lg text-zinc-100 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-amber-500" />
            Weather
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-zinc-500">
            Weather unavailable
          </div>
        </CardContent>
      </Card>
    );
  }

  const { current, forecast } = weather;
  const today = forecast[0];

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-zinc-100 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-amber-500" />
            Weather
          </h3>
          <span className="text-xs text-zinc-500">Inlet, NY</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main temp and condition */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-zinc-100">{current.temp_F}°</span>
              <span className="text-zinc-400">F</span>
            </div>
            <p className="text-sm text-zinc-400 capitalize">{current.condition.text}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Thermometer className="h-3 w-3" />
              <span>H: {today.maxtemp_F}° L: {today.mintemp_F}°</span>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <div>
              <p className="text-xs text-zinc-500">Humidity</p>
              <p className="text-sm text-zinc-100">{current.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-zinc-500">Wind</p>
              <p className="text-sm text-zinc-100">{current.wind_speed} mph {current.wind_dir}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
