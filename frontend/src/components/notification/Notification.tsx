import { useNotification } from "./hook/useNotification.hook";

const icons = {
  success: "✔️",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

export function Notification() {
  const { notification, getNotificationColor, fadeOut, clearNotification } = useNotification();

  if (!notification.isVisible) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      } ${getNotificationColor()}`}
    >
      <span className="text-xl">{icons[notification.type]}</span>
      <span className="flex-grow mx-4">{notification.message}</span>
      <button onClick={clearNotification} className="ml-3 bg-transparent text-white text-xl font-bold">
        ✖️
      </button>
    </div>
  );
}

export default Notification;
