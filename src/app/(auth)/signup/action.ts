"use server";

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
