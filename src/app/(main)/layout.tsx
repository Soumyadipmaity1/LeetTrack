import BaseLayout from "@/Provider/BaseLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await auth();

  // if (!data?.user) {
  //   redirect("/login");
  // }

  return <BaseLayout>{children}</BaseLayout>;
}
