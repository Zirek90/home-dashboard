import { NotificationType } from "@src/types";

export interface Notification {
  message: string;
  type: NotificationType;
  isVisible: boolean;
}
