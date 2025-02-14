import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const authUrl = this.configService.get<string>('AUTH_SERVICE_URL');

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${authUrl}/auth/validate-token`, {
          token,
        }),
      );

      request.user = response.data;

      return true;
    } catch (error) {
      console.error('Invalid or expired token', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
