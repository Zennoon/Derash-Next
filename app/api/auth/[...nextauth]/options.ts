import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import { z } from "zod";
import prisma from "@/prisma/client";

export const options: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env['GOOGLE_CLIENT_ID'] || '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
    }),
    Discord({
      clientId: process.env['DISCORD_CLIENT_ID'] || '',
      clientSecret: process.env['DISCORD_CLIENT_SECRET'] || '',
    }),
    Github({
      clientId: process.env['GITHUB_CLIENT_ID'] || '',
      clientSecret: process.env['GITHUB_CLIENT_SECRET'] || '',
    }),
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize(credentials) {
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findFirst({
            where: {
              email,
            },
            include: {
              Customer: true,
              Manager: true,
              Driver: true
            }
          });
          
          if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
              return user;
            };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: user.email || ''
          }
        });

        if (dbUser) {
          if (dbUser.verified) return true;
          return `/authenticate?email=${dbUser.email}`
        }
      }
      return false; 
    },

    redirect({ url, baseUrl }) {
      return `${baseUrl}/redirect`
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: user.email || ''
          },
          include: {
            Customer: true,
            Manager: true,
            Driver: true,
          }
        });

        if (dbUser?.Customer) token.role = 'customer'; 
        else if (dbUser?.Manager) token.role = 'manager';
        else if (dbUser?.Driver) token.role = 'driver';

        token.user = dbUser;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string || '';
        session.user.user = token.user;
      }
      return session;
    }
  }
}
