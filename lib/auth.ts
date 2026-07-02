import { prisma } from "@/lib/prisma";
import { getSessionCookie } from "@/lib/cookies";
import { verifyJWT } from "@/lib/jwt";

export async function getCurrentUser() {
 const token = await getSessionCookie();



if (!token) {
  return null;
}
  try {
    const payload = await verifyJWT(token);

    if (!payload.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}