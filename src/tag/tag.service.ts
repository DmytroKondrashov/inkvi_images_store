import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDTO } from './dto/create.tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { UpdateTagDTO } from './dto/update.tag.dto';
import { Image } from 'src/image/entity/image.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly commonService: CommonService,
  ) {}

  async createTag(body: CreateTagDTO) {
    try {
      const { name } = body;
      const tag = this.tagRepository.create({ name });
      const response = await this.tagRepository.save(tag);
      return response;
    } catch (error) {
      throw new BadRequestException('Could not create the Tag!');
    }
  }

  async getTag(id: number) {
    return this.tagRepository.findOne({
      where: { id },
    });
  }

  async editTag(body: UpdateTagDTO) {
    const errorText = 'Could not edit Tag';
    try {
      const { id, imageId, name } = body;
      const res = await this.tagRepository.update(id, { name });
      if (imageId) {
        const tag = await this.tagRepository.findOne({ where: { id } });
        const image = await this.imageRepository.findOne({
          where: { id: imageId },
        });
        (await image).tags.push(tag);
        (await tag).images.push(image);
        await this.tagRepository.save(tag);
        await this.imageRepository.save(image);
      }
      if (res.affected === 0) {
        throw new BadRequestException(errorText);
      }
      return this.tagRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(errorText);
    }
  }

  async deleteTag(id: number): Promise<string> {
    const errorText = 'Could not dalete Folder';
    try {
      const res = await this.tagRepository.delete(id);
      if (res.affected === 0) {
        throw new BadRequestException(errorText);
      }
      return 'Folder successfully deleted!';
    } catch (error) {
      throw new BadRequestException(errorText);
    }
  }

  async getTags() {
    return this.tagRepository.find({});
  }
}
