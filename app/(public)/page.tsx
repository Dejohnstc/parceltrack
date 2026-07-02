import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
      <div className="w-full rounded-2xl border bg-white p-10 shadow-sm">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            Track Your Shipment
          </h1>

          <p className="mt-4 text-slate-500">
            Enter your tracking number below.
          </p>

        </div>

        <div className="mt-10 flex gap-4">

          <Input
            placeholder="PTX-2026-8J4M7Q2P"
            className="h-12"
          />

          <Button className="h-12 px-8">

            <Search className="mr-2 h-4 w-4" />

            Track

          </Button>

        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Example: PTX-2026-8J4M7Q2P
        </div>

      </div>
    </main>
  );
}