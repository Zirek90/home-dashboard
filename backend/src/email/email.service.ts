import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  }

  async sendResetEmail(to: string, resetToken: string) {
    const resetLink = `${this.configService.get<string>('URL')}/reset-password?token=${resetToken}`;

    await this.transporter.sendMail({
      from: `HomeCloud - <${this.configService.get<string>('GMAIL_USER')}>`,
      to,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      `,
    });

    await this.loggerService.log(`Reset token was sent to email: ${to}`);
  }

  async sendPasswordResetEmail(to: string) {
    await this.transporter.sendMail({
      from: `HomeCloud - <${this.configService.get<string>('GMAIL_USER')}>`,
      to,
      subject: 'Password Reset Notification',
      html: `
        <p>You have changed your password on HomeCloud.</p>
        <p>If it wasn't you, please contact administrator.</p>
      `,
    });

    await this.loggerService.log(`Password was changed for ${to}`);
  }

  async sendRegisterEmail(to: string, username: string) {
    await this.transporter.sendMail({
      from: `HomeCloud - <${this.configService.get<string>('GMAIL_USER')}>`,
      to,
      subject: 'Register account',
      html: `
        <p>Hello ${username}! You have successfully created account.</p>
      `,
    });

    await this.loggerService.log(`${username} has created an account.`);
  }
}
