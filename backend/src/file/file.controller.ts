import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { FileResponseDto } from './dto/file-response.dto';
import { UserIdAndUsername } from 'src/decorators/userIdAndUsername.decorators';
import { UserId } from 'src/decorators/userId.decorators';
import { AdminGuard } from 'src/guard/admin.guard';
import { LoggerService } from 'src/logger/logger.service';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('admin')
  @UseGuards(AdminGuard)
  async getAllFiles(): Promise<Partial<FileResponseDto>[]> {
    return this.fileService.getAllFiles();
  }

  @Post('private/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToPrivateDirectory(
    @UploadedFile() file: Express.Multer.File,
    @UserIdAndUsername()
    { userId, username }: { userId: string; username: string },
  ) {
    const { name, id } = await this.fileService.saveFileToPrivateDirectory(
      file,
      userId,
      username,
    );
    await this.loggerService.log(
      `user: ${userId} - upload private file - filename: ${file.filename}`,
    );

    return { message: 'File uploaded successfully', name, id };
  }

  @Post('public/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @UserId()
    userId: string,
  ) {
    const { name, id } = await this.fileService.saveFile(file, userId);
    await this.loggerService.log(
      `user: ${userId} - upload public file - filename: ${file.filename}`,
    );

    return {
      message: 'File uploaded successfully',
      name,
      id,
    };
  }

  @Delete('private/:fileId')
  async deletePrivateFile(
    @Param('fileId') fileId: string,
    @UserId() userId: string,
  ) {
    await this.fileService.deleteFileFromPrivateDirectory(fileId, userId);
    await this.loggerService.log(
      `user: ${userId} - delete private file - ${fileId}`,
    );

    return { message: `File '${fileId}' deleted successfully.` };
  }

  @Delete('public/:fileId')
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Param('fileId') fileId: string, @UserId() userId: string) {
    await this.fileService.deleteFile(fileId);
    await this.loggerService.log(
      `user: ${userId} - delete public file - ${fileId}`,
    );

    return { message: `File deleted successfully.` };
  }

  @Get('private')
  async getAllPrivateFiles(
    @UserId() userId: string,
  ): Promise<Partial<FileResponseDto>[]> {
    return this.fileService.getAllPrivateFiles(userId);
  }

  @Get('public')
  async getAllPublicFiles(): Promise<Partial<FileResponseDto>[]> {
    return this.fileService.getAllPublicFiles();
  }

  @Get('download/:fileId')
  @HttpCode(HttpStatus.OK)
  async downloadFile(
    @Param('fileId') fileId: string,
    @Res() res: Response,
    @UserId() userId: string,
  ) {
    const response = await this.fileService.downloadFile(fileId, res, userId);
    await this.loggerService.log(
      `user: ${userId} - downloaded file - ${fileId}`,
    );
    return response;
  }
}
