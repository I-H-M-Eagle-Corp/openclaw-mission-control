"use client";

import { useSession, Authenticated, Unauthenticated } from "@/auth/session";
import { LoginPanel } from "@/auth/LoginPanel";
import { AgentStatusPanel } from "@/components/eagle/AgentStatusPanel";
import { MissionBriefPanel } from "@/components/eagle/MissionBriefPanel";
import { AlertCenter } from "@/components/eagle/AlertCenter";
import { LogOut } from "lucide-react";

export default function EagleDashboard() {
  const { logout } = useSession();

  return (
    <>
      <Unauthenticated>
        <LoginPanel />
      </Unauthenticated>

      <Authenticated>
        <div className="min-h-screen bg-zinc-950">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                  <span className="text-xl font-bold text-zinc-950">E</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-100">Eagle Command</h1>
                  <p className="text-xs text-zinc-500">I.H.M. Eagle Corp</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-zinc-500">System Status</p>
                  <p className="text-sm font-medium text-emerald-400">Operational</p>
                </div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <button
                  onClick={logout}
                  className="ml-4 rounded-lg border border-zinc-700 p-2 text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-300"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <AgentStatusPanel />
              <MissionBriefPanel />
              <AlertCenter />
            </div>
          </main>
        </div>
      </Authenticated>
    </>
  );
}
