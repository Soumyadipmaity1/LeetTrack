import { customSignIn, signUp } from "@/app/(auth)/_components/action";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";

interface CredentialsFormProps {
  csrfToken?: string;
  formType: "login" | "signup";
}

export function CredentialsForm(props: CredentialsFormProps) {
  const handleSubmit = async (data: FormData) => {
    switch (props.formType) {
      case "login":
        const { error } = await customSignIn(data);
        if (!error) {
          redirect("/dashboard");
        } else {
          toast.error("Your Email or Password is wrong!");
        }
        break;

      case "signup":
        const signUpResponse = await signUp(
          (data.get("email") as string) ?? "",
          (data.get("password") as string) ?? ""
        );
        if (signUpResponse) {
          redirect("/dashboard");
        } else {
          toast.error("Something went wrong!. Please try again later.");
        }
    }
  };

  return (
    <form
      className="max-w-md w-full mx-auto bg-white p-0 flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(new FormData(e.target as HTMLFormElement));
      }}
    >
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
