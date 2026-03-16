// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.eagle-wireless.net";

// Session key from localStorage
export function getSessionKey(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("eagle_session_key");
  }
  return null;
}

// API client with session key
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const sessionKey = getSessionKey();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Session-Key": sessionKey || "",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Redirect to login on auth failure
    window.location.href = "/";
    return null;
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
