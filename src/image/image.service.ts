import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { v4 as uuidv4 } from 'uuid';
import { FolderService } from 'src/folder/folder.service';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly folderService: FolderService,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  async createImage(
    image: Buffer,
    folderId: number,
    token: string,
  ): Promise<string> {
    const filename = uuidv4();
    const userId = await this.commonService.getUserIdFromToken(token);
    const user = await this.userService.getUser(userId);
    const folder = await this.folderService.getFolder(folderId);
    const newImage = this.imageRepository.create({
      filename,
      image,
      user,
      folder,
    });
    this.imageRepository.save(newImage);
    return filename;
  }

  async getImage(filename: string) {
    const image = await this.imageRepository.findOne({ where: { filename } });
    if (!image) {
      throw new BadRequestException('Image not found!');
    }
    return image.image;
  }

  async deleteImage(filename: string): Promise<string> {
    const result = await this.imageRepository.delete({ filename });
    if (result.affected === 0) {
      throw new BadRequestException('Image not found!');
    }
    return 'Your image was successfully deleted!';
  }
}
