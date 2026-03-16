"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SessionContextType {
  sessionKey: string | null;
  isAuthenticated: boolean;
  login: (key: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionKey, setSessionKey] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("eagle_session_key");
    }
    return null;
  });

  const login = useCallback((key: string) => {
    localStorage.setItem("eagle_session_key", key);
    setSessionKey(key);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("eagle_session_key");
    setSessionKey(null);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionKey,
        isAuthenticated: !!sessionKey,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
}

// Auth guard components
export function Authenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  return isAuthenticated ? <>{children}</> : null;
}

export function Unauthenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  return !isAuthenticated ? <>{children}</> : null;
}
