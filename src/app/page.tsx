import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    } else {
      redirect("/signup");
    }
  }, [user]);

  return <>Loading</>;
}
