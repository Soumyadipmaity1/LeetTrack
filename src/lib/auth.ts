import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // To be determined later
  providers: [],
});
