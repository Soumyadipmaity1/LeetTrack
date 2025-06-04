"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center p-10 bg-gray-700">
      <SignUp routing="hash" />
    </div>
  );
}
