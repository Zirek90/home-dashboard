import { MemoryUsage } from "@src/interfaces";
import { formatBytes } from "./format-bytes";

export function formatUsage(usage: MemoryUsage) {
  return `${((usage.used / usage.total) * 100).toFixed(1)}% (${formatBytes(usage.used)} / ${formatBytes(usage.total)})`;
}
