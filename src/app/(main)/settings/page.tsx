"use client";

import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import { Tabs } from "@/components/ui/tabs";
import EmailNotifications from "@components/Essentials/EmailNotification";
import PushNotification from "@components/Essentials/PushNotification";

export default function SettingsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <Tabs defaultValue="profile" className="w-full">
          {/* Notification page will be added here*/}
          <EmailNotifications />
          <PushNotification />
        </Tabs>
      </div>
    </main>
  );
}
