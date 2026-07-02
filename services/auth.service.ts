import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/services/email/sendVerificationEmail";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { createJWT } from "@/lib/jwt";
import { generateToken } from "@/lib/token";
import { sendResetPasswordEmail } from "@/services/email/sendResetPasswordEmail";
import {
  registerSchema,
  loginSchema,
} from "@/lib/validations";

import { forgotPasswordSchema } from "@/lib/validations/forgot-password";
import { resetPasswordSchema } from "@/lib/validations/reset-password";

/* -------------------------------------------------------------------------- */
/*                                Register User                               */
/* -------------------------------------------------------------------------- */

export async function registerUser(data: unknown) {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const hashedPassword = await hashPassword(password);

  const verificationToken = generateToken();

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationToken,
      emailVerified: false,
    },
  });
await sendVerificationEmail(
  user.email,
  user.name,
  verificationToken
);
  return {
    success: true,
    user,
    verificationToken,
  };
}

/* -------------------------------------------------------------------------- */
/*                                  Login User                                */
/* -------------------------------------------------------------------------- */

export async function loginUser(data: unknown) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const passwordMatches = await verifyPassword(
    password,
    user.password
  );

  if (!passwordMatches) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  if (!user.emailVerified) {
  return {
    success: false,
    message: "Please verify your email before logging in.",
  };
}
  const token = await createJWT({
    userId: user.id,
    role: user.role,
  });

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                              Forgot Password                               */
/* -------------------------------------------------------------------------- */

export async function forgotPassword(data: unknown) {
  const parsed = forgotPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten(),
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsed.data.email,
    },
  });

  // Never reveal whether the email exists
  if (!user) {
    return {
      success: true,
      message:
        "If an account exists, a password reset email has been sent.",
    };
  }

  const resetPasswordToken = generateToken();

  const resetPasswordExpires = new Date(
    Date.now() + 1000 * 60 * 30 // 30 minutes
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken,
      resetPasswordExpires,
    },
  });
await sendResetPasswordEmail(
  user.email,
  user.name,
  resetPasswordToken
);
  // TODO:
  // await sendResetPasswordEmail({
  //   email: user.email,
  //   name: user.name,
  //   token: resetPasswordToken,
  // });

  return {
    success: true,
    message:
      "If an account exists, a password reset email has been sent.",
  };
}

/* -------------------------------------------------------------------------- */
/*                              Reset Password                                */
/* -------------------------------------------------------------------------- */

export async function resetPassword(
  token: string,
  data: unknown
) {
  const parsed = resetPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten(),
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid password reset link.",
    };
  }

  if (
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < new Date()
  ) {
    return {
      success: false,
      message: "This password reset link has expired.",
    };
  }

  const hashedPassword = await hashPassword(
    parsed.data.password
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return {
    success: true,
    message: "Password updated successfully.",
  };
}