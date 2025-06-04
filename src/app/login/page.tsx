"use client";

import { CredentialsForm } from "@/components/credentialsForm";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow">
      
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
