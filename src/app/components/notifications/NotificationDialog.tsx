import * as Popover from "@radix-ui/react-popover";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationList, { Notification } from "./NotificationList";
import { getNotifications } from "@/app/services/notifications"
import PostDetailDialog from '@/app/components/posts/detail/Dialog'

export default function NotificationPopover() {
  const [open, setOpen] = useState(false)
  const [postClick, setPostClick] = useState({} as any);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications(5).then(setNotifications).catch((err) => {
      console.error("Error fetching notifications:", err)
    })
  }, []);

  const handleItemClick = (id: string) => {
    setOpen(true);
    let post = notifications.find(n => n.id === id);
    setPostClick(post);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover.Root>
      <Popover.Trigger asChild className="data-[state=open]:text-blue-500">
        <button className="relative p-2 rounded-full bg-gray-100">
          <Bell className="w-5 h-5 hover:text-blue-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="center"
          className="w-96 rounded-xl bg-white shadow-lg border z-50"
        >
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h3 className="text-lg font-semibold">Thông báo</h3>
          </div>

          <NotificationList
            notifications={notifications}
            onItemClick={handleItemClick}
          />

          <Popover.Arrow className="fill-gray stroke-gray-700" />
        </Popover.Content>
      </Popover.Portal>
      <PostDetailDialog post={postClick} open={open} onOpenChange={setOpen} />
    </Popover.Root>
  );
}
