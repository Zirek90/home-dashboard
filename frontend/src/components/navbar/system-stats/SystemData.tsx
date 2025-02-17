import { FiCpu, FiThermometer, FiDatabase, FiHardDrive, FiClock } from "react-icons/fi";
import { useWebsocket } from "@src/hooks";
import { SystemDataInterface } from "@src/interfaces";
import { formatUptime, formatUsage } from "@src/utils";
import { Stat } from "./stat/Stat";

export function SystemStats() {
  const { data } = useWebsocket<SystemDataInterface>("http://localhost:3000", "system-stats");

  if (!data) {
    return null;
  }

  return (
    <div className="flex gap-6 text-gray-700 dark:text-gray-300 text-sm">
      <Stat label="CPU Load" icon={<FiCpu className="text-red-500" size={16} />} value={`${data.cpuLoad}%`} />
      <Stat label="CPU Temp" icon={<FiThermometer className="text-blue-500" size={16} />} value={`${data.cpuTemp}°C`} />
      <Stat
        label="Memory Usage"
        icon={<FiDatabase className="text-green-500" size={16} />}
        value={formatUsage(data.memoryUsage)}
      />
      <Stat
        label="Disk Usage"
        icon={<FiHardDrive className="text-yellow-500" size={16} />}
        value={formatUsage(data.diskSpace)}
      />
      <Stat
        label="Uptime"
        icon={<FiClock className="text-purple-500" size={16} />}
        value={formatUptime(data.systemUptime)}
      />
    </div>
  );
}
