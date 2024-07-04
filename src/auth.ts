import { signInSchema } from "@/lib/zod";
import axios from "axios";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    error: "/signin",
  },
  providers: [
    GitHub,
    Google,
    credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          /* const user = await login(email, password); */
          const res = await axios.post(
            `${process.env.AUTH_URL}/api/auth/signin`,
            {
              email,
              password,
            }
          );

          if (!res.data.user) {
            return null;
          }

          return res.data.user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname === "user") return !!auth;
      return true;
    },
    async session({ session, token, user, newSession }) {
      session.token = token;
      return session;
    },
    async signIn(params) {
      let name = params.profile?.name || params.user?.name;
      let email = params.profile?.email || params.user?.email;

      try {
        const userStatus = await axios.post(
          `${process.env.AUTH_URL}/api/auth/login`,
          {
            email,
            name,
            authProvider: params.account?.provider,
          }
        );

        if (userStatus.data.error) {
          return false;
        }
      } catch (error) {
        console.log("ERROR", error);
        return false;
      }

      return true;
    },
  },
});
