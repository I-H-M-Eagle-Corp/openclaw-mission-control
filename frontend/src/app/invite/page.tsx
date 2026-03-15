"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Invite page hidden - single owner operation
export default function InvitePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  
  return null;
}
