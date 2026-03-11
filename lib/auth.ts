import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { type DefaultSession, type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim().toLowerCase();
      const password = credentials?.password;

      if (!email || !password) {
        return null;
      }

      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (!existingUser?.passwordHash) {
        return null;
      }

      const isPasswordValid = await compare(password, existingUser.passwordHash);

      if (!isPasswordValid) {
        return null;
      }

      return existingUser;
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id ?? token.sub ?? "",
      },
    }),
  },
};

export const auth = () => getServerSession(authOptions);
