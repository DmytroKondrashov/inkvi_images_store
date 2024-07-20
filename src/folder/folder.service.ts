import { Body, Injectable, Post } from '@nestjs/common';
import { Folder } from './entity/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateFolderrDTO } from './dto/create.folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly userRepository: Repository<Folder>,
    private readonly folderService: FolderService,
  ) {}

  @Public()
  @Post()
  async createFolder(@Body() body: CreateFolderrDTO) {
    return this.folderService.createFolder(body);
  }
}
