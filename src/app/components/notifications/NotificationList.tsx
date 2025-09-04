"use client";

import NotificationItem from "./NotificationItem";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface Props {
  notifications: Notification[];
  onItemClick: (id: string) => void;
}

export default function NotificationList({ notifications, onItemClick }: Props) {
  return (
    <div className="max-h-96 overflow-y-auto divide-y">
      {notifications.length > 0 ? (
        notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onClick={onItemClick}
          />
        ))
      ) : (
        <p className="p-4 text-sm text-gray-500 text-center">
          No notifications
        </p>
      )}
    </div>
  );
}
