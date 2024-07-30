import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FaceProvider from "next-auth/providers/facebook";
import prisma from "../../../../prisma/client";

// console.log(prisma);
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
    async signIn({ profile }) {
      if (profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (existingUser) {
          return true;
        }

        await prisma.user.create({
          data: {
            name: profile.name as string,
            email: profile.email as string,
            image: profile.image as string,
          },
        });
      }
      return true;
    },
  },
});
export { handler as GET, handler as POST };
