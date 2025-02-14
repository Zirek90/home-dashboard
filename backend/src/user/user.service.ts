import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import FormData from 'form-data';
import { ConfigService } from '@nestjs/config';
import { handleAxiosError } from 'src/utils';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private authUrl = this.configService.get<string>('AUTH_SERVICE_URL');

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findById(id: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.authUrl}/users/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to find user', error);
      handleAxiosError(error);
    }
  }

  async getUserProfile(accessToken: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.authUrl}/users/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to find user profile', error);
      handleAxiosError(error);
    }
  }

  async uploadAvatar(
    accessToken: string,
    file: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const fileStream = fs.createReadStream(file.path); // Read the file from disk

    const formData = new FormData();
    formData.append('file', fileStream, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.authUrl}/users/upload-avatar`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ...formData.getHeaders(),
          },
        }),
      );
      return response.data.avatarPath;
    } catch (error) {
      console.error('Failed to upload avatar', error);
      handleAxiosError(error);
    }
  }

  async removeAvatar(accessToken: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpService.delete(`${this.authUrl}/users/remove-avatar`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to upload avatar', error);
      handleAxiosError(error);
    }
  }
}
