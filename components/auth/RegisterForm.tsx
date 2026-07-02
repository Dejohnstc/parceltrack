"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations";
import type { RegisterInput } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message ?? "Registration failed");
        return;
      }

      router.push("/login?registered=true");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          {...register("name")}
          className="w-full rounded-xl border p-3"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.name?.message}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          {...register("email")}
          className="w-full rounded-xl border p-3"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border p-3"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.password?.message}
        </p>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}