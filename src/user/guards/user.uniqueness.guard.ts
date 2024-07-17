import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../user.service';

export default class UserUniquenessGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;
    if (!email || typeof email !== 'string') {
      return false;
    }
    const existingUser = this.userService.findOne(email);
    return existingUser ? false : true;
  }
}
