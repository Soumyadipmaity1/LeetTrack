"use client";

import { useUser } from "@clerk/nextjs";

export default function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="py-1 pr-1">
      <h1 className="text-3xl font-bold text-black">
        Welcome Back,
        {user?.username ?? user?.firstName ?? user?.lastName ?? "Guest"} !
      </h1>
    </div>
  );
}
