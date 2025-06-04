"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailNotifications from "@components/Essentials/EmailNotification";
import PushNotification from "@components/Essentials/PushNotification";
import { Bell, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-14">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground mb-6 text-sm font-semibold">
          Manage your account settings and preferences.
        </p>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="flex space-x-2 bg-muted p-1 rounded-lg w-fit">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            {/* Profile page will be added here */}
          </TabsContent>
          <TabsContent value="notifications">
            {/* Notification page will be added here*/}
            <EmailNotifications />
            <PushNotification />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
