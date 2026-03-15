"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Board groups hidden - flattened to single level
export default function BoardGroupsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/boards");
  }, [router]);
  
  return null;
}
