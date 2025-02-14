import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { RegisterRequestDto } from './dto/register.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { handleAxiosError } from 'src/utils';
import { LoginResponseDto } from './dto/login.response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly authUrl = this.configService.get<string>('AUTH_SERVICE_URL');

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterRequestDto): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.post(`${this.authUrl}/auth/register`, registerDto),
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.authUrl}/auth/login`, loginDto),
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.post(`${this.authUrl}/auth/forgot-password`, {
          email,
        }),
      );
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async renewAccessToken(refreshToken: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.authUrl}/auth/refresh-token`, {
          refresh_token: refreshToken,
        }),
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async resetPassword(
    reset_token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{ message: string }> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.authUrl}/auth/reset-password`, {
          reset_token,
          newPassword,
          confirmPassword,
        }),
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
