import { IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  user_id: string;

  @IsString()
  username: string;

  @IsString()
  access_token: string;

  @IsString()
  refresh_token: string;

  constructor(
    user_id: string,
    username: string,
    access_token: string,
    refresh_token: string,
  ) {
    this.user_id = user_id;
    this.username = username;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
