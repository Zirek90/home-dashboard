import { Injectable } from '@nestjs/common';
import { promises as fsPromises, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class LoggerService {
  private logDirectory: string;

  constructor() {
    this.logDirectory = join(process.cwd(), 'logs');
    this.ensureLogDirectoryExists();
  }

  private async ensureLogDirectoryExists() {
    if (!existsSync(this.logDirectory)) {
      await fsPromises.mkdir(this.logDirectory, { recursive: true });
    }
  }

  private getLogFilePath(): string {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return join(this.logDirectory, `${today}.log`);
  }

  async log(message: string): Promise<void> {
    const logFilePath = this.getLogFilePath();
    const timestamp = new Date().toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
    const logMessage = `[${timestamp}] ${message}\n`;

    if (!existsSync(logFilePath)) {
      await fsPromises.writeFile(logFilePath, logMessage);
    } else {
      await fsPromises.appendFile(logFilePath, logMessage);
    }
  }
}
