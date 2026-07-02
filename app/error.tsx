"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-7xl font-black text-red-500">
          Oops!
        </h1>

        <h2 className="mt-6 text-3xl font-bold">
          Something went wrong.
        </h2>

        <p className="mt-5 text-slate-600">
          An unexpected error occurred while loading this page.
        </p>

        <button
          onClick={reset}
          className="mt-10 rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}