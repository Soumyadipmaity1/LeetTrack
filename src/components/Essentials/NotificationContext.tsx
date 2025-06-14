// src/components/Essentials/NotificationContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type Notification = { id: number; message: string; read: boolean };
type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message, read: false }
    ]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
