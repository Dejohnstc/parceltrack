"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

import { forgotPasswordAction } from "@/actions/auth/forgot-password";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await forgotPasswordAction({
        email,
      });

      if (!result.success) {
        setError(result.message ?? "Something went wrong.");
        return;
      }

      setSuccess(result.message ?? "Password reset link sent successfully.");
    });
  }

  return (
    <div className="rounded-2xl bg-white p-10 shadow-xl">
      <div className="text-center">
        <Mail className="mx-auto mb-5 h-14 w-14 text-orange-500" />

        <h1 className="text-3xl font-bold">
          Forgot Password?
        </h1>

        <p className="mt-3 text-slate-500">
          Enter your email address and `&#39;` send you a
          password reset link.
        </p>
      </div>

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
            required
            autoComplete="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="name@example.com"
            className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {success}
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
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="mt-8 border-t pt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Login
        </Link>
      </div>
    </div>
  );
}