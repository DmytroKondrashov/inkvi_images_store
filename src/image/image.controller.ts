import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { ImageDTO } from './dto/image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @Body() folderId: { folderId: string },
    @Token() token: string,
  ): Promise<ImageDTO> {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    // if (!folderId) {
    //   throw new BadRequestException('Folder ID is required!');
    // }
    // return this.imageService.createImage(file.buffer, folderId, token);
    return this.imageService.createImage(file.buffer, token);
  }

  @Get('/images')
  async getAllImagesInFolder(
    @Token() token: string,
    @Body() body,
  ): Promise<ImageDTO[]> {
    const folderId = body.folderId;
    return this.imageService.getAllImagesInFolder(
      token,
      parseInt(folderId, 10),
    );
  }

  @Get('/images_list')
  async getImagesList(@Token() token: string, @Response() res) {
    let tokenValue = token;
    if (!tokenValue && res.req.cookies && res.req.cookies.token) {
      tokenValue = res.req.cookies.token.token;
    }
    const images = await this.imageService.getImagesList(tokenValue);
    res.render('images_list', { images });
  }

  @Get(':filename')
  @Public()
  async getImage(@Param('filename') filename: string, @Res() res) {
    const data = await this.imageService.getImage(filename);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(data);
  }

  @Delete(':filename')
  async deleteImage(@Param('filename') filename: string) {
    return this.imageService.deleteImage(filename);
  }
}
