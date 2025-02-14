import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PrivateDirectoryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const directory = request.params.directory;

    // Check if directory matches the user's private directory
    const userPrivateDir = `${user.username}-${user.id}`;
    return directory === userPrivateDir;
  }
}
