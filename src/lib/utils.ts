import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";
import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserFromDb(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function verifyPassword(
  givenPassword: string,
  passwordHash: string,
  passwordSalt: string
) {
  const givenPasswordHash = crypto
    .pbkdf2Sync(givenPassword, passwordSalt, 10_000, 64, "sha512")
    .toString("hex");

  return givenPasswordHash === passwordHash;
}
