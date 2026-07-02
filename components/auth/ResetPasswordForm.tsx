"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  CheckCircle2,
} from "lucide-react";

import { resetPasswordAction } from "@/actions/auth/reset-password";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await resetPasswordAction(
        token,
        {
          password,
          confirmPassword,
        }
      );

      if (!result.success) {
        setError(
          result.message ??
            "Unable to reset password."
        );
        return;
      }

      setSuccess(result.message);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    });
  }

  const passwordStrength = (() => {
    if (password.length < 8) return 25;
    if (password.length < 10) return 50;
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      return 75;
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return 100;

    return 60;
  })();

  return (
    <div className="rounded-2xl bg-white p-10 shadow-xl">
      <div className="text-center">
        <Lock className="mx-auto mb-5 h-14 w-14 text-orange-500" />

        <h1 className="text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mt-3 text-slate-500">
          Choose a new password for your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            New Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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

          <div className="mt-3 h-2 rounded bg-slate-200">
            <div
              className="h-2 rounded bg-orange-500 transition-all"
              style={{
                width: `${passwordStrength}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Use at least 8 characters with uppercase,
            numbers and symbols.
          </p>
        </div>

        {/* Confirm */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3 pr-12 outline-none transition focus:border-orange-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 className="h-5 w-5" />

            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>

      <div className="mt-8 border-t pt-6 text-center">
        <Link
          href="/login"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}