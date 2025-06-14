// src/components/Essentials/NotificationDropdown.tsx
"use client";
import { useNotification } from "./NotificationContext";

export const NotificationDropdown = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { notifications, markAsRead } = useNotification();

  if (!open) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border z-50"
      tabIndex={0}
      onBlur={onClose}
    >
      <div className="p-3 border-b font-semibold text-gray-700">Notifications</div>
      <ul className="max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <li className="p-4 text-gray-500 text-sm">No notifications</li>
        ) : (
          notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-3 border-b last:border-b-0 flex justify-between items-center ${
                !notif.read ? "bg-blue-50" : ""
              }`}
            >
              <span>{notif.message}</span>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark read
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
