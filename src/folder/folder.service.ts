import { BadRequestException, Injectable } from '@nestjs/common';
import { Folder } from './entity/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFolderrDTO } from './dto/create.folder.dto';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';
import { UpdateFolderrDTO } from './dto/update.folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  async createFolder(body: CreateFolderrDTO, token: string) {
    const { name } = body;
    const userId = await this.commonService.getUserIdFromToken(token);
    const user = await this.userService.getUser(userId);
    const folder = this.folderRepository.create({ user, name });
    return this.folderRepository.save(folder);
  }

  async editFolder(body: UpdateFolderrDTO) {
    try {
      const { id, name } = body;
      await this.folderRepository.update(id, { name });
      return this.folderRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Could not edit folder');
    }
  }
}
