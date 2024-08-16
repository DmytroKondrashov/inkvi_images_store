import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDTO } from './dto/create.tag.dto';
import { UpdateTagDTO } from './dto/update.tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/create')
  async createFolder(@Body() body: CreateTagDTO) {
    return this.tagService.createTag(body);
  }

  @Post('/edit')
  async editFolder(@Body() body: UpdateTagDTO) {
    return this.tagService.editTag(body);
  }

  @Post('/delete')
  async deleteFolder(@Body() id: number) {
    return this.tagService.deleteTag(id);
  }

  @Get('/tags')
  async getFolders() {
    return this.tagService.getTags();
  }
}
