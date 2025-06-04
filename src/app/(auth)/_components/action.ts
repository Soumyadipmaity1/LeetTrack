"use server";

import { signIn } from "@lib/auth";
import { db } from "@lib/db";
import { hashPassword } from "@lib/utils";

export const signUp = async (email: string, password: string) => {
  const { passwordHash, passwordSalt } = hashPassword(password);

  try {
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        passwordSalt,
        leetCodeUsername: "",
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const customSignIn = async (data: FormData) => {
  try {
    await signIn("credentials", data);
    return { error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
