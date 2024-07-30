import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"; // Correct provider name
import prisma from "../../../../prisma/client";
import { GoogleProfile, SessionDate } from "@/types/next-auth/types"; // Corrected typo

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string, // Correct environment variables
      clientSecret: process.env.FACEBOOK_SECRET as string, // Correct environment variables
    }),
  ],

  callbacks: {
    async session({ session }: { session: SessionDate }) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (sessionUser) {
        session.user.id = sessionUser.id.toString();
      }
      return session; // Ensure the session is always returned
    },
    async signIn({ profile }: { profile: GoogleProfile }): Promise<boolean> {
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
