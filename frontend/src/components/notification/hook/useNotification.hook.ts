import { useEffect, useState } from "react";
import { Notification } from "@src/interfaces";
import { useNotificationContext } from "@src/providers";

interface useNotificationReturn {
  getNotificationColor: () => string;
  fadeOut: boolean;
  notification: Notification;
  clearNotification: () => void;
}

export function useNotification(): useNotificationReturn {
  const { notification, clearNotification } = useNotificationContext();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (notification.isVisible) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          clearNotification();
          setFadeOut(false);
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  const getNotificationColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return { getNotificationColor, fadeOut, notification, clearNotification };
}
