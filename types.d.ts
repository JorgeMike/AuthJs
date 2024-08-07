import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ReactNode } from "react";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Session {
    token: JWT;
  }
}

export interface IChildren {
  children: ReactNode;
}
