"use client";

import { cn } from "@/lib/utils"; // helper merge class
import { Notification } from "./NotificationList";

interface Props {
  notification: Notification;
  onClick: (id: string) => void;
}

export default function NotificationItem({ notification, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(notification.id)}
      className={cn(
        "flex items-start space-x-3 px-4 py-3 cursor-pointer transition",
        notification.read ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
      )}
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
        <p className="text-sm text-gray-600">{notification.message}</p>
        <span className="text-xs text-gray-400">{notification.time}</span>
      </div>
      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
      )}
    </div>
  );
}
