import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import * as os from 'os';

@Injectable()
export class SystemStatsService {
  getSystemStats() {
    return {
      memoryUsage: this.getMemoryUsage(),
      diskSpace: this.getDiskSpace(),
      cpuLoad: this.getCpuLoad(),
      systemUptime: this.getSystemUptime(),
    };
  }

  private getSystemUptime() {
    const bootTime = Date.now() - os.uptime() * 1000;
    return new Date(bootTime).toISOString();
  }

  private getMemoryUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    return {
      total: Number((totalMem / 1024 / 1024).toFixed(2)),
      free: Number((freeMem / 1024 / 1024).toFixed(2)),
      used: Number(((totalMem - freeMem) / 1024 / 1024).toFixed(2)),
      percent: ((usedMem / totalMem) * 100).toFixed(2) + '%',
    };
  }

  private getDiskSpace() {
    try {
      const isLocal = os.platform() === 'darwin';
      const command = isLocal ? 'df -m /' : 'df -BM /'; // local uses `-m`, raspberry uses `-BM`

      const output = execSync(command).toString().split('\n')[1];
      const [, size, used, available, percent] = output.split(/\s+/);

      //   Memory served as number MB
      return {
        total: parseInt(size, 10),
        used: parseInt(used, 10),
        free: parseInt(available, 10),
        percent: percent.replace('%', ''),
      };
    } catch (error) {
      console.error('Failed to get disk space', error);
      return null;
    }
  }

  private getCpuLoad() {
    const oneMinuteLoad = os.loadavg()[0]; // 1-minute load average
    const numCores = os.cpus().length; // Get number of CPU cores
    return parseFloat(((oneMinuteLoad / numCores) * 100).toFixed(2)) + '%';
  }
}
