"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline" | "busy";
  emoji: string;
  current_task?: string;
  last_seen?: string;
}

export function AgentStatusPanel() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await apiClient("/agents/status");
        if (data) {
          setAgents(data);
        }
      } catch (err) {
        setError("Failed to load agents");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
    const interval = setInterval(fetchAgents, 15000); // Refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const onlineCount = agents.filter((a) => a.status === "online").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "busy":
        return "bg-amber-500";
      default:
        return "bg-zinc-500";
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

  if (error) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-zinc-100">Agent Status</h2>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
            {onlineCount}/{agents.length} Online
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-800/50 p-3 transition hover:border-zinc-700"
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-lg">
                {agent.emoji}
              </div>
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-800 ${getStatusColor(agent.status)}`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-zinc-100">{agent.name}</p>
                <span className="text-xs text-zinc-500">{agent.role}</span>
              </div>
              <p className="truncate text-xs text-zinc-400">{agent.current_task}</p>
            </div>

            <span className="shrink-0 text-xs capitalize text-zinc-500">
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
