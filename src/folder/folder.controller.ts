import { Body, Controller, Post } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderrDTO } from './dto/create.folder.dto';
import { Token } from 'src/common/decorators/token.decorator';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post('/create')
  async createFolder(@Body() body: CreateFolderrDTO, @Token() token: string) {
    return this.folderService.createFolder(body, token);
  }
}
