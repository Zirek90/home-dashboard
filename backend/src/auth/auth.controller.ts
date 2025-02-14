import { RegisterRequestDto } from './dto/register.request.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
  ): Promise<any> {
    return this.authService.renewAccessToken(refreshToken);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<void> {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('reset_token') reset_token: string,
    @Body('newPassword') newPassword: string,
    @Body('confirmPassword') confirmPassword: string,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(
      reset_token,
      newPassword,
      confirmPassword,
    );
  }
}

// @Post('test-email')
// async testEmail(@Body('email') email: string): Promise<void> {
//   return await this.authService.testemail(email);
// }
