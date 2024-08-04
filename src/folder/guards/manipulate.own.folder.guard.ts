import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FolderService } from '../folder.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export default class ManipulateOwnFolderGuard implements CanActivate {
  constructor(
    private readonly folredService: FolderService,
    private readonly commonService: CommonService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const token = request.headers.authorization.split(' ')[1];
    const userId = await this.commonService.getUserIdFromToken(token);
    const { id } = request.body;
    const folder = await this.folredService.getFolder(id);
    return userId === folder.user.id;
  }
}
