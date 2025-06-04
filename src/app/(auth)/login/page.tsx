"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div
      className="flex justify-center p-10 bg-gray-700"
      style={{ height: "100vh" }}
    >
      <SignIn routing="hash" />
    </div>
  );
}
