import { SystemStatsGateway } from './system-stats.gateway';
import { Module } from '@nestjs/common';
import { SystemStatsService } from './system-stats.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [SystemStatsService, SystemStatsGateway],
  exports: [SystemStatsService],
})
export class SystemStatsModule {}
