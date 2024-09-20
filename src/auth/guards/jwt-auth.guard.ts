import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';
import { CommonService } from 'src/common/common.service';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
    private commonService: CommonService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const token = context.switchToHttp().getRequest().cookies.token;
    if (token) {
      try {
        const userId = await this.commonService.getUserIdFromToken(token);

        const user = await this.userService.getUser(userId);
        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      const response = context.switchToHttp().getResponse();
      response.redirect('/auth/login');
      return false;
      // const result = super.canActivate(context);
      // if (result instanceof Observable) {
      //   return result.toPromise();
      // }
      // return result;
    }
  }
}
