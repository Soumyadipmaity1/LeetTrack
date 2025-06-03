import BaseLayout from "@/Provider/BaseLayout";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth();

  if (!data?.user) {
    redirect("/login");
  }

  return <BaseLayout>{children}</BaseLayout>;
}
