// src/components/Essentials/NotificationContext.tsx
"use client";
import { getQOTD, getReminders } from "@/app/(main)/dashboard/dashboard-action";
import { Reminder } from "@prisma-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type Notification = { id: number; message: string; read: boolean };
type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const getData = async () => {
      const QOTD = await getQOTD();

      if (QOTD?.serverError) {
        toast.error("Failed to fetch QOTD");
      }

      const data: Partial<Reminder> = {
        problemTitle: QOTD?.data?.questionTitle ?? "Title",
      };
      addNotification(data.problemTitle ?? "Check QOTD");

      const reminders = await getReminders();
      if (reminders?.serverError) {
        toast.error("Failed to fetch notifications");
      }
      reminders?.data?.forEach(
        (r) =>
          r.reminderStatus === "PENDING" && addNotification(r.problemTitle),
      );
    };
    getData();
  }, []);

  const addNotification = (message: string) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message, read: false },
    ]);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
