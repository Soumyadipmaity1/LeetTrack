import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | LeetTrack",
  description: "Login page for LeetTrack",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
