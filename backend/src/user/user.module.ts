import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoggerModule } from 'src/logger/logger.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './storage',
        filename: (req, file, callback) => {
          const originalName = file.originalname;
          callback(null, originalName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    LoggerModule,
    HttpModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
