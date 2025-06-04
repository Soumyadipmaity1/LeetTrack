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

export function hashPassword(password: string): {
  passwordHash: string;
  passwordSalt: string;
} {
  const passwordSalt = crypto.randomBytes(32).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 10_000, 64, "sha512")
    .toString("hex");

  return {
    passwordHash,
    passwordSalt,
  };
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
