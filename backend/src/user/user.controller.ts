import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessToken } from 'src/decorators/accessToken.decorators';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@AccessToken() accessToken: string) {
    return await this.userService.getUserProfile(accessToken);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @AccessToken() accessToken: string,
  ) {
    const avatarPath = await this.userService.uploadAvatar(accessToken, file);
    return { message: 'Avatar uploaded successfully', avatarPath };
  }

  @Delete('remove-avatar')
  async removeAvatar(@AccessToken() accessToken: string) {
    await this.userService.removeAvatar(accessToken);
    return { message: 'Avatar removed successfully' };
  }
}
