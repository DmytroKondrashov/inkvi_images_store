import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async createImage(image: Buffer): Promise<Image> {
    const newImage = this.imageRepository.create({ image });
    return this.imageRepository.save(newImage);
  }
}
