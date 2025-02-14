import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { extname, join } from 'path';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { Repository } from 'typeorm';
import { FileResponseDto } from './dto/file-response.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class FileService {
  private storagePath = join(process.cwd(), 'storage');

  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.storageDirectoryExists();
  }

  // Ensure "storage" directory exists
  private async storageDirectoryExists() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (err) {
      console.error('Failed to create storage directory:', err);
      throw new InternalServerErrorException('Storage initialization failed');
    }
  }

  private async directoryExists(directory: string): Promise<void> {
    await fs.mkdir(directory, { recursive: true });
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private getPrivateDirectoryPath(username: string, userId: string): string {
    return join(this.storagePath, 'private', `${username}-${userId}`);
  }

  private async getUniqueFilename(
    directory: string,
    originalName: string,
  ): Promise<{ filename: string; targetFilePath: string }> {
    let filename = originalName;
    const ext = extname(filename);
    const basename = filename.slice(0, -ext.length);
    let targetFilePath = join(directory, filename);

    let counter = 1;
    while (await this.fileExists(targetFilePath)) {
      filename = `${basename}-copy-${counter}${ext}`;
      targetFilePath = join(directory, filename);
      counter++;
    }

    return { filename, targetFilePath };
  }

  private async saveFileMetadata(
    user: UserEntity,
    filename: string,
    targetFilePath: string,
    size: number,
  ): Promise<{ name: string; id: string }> {
    const newFile = this.fileRepository.create({
      name: filename,
      path: targetFilePath,
      size,
      uploadedBy: user,
    });

    const { name, id } = await this.fileRepository.save(newFile);
    return { name, id };
  }

  private getFilePath(file: FileEntity): string {
    const filePath = file.path;
    if (!existsSync(filePath)) {
      throw new InternalServerErrorException('File not found');
    }
    return filePath;
  }

  private async getFileMetadata(fileId: string) {
    const file = await this.fileRepository.findOne({
      where: { id: fileId },
      relations: ['uploadedBy'],
    });

    if (!file) {
      throw new InternalServerErrorException('File not found');
    }

    return file;
  }

  private async deleteFileFromStorage(file: FileEntity): Promise<void> {
    const filePath = this.getFilePath(file);
    try {
      await fs.unlink(filePath); // Delete the file from storage
    } catch (err) {
      console.error('Failed to delete file from storage:', err);
      throw new InternalServerErrorException('File deletion failed');
    }
  }

  private async removeFileMetadata(file: FileEntity): Promise<void> {
    try {
      await this.fileRepository.remove(file); // Remove file metadata from the database
    } catch (err) {
      console.error('Failed to delete file metadata from database:', err);
      throw new InternalServerErrorException('File metadata deletion failed');
    }
  }

  private formatFileResponse(files: FileEntity[]): Partial<FileResponseDto>[] {
    return files.map((file) => ({
      ...file,
      uploadedBy: file.uploadedBy
        ? {
            id: file.uploadedBy.id,
            username: file.uploadedBy.username,
            avatar: file.uploadedBy.avatar,
          }
        : null,
    }));
  }

  private resolvePath(relativePath: string): string {
    return join(process.cwd(), relativePath);
  }

  async saveFileToPrivateDirectory(
    file: Express.Multer.File,
    userId: string,
    username: string,
  ): Promise<{ name: string; id: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const directory = this.getPrivateDirectoryPath(username, userId);
    await this.directoryExists(directory);

    const { filename, targetFilePath } = await this.getUniqueFilename(
      directory,
      file.originalname,
    );
    await fs.rename(file.path, targetFilePath);

    return await this.saveFileMetadata(
      user,
      filename,
      targetFilePath,
      file.size,
    );
  }

  async saveFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ name: string; id: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const directory = this.storagePath;
    await this.directoryExists(directory);

    const { filename, targetFilePath } = await this.getUniqueFilename(
      directory,
      file.originalname,
    );
    await fs.rename(file.path, targetFilePath);

    return await this.saveFileMetadata(
      user,
      filename,
      targetFilePath.replace(`${process.cwd()}/storage/`, 'storage/'),
      file.size,
    );
  }

  async findOneFile(fileId: string): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({
      where: { id: fileId },
      relations: ['uploadedBy'],
    });

    if (!file) {
      throw new InternalServerErrorException('File not found');
    }

    return file;
  }

  async deleteFileFromPrivateDirectory(
    fileId: string,
    userId: string,
  ): Promise<void> {
    const file = await this.getFileMetadata(fileId);

    // Verify that the file belongs to the user
    if (file.uploadedBy.id !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this file',
      );
    }

    await this.deleteFileFromStorage(file);
    await this.removeFileMetadata(file);
  }

  async deleteFile(fileId: string): Promise<void> {
    const file = await this.getFileMetadata(fileId);

    if (file.path.includes('private')) {
      throw new UnauthorizedException(
        'Cannot delete files from private directories',
      );
    }

    await this.deleteFileFromStorage(file);
    await this.removeFileMetadata(file);
  }

  async getAllPrivateFiles(
    userId: string,
  ): Promise<Partial<FileResponseDto>[]> {
    const files = await this.fileRepository.find({ relations: ['uploadedBy'] });

    const privateFiles = files.filter((file) => {
      return (
        file.path.startsWith(
          `private/${file.uploadedBy.username}-${userId}/`,
        ) && file.uploadedBy.id === userId
      );
    });

    return privateFiles.map((file) => ({
      ...file,
      path: file.path,
      uploadedBy: file.uploadedBy
        ? {
            id: file.uploadedBy.id,
            username: file.uploadedBy.username,
            avatar: file.uploadedBy.avatar,
          }
        : null,
    }));
  }

  async getAllPublicFiles(): Promise<Partial<FileResponseDto>[]> {
    const files = await this.fileRepository.find({
      relations: ['uploadedBy'],
    });

    // Filter out files that are stored inside 'storage/private/' directory
    const publicFiles = files.filter((file) => {
      return !file.path.startsWith('private/');
    });

    return this.formatFileResponse(publicFiles);
  }

  async downloadFile(fileId: string, res: Response, userId: string) {
    try {
      const file = await this.findOneFile(fileId);
      if (!file) {
        throw new InternalServerErrorException('File not found');
      }

      const isPrivate = file.path.includes('storage/private/');

      if (isPrivate && file.uploadedBy.id !== userId) {
        throw new UnauthorizedException(
          'You do not have permission to download this file',
        );
      }

      const filePath = this.getFilePath(file);

      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${file.name}"`,
      );
      res.setHeader('Content-Length', file.size);

      return res.sendFile(this.resolvePath(filePath));
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('File download failed');
    }
  }

  async getAllFiles(): Promise<Partial<FileResponseDto>[]> {
    // Fetch all files (public and private)
    const files = await this.fileRepository.find({
      relations: ['uploadedBy'],
    });

    return files.map((file) => ({
      ...file,
      path: file.path,
      uploadedBy: file.uploadedBy
        ? {
            id: file.uploadedBy.id,
            username: file.uploadedBy.username,
            avatar: file.uploadedBy.avatar,
          }
        : null,
    }));
  }
}
