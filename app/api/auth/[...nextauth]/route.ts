import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FaceProvider from "next-auth/providers/facebook";
import prisma from "../../../../prisma/client";
import { GoogleProfile, SessionDate } from "@/types/next-autth/types";
const handler: NextAuthOptions = NextAuth({
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

  callbacks: {
    async session({ session }: { session: SessionDate }) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (sessionUser) {
        session.user.id = sessionUser.id.toString();
        return session;
      }
    },
    async signIn({ profile }: { profile: GoogleProfile }): Promise<Boolean> {
      if (profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (existingUser) {
          return true;
        }

        await prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          },
        });
      }
      return true;
    },
  },
});
export { handler as GET, handler as POST };
