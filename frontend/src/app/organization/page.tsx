"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Organization page hidden - single owner operation
export default function OrganizationPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  
  return null;
}
