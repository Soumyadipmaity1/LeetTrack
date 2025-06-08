"use server";

import EmailNotifications from "@components/Essentials/EmailNotification";
import PushNotification from "@components/Essentials/PushNotification";
import { getSettings } from "./settings-action";

export default async function SettingsPage() {
  const receivedData = await getSettings();
  const userData = receivedData?.data;
  if (!userData) {
    return <div>Error: No user data found</div>;
  }
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <div className="w-full">
          {/* Notification page will be added here*/}
          <EmailNotifications userData={userData} />
          <PushNotification userData={userData} />
        </div>
      </div>
    </main>
  );
}
