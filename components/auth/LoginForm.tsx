"use client";

import { useState, useTransition } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { loginAction } from "@/actions/auth/login";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const verified =
    searchParams.get("verified") === "true";

  const [isPending, startTransition] =
    useTransition();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    startTransition(async () => {
      const result = await loginAction({
        email,
        password,
      });

      if (result?.success === false) {
        setError(
          result.message ??
            "Invalid email or password."
        );
      }

      router.refresh();
    });
  }

  return (
    <div className="w-full rounded-2xl bg-white p-10 shadow-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Welcome Back
        </h2>

        <p className="mt-3 text-slate-500">
          Login to your ParcelTrack account.
        </p>
      </div>

      {verified && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          ✅ Your email has been verified successfully.
          You can now log in.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="name@example.com"
            className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="w-full rounded-xl border p-3 pr-12 outline-none transition focus:border-orange-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing In...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="mt-8 border-t pt-6 text-center text-sm text-slate-600">
        `&lsquo;` have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-orange-600 hover:text-orange-700"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}