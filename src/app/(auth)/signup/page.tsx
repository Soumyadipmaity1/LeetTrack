"use client";

import { CredentialsForm } from "@/app/(auth)/_components/credentialsForm";
import { GoogleSignInButton } from "@/app/(auth)/_components/GoogleSignInButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-6 text-base">
          Sign in to your LeetCode Reminder account
        </p>
        <CredentialsForm formType="signup" />

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 font-semibold">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <GoogleSignInButton />
      </div>
      <div className="max-w-md mx-auto">
        <Link
          href="/login"
          className="text-blue-600 text-sm flex flex-row-reverse"
        >
          Already have an account? Login
        </Link>
      </div>
    </>
  );
}
