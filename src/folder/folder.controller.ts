import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderrDTO } from './dto/create.folder.dto';
import { Token } from 'src/common/decorators/token.decorator';
import { UpdateFolderDTO } from './dto/update.folder.dto';
import ManipulateOwnFolderGuard from './guards/manipulate.own.folder.guard';
import { Public } from 'src/common/decorators/public.decorator';

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

  @Public()
  @Get('/edit')
  async editFolderLayout(
    @Response() res,
    @Query('id') id: string,
    @Query('name') name: string,
  ) {
    res.render('edit_folder', { folder: { id: parseInt(id), name } });
  }

  @Post('/delete')
  @UseGuards(ManipulateOwnFolderGuard)
  async deleteFolder(@Body() id: number) {
    return this.folderService.deleteFolder(id);
  }

  @Get('/folders')
  @Public()
  async getFolders(@Request() req, @Token() token: string, @Response() res) {
    const finalToken = token ? token : req.cookies['token']['token'];
    const folders = await this.folderService.getFolders(finalToken);
    res.render('folders_list', { folders });
  }
}
