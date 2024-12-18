import { v4 } from "uuid"
import prisma from "@/prisma/client";

export async function generateAuthToken(email: string) {
  const dbUser = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!dbUser) {
    return '';
  }

  await prisma.authToken.deleteMany({
    where: {
      email
    }
  });

  const uuid = v4();
  // Set the expiration date to 3 hours after creation
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 3);

  const token = await prisma.authToken.create({
    data: {
      email,
      token: uuid,
      expiresAt
    }
  });
  return uuid;
}

export async function validateAuthToken(token: string) {
  try {
    const authToken = await prisma.authToken.findFirst({
      where: {
        token
      }
    });
  
    if (authToken) {
      const currentTime = new Date();
  
      if (authToken.expiresAt > currentTime) {
        const user = await prisma.user.findFirst({
          where: {
            email: authToken.email
          }
        });
  
        if (user) {
          await prisma.user.update({
            where: {
              email: user.email
            },
            data: {
              verified: true,
            }
          });
  
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}
