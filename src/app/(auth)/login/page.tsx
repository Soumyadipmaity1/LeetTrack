"use client";

import { CredentialsForm } from "@/components/credentialsForm";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
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
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="mb-6 text-gray-500">Sign in to your account</p>
        <CredentialsForm />

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 font-semibold">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <GoogleSignInButton />
      </div>
      <div className="max-w-md mx-auto">
        <Link
          href="/signup"
          className="text-blue-600 text-sm flex flex-row-reverse"
        >
          don&apos;t have an account? Sign Up
        </Link>
      </div>
    </>
  );
}
