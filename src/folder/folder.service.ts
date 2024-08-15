import { BadRequestException, Injectable } from '@nestjs/common';
import { Folder } from './entity/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFolderrDTO } from './dto/create.folder.dto';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';
import { UpdateFolderDTO } from './dto/update.folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  async createFolder(body: CreateFolderrDTO, token: string) {
    try {
      const { name } = body;
      const userId = await this.commonService.getUserIdFromToken(token);
      const user = await this.userService.getUser(userId);
      const folder = this.folderRepository.create({ user, name });
      const response = await this.folderRepository.save(folder);
      delete response.user.password;
      return response;
    } catch (error) {
      throw new BadRequestException('Could not create the Folder!');
    }
  }

  async getFolder(id: number) {
    return this.folderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async editFolder(body: UpdateFolderDTO) {
    try {
      const { id, name } = body;
      const res = await this.folderRepository.update(id, { name });
      if (res.affected === 0) {
        throw new BadRequestException('Could not edit Folder');
      }
      return this.folderRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Could not edit folder');
    }
  }

  async deleteFolder(id: number): Promise<string> {
    try {
      const res = await this.folderRepository.delete(id);
      if (res.affected === 0) {
        throw new BadRequestException('Could not dalate Folder');
      }
      return 'Folder successfully deleted!';
    } catch (error) {
      throw new BadRequestException('Could not delete Folder');
    }
  }

  async getFolders(token: string) {
    const userId = await this.commonService.getUserIdFromToken(token);
    const folders = await this.folderRepository.find({
      where: {
        user: { id: userId },
      },
    });
    const data = folders.map((folder) => {
      return {
        id: folder.id,
        name: folder.name,
        userId: folder.user.id,
      };
    });
    return data;
  }
}
