"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/dashboard"); // Change to your desired route
    } else {
      setError("Your Email or Password is wrong!");
    }
  };

  return (
    <form
      className="max-w-md w-full mx-auto bg-white p-0 flex flex-col"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
      <p className="text-gray-500 text-center mb-6 text-base">
        Sign in to your LeetCode Reminder account
      </p>
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md text-center">
          {error}
        </span>
      )}
      <label htmlFor="email" className="mb-1 font-semibold text-sm">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        required
        className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-base"
      />
      <label htmlFor="password" className="mb-1 font-semibold text-sm">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        required
        className="w-full px-4 py-3 mb-6 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-base"
      />
      {/* Add your submit button and other elements below as needed */}
      <Button type="submit" className="cursor-pointer">
        Sign In
      </Button>
    </form>
  );
}
