import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async createImage(image: Buffer): Promise<string> {
    const filename = uuidv4();
    const newImage = this.imageRepository.create({ filename, image });
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
