"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "@/auth/session";
import { QueryProvider } from "./QueryProvider";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
}
