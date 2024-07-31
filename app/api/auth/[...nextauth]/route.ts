import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FaceProvider from "next-auth/providers/facebook";
import prisma from "../../../../prisma/client";
import { GoogleProfile } from "next-auth/providers/google";

// console.log(prisma);
// Extend next-auth Session and profile interfaces
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image?: string;
      name: string;
    } & DefaultSession["user"];
  }
  interface Profile {
    picture?: string;
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FaceProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async session({ session, token, user }): Promise<any> {
      if (session) {
        const sessionUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (sessionUser) {
          session.user.id = token.id as string;
          return session;
        }
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (existingUser) {
          return true;
        }

        if (profile.picture) {
          await prisma.user.create({
            data: {
              name: profile.name as string,
              email: profile.email as string,
              image: profile.picture as string,
            },
          });
        }
      }
      return true;
    },
  },
});
export { handler as GET, handler as POST };
