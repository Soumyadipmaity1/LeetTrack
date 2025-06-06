"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Save, Smartphone } from "lucide-react";
import { useState } from "react";

export default function PushNotification() {
  const [enabled, setEnabled] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [streakReminders, setStreakReminders] = useState(false);
  const [achievement, setAchievement] = useState(false);

  return (
    <Card className="max-w-full mt-4">
      <CardHeader className="mt-4 -ml-2">
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center">
            <Smartphone className="mt-0.5 mr-1.5" />
            Push Notifications
          </div>
        </CardTitle>
        <p className="-mt-2 text-xs text-muted-foreground font-semibold">
          Configure push notifications for mobile and desktop.
        </p>
      </CardHeader>
      <CardContent className="space-y-4.5 -ml-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Enable Push Notifications</p>
            <p className="text-xs text-muted-foreground font-semibold">
              Receive notifications on your devices
            </p>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
        <hr className="-mt-2" />

        <div className="flex items-center justify-between -mt-2">
          <div>
            <p className="text-sm font-semibold">Reminder Alerts</p>
            <p className="text-xs text-muted-foreground font-semibold">
              Push notifications for upcoming problems
            </p>
          </div>
          <Switch checked={reminder} onCheckedChange={setReminder} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Achievement Alerts</p>
            <p className="text-xs text-muted-foreground font-semibold">
              Notification for completed milestones
            </p>
          </div>
          <Switch checked={achievement} onCheckedChange={setAchievement} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Streak Reminders</p>
            <p className="text-xs text-muted-foreground font-semibold">
              Keep your solving streak alive
            </p>
          </div>
          <Switch
            checked={streakReminders}
            onCheckedChange={setStreakReminders}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" className="mb-4">
            Send Test Push
          </Button>
          <Button className="rounded">
            <Save />
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
