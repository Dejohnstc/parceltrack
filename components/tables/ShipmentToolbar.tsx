"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShipmentToolbarProps {
  search: string;
}

export default function ShipmentToolbar({
  search,
}: ShipmentToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(search);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <form
        onSubmit={handleSearch}
        className="relative w-full md:max-w-md"
      >
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search tracking number..."
          className="pl-10 pr-24"
        />

        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          Search
        </Button>
      </form>

      <Button asChild>
        <Link href="/dashboard/shipments/create">
          Create Shipment
        </Link>
      </Button>
    </div>
  );
}