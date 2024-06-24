import { connectDB } from "@/lib/mongo";
import { signInSchema } from "@/lib/zod";
import User from "@/models/user";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
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

          const user = login(email, password);

          if (!user) throw new Error("User not found");

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 días
    updateAge: 24 * 60 * 60, // 24 horas
  },
  callbacks: {
    async redirect(params) {
      console.log("params", params);
      return "/d";
    },
  },
});

const login = async (email: string, password: string) => {
  try {
    await connectDB();

    const userFound = await User.findOne({
      email,
    });

    if (!userFound) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return null;
    }

    return userFound;
  } catch (error) {
    console.log(error);
    return null;
  }
};
