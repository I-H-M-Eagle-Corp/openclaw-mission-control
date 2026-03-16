"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Alert {
  id: number;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function AlertCenter() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await apiClient("/alerts");
        if (data) {
          setAlerts(data);
        }
      } catch (err) {
        console.error("Failed to load alerts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
    // TODO: API call to mark as read
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "info":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";
      case "success":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
      case "warning":
        return "border-amber-500/20 bg-amber-500/10 text-amber-400";
      case "error":
        return "border-red-500/20 bg-red-500/10 text-red-400";
      default:
        return "border-zinc-500/20 bg-zinc-500/10 text-zinc-400";
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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-bold text-zinc-100">Alert Center</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-xs text-amber-400 hover:text-amber-300"
        >
          Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border p-4 ${getAlertStyles(alert.type)} ${
              alert.read ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {!alert.read && (
                  <div className="h-2 w-2 rounded-full bg-current" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-medium">{alert.title}</p>
                  <span className="text-xs opacity-70">{alert.time}</span>
                </div>
                <p className="text-sm opacity-80">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-zinc-100">
          View All
        </button>
        <button className="flex-1 rounded-lg bg-amber-600 py-2 text-sm font-medium text-white transition hover:bg-amber-500">
          Settings
        </button>
      </div>
    </div>
  );
}
