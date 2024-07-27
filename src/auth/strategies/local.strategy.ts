import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private commonService: CommonService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.commonService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
