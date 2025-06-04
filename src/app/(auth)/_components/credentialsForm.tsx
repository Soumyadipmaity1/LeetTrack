import { signUp } from "@/app/(auth)/signup/action";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

interface CredentialsFormProps {
  csrfToken?: string;
  formType: "login" | "signup";
}

export function CredentialsForm(props: CredentialsFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    switch (props.formType) {
      case "login":
        const signInResponse = await signIn("credentials", {
          email: data.get("email"),
          password: data.get("password"),
          redirect: false,
        });

        if (signInResponse && !signInResponse.error) {
          redirect("/dashboard");
        } else {
          setError("Your Email or Password is wrong!");
        }
        break;

      case "signup":
        const signUpResponse = await signUp(
          (data.get("email") as string) ?? "",
          (data.get("password") as string) ?? ""
        );
        if (signUpResponse) {
          redirect("/dashboard"); // Change to your desired route
        } else {
          setError("Something went wrong!. Please try again later.");
        }
    }
  };

  return (
    <form
      className="max-w-md w-full mx-auto bg-white p-0 flex flex-col"
      action={async (formData) => {
        await handleSubmit(formData);
      }}
    >
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
        {props.formType === "login" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
}
