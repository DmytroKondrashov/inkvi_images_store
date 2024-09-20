import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Render,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDTO } from './dto/create.tag.dto';
import { UpdateTagDTO } from './dto/update.tag.dto';
import { Public } from 'src/common/decorators/public.decorator';
import TagUniquenessGuard from './guards/tag.uniqueness.guard';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/create')
  async createFolder(@Body() body: CreateTagDTO) {
    return this.tagService.createTag(body);
  }

  @Post('/edit')
  @UseGuards(TagUniquenessGuard)
  async editFolder(@Body() body: UpdateTagDTO) {
    return this.tagService.editTag(body);
  }

  @Delete('/delete')
  async deleteFolder(@Body() id: number) {
    return this.tagService.deleteTag(id);
  }

  @Get('/tags')
  @Public()
  async getTags() {
    return this.tagService.getTags();
  }

  @Get('/tags_list')
  @Public()
  @Render('tags_list')
  async getTagsList() {
    const data = await this.tagService.getTags();
    return { tags: data };
  }
}
