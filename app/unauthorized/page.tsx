import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-7xl font-black text-red-500">
          403
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Access Denied
        </h2>

        <p className="mt-5 text-slate-600">
          You `&apos;` have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-600"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}