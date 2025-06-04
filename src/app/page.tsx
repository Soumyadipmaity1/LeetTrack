import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  } else {
    return redirect("/dashboard");
  }
}
