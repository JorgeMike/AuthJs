import NextAuth from "next-auth";
import { User } from "next-auth";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        console.log("authorize");
        return {
          name: "John Doe",
          email: "john@gmail.com",
        };
      },
    }),
  ],
});
