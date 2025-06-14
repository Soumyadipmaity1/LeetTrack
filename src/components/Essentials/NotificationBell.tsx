// src/components/Essentials/NotificationBell.tsx
"use client";
import { Bell } from "lucide-react";
import { useNotification } from "./NotificationContext";

export const NotificationBell = () => {
  const { unreadCount } = useNotification();

  return (
    <div className="relative">
      <Bell className="h-6 w-6" color="#FFD700" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium rounded-full px-1.5 py-0.5">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </div>
  );
};
