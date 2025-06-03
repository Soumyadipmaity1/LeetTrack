"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { CredentialsForm } from "@/components/credentialsForm";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow flex flex-col items-center">
        <button
          onClick={() => signOut()}
          type="button"
          className="btn btn-primary mb-4"
        >
          Sign Out
        </button>
        <div className="text-center">
          <div className="text-lg font-semibold">
            Signed in as {session.user?.name ?? session.user?.email ?? "User"}
          </div>
          {session.user?.email && (
            <div className="text-gray-500">{session.user.email}</div>
          )}
        </div>
      </div>
    );
  }

  return (
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
  );
}
