import { intervalToDuration, formatDuration, parseISO } from "date-fns";

export function formatUptime(uptime: string) {
  const startTime = parseISO(uptime); // Convert string to Date
  const now = new Date();
  const duration = intervalToDuration({ start: startTime, end: now });

  return formatDuration(duration, { format: ["hours", "minutes", "seconds"] });
}
