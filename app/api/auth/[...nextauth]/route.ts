import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth v5 beta exports handlers directly
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export const { GET, POST } = handlers;
