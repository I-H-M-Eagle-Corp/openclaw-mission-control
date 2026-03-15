"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Approvals hidden - notify only mode
export default function ApprovalsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  
  return null;
}
