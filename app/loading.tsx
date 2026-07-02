import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <Loader2
          className="h-14 w-14 animate-spin text-orange-500"
        />

        <p className="text-lg font-medium text-slate-600">
          Loading...
        </p>
      </div>
    </main>
  );
}