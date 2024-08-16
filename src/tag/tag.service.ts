import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDTO } from './dto/create.tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly commonService: CommonService,
  ) {}

  async createFolder(body: CreateTagDTO) {
    try {
      const { name } = body;
      const tag = this.tagRepository.create({ name });
      const response = await this.tagRepository.save(tag);
      return response;
    } catch (error) {
      throw new BadRequestException('Could not create the Tag!');
    }
  }
}
