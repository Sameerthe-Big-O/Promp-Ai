import NextAuth, {
  NextAuthOptions,
  User as NextAuthUser,
  Profile as NextAuthProfile,
  Session,
} from "next-auth";

export interface GoogleProfile extends NextAuthProfile {
  name: string;
  email: string;
  picture: string;
}

export interface SessionDate {
  user: {
    id: string;
    email: string;
    image?: string;
  };
}
