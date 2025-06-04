import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { getUserFromDb, verifyPassword } from "./utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  // To be determined later
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // logic to verify if the user exists
        const user = await getUserFromDb(credentials.email as string);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid email.");
        }

        // logic to salt and hash password
        const isPasswordValid = await verifyPassword(
          credentials.password as string,
          user.passwordHash as string,
          user.passwordSalt as string
        );

        if (!isPasswordValid) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid password.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
