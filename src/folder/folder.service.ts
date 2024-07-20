import { Body, Injectable } from '@nestjs/common';
import { Folder } from './entity/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFolderrDTO } from './dto/create.folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  async createFolder(body: CreateFolderrDTO) {
    const { userId, name } = body;
    const folder = this.folderRepository.create({ userId, name });
    return this.folderRepository.save(folder);
  }
}
