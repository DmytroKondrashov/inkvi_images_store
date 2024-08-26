import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderrDTO } from './dto/create.folder.dto';
import { Token } from 'src/common/decorators/token.decorator';
import { UpdateFolderDTO } from './dto/update.folder.dto';
import ManipulateOwnFolderGuard from './guards/manipulate.own.folder.guard';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post('/create')
  async createFolder(@Body() body: CreateFolderrDTO, @Token() token: string) {
    return this.folderService.createFolder(body, token);
  }

  @Post('/edit')
  @UseGuards(ManipulateOwnFolderGuard)
  async editFolder(@Body() body: UpdateFolderDTO) {
    return this.folderService.editFolder(body);
  }

  @Post('/delete')
  @UseGuards(ManipulateOwnFolderGuard)
  async deleteFolder(@Body() id: number) {
    return this.folderService.deleteFolder(id);
  }

  @Get('/folders')
  @UseGuards(ManipulateOwnFolderGuard)
  async getFolders(@Request() req, @Token() token: string) {
    const finalToken = token ? token : req.cookies['token'];
    return this.folderService.getFolders(finalToken);
  }
}
