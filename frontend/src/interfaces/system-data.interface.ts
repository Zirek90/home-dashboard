export interface SystemDataInterface {
  cpuTemp: number;
  memoryUsage: MemoryUsage;
  diskSpace: MemoryUsage;
  cpuLoad: string;
  systemUptime: string;
}

export interface MemoryUsage {
  total: number;
  free: number;
  used: number;
  percent: string;
}
