import BaseLayout from "@/Provider/BaseLayout";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  return <BaseLayout>{children}</BaseLayout>;
}
