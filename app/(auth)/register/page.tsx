import Link from "next/link";

import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Account"
      description="Create your ParcelTrack account"
    >
      <RegisterForm />

      <div className="mt-8 border-t pt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-orange-600 hover:text-orange-700"
        >
          Login
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        By creating an account you agree to our Terms of
        Service and Privacy Policy.
      </p>
    </AuthCard>
  );
}