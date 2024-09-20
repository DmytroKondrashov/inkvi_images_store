import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { TagService } from '../tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class TagUniquenessGuard implements CanActivate {
  constructor(
    private readonly tagService: TagService,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const name = request.body?.name;

      const existingTag = await this.tagRepository.findOne({ where: { name } });
      return !existingTag;
    } catch (error) {
      throw new BadRequestException('Failed to update the Tag');
    }
  }
}
