"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackingSearch() {
  const router = useRouter();

  const [trackingNumber, setTrackingNumber] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!trackingNumber.trim()) return;

    router.push(`/track/${trackingNumber}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex gap-4"
    >
      <Input
        value={trackingNumber}
        onChange={(e) =>
          setTrackingNumber(e.target.value)
        }
        placeholder="PTX-2026-8J4M7Q2P"
        className="h-12"
      />

      <Button className="h-12 px-8">
        <Search className="mr-2 h-4 w-4" />

        Track
      </Button>
    </form>
  );
}