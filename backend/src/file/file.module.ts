import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoryEntity } from 'src/entities/directory.entity';
import { FileEntity } from 'src/entities/file.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './storage', // Directory where files are saved
      }),
      limits: {
        fileSize: 1 * 1024 * 1024 * 1024, // 1GB limit
      },
    }),
    TypeOrmModule.forFeature([FileEntity, DirectoryEntity, UserEntity]),
    LoggerModule,
    HttpModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
