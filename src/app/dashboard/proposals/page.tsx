"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProposalsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/analysis");
  }, [router]);
  return null;
}
