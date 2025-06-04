import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | LeetTrack",
  description: "Signup page for LeetTrack",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
