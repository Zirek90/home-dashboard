export interface SystemDataInterface {
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
