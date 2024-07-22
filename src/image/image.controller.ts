import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageName = await this.imageService.createImage(file.buffer);
    return `http://localhost:3000/image/${imageName}`;
  }

  @Get(':filename')
  @Public()
  async getImage(@Param('filename') filename: string, @Res() res) {
    const data = await this.imageService.getImageData(filename);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(data);
  }
}
