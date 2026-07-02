import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function VerifyEmailPage({
  params,
}: Props) {
  const { token } = await params;

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border bg-white p-10 shadow">
          <h1 className="text-2xl font-bold text-red-600">
            Invalid Verification Link
          </h1>

          <p className="mt-3 text-slate-500">
            This verification link is invalid or has already been used.
          </p>
        </div>
      </div>
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  redirect("/login?verified=true");
}