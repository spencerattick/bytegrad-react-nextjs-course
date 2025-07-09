import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          console.log("No user found with the given email");
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (isTryingToAccessApp) {
        return false;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
