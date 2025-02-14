import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Notification } from "@src/interfaces";

interface NotificationContextState {
  notification: Notification;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  clearNotification: () => void;
}

const defaultState: Notification = { message: "", type: "success", isVisible: false };

const NotificationContext = createContext<NotificationContextState | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification>(defaultState);

  const showSuccess = useCallback((message: string) => {
    setNotification({ message, type: "success", isVisible: true });
  }, []);

  const showError = useCallback((message: string) => {
    setNotification({ message, type: "error", isVisible: true });
  }, []);

  const showWarning = useCallback((message: string) => {
    setNotification({ message, type: "warning", isVisible: true });
  }, []);

  const showInfo = useCallback((message: string) => {
    setNotification({ message, type: "warning", isVisible: true });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(defaultState);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const state = useContext(NotificationContext);
  if (state === null) {
    throw new Error("State is still null");
  } else if (state === undefined) {
    throw new Error("Attempt to access from outside of context");
  }
  return state;
};
