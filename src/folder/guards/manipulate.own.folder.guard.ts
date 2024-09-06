import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { FolderService } from '../folder.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export default class ManipulateOwnFolderGuard implements CanActivate {
  constructor(
    private readonly folredService: FolderService,
    private readonly commonService: CommonService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      let token = request.cookies?.token;
      if (!token && request.headers.authorization) {
        token = request.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return false;
      }

      const userId = await this.commonService.getUserIdFromToken(token);
      const { id } = request.body;
      const folder = await this.folredService.getFolder(id);
      return userId === folder.user.id;
    } catch (error) {
      throw new BadRequestException('You can not manipulate this folder');
    }
  }
}
