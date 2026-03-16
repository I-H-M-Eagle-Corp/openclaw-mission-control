"use client";

import { useState } from "react";
import { useSession } from "./session";

export function LoginPanel() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const { login } = useSession();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.startsWith("eagle_")) {
      setError("Invalid session key format");
      return;
    }
    login(key);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500">
            <span className="text-xl font-bold text-zinc-950">E</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Eagle Command</h1>
          <p className="text-sm text-zinc-500">I.H.M. Eagle Corp</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Session Key
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eagle_..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-500 py-2 font-medium text-zinc-950 transition hover:bg-amber-400"
          >
            Access Dashboard
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Contact your administrator for a session key
        </p>
      </div>
    </div>
  );
}
