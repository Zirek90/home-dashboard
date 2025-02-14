import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsBoolean()
  admin?: boolean;

  constructor(
    username: string,
    email: string,
    password: string,
    admin?: boolean,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}
