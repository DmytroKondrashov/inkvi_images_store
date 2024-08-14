import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { v4 as uuidv4 } from 'uuid';
import { FolderService } from 'src/folder/folder.service';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';
import { ImageDTO } from './dto/image.dto';

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
    folderId: { folderId: string },
    token: string,
  ): Promise<ImageDTO> {
    const filename = uuidv4();
    const userId = await this.commonService.getUserIdFromToken(token);
    const user = await this.userService.getUser(userId);
    const folder = await this.folderService.getFolder(
      parseInt(folderId.folderId, 10),
    );
    if (!user || !folder) {
      throw new BadRequestException('Could not upload the image!');
    }
    const newImage = this.imageRepository.create({
      filename,
      image,
    });
    newImage.user = user;
    newImage.folder = folder;
    this.imageRepository.save(newImage);
    return {
      id: newImage.id,
      fileName: filename as string,
      userId: parseInt(userId, 10),
      folderId: parseInt(folderId.folderId, 10),
      url: `${process.env.APP_HOST}/image/${filename}`,
    };
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

  async getAllImagesInFolder(token: string, folderId: number) {
    const userId = await this.commonService.getUserIdFromToken(token);
    const images = await this.imageRepository.find({
      where: {
        user: { id: userId },
        folder: { id: folderId },
      },
    });
    console.log(images);
    const data = images.map((image) => {
      return {
        id: image.id,
        filename: image.filename,
        user: userId,
        folder: folderId,
        url: `${process.env.APP_HOST}/image/${image.filename}`,
      };
    });
    return data;
  }
}
