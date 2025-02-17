import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SystemStatsService } from './system-stats.service';
import { LoggerService } from 'src/logger/logger.service';

@WebSocketGateway({ cors: true })
export class SystemStatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;
  interval: NodeJS.Timeout;

  constructor(
    private readonly systemStatsService: SystemStatsService,
    private readonly loggerService: LoggerService,
  ) {
    this.io = new Server();
    this.interval = setInterval(() => {}, 5000);
  }

  afterInit() {
    this.loggerService.log('WebSocket Server Initialized');
    this.startEmittingStats();
  }

  handleConnection(client: any) {
    this.loggerService.log(`Client connected: ${client.id}`);
    client.emit('system-stats', this.systemStatsService.getSystemStats());
  }

  handleDisconnect(client: any) {
    this.loggerService.log(`Client disconnected: ${client.id}`);
  }

  private startEmittingStats() {
    this.interval = setInterval(() => {
      const stats = this.systemStatsService.getSystemStats();
      this.io.emit('system-stats', stats);
    }, 5000);
  }
}
