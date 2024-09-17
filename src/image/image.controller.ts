import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Response,
  Render,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Token } from 'src/common/decorators/token.decorator';
import { ImageDTO } from './dto/image.dto';
import { UpdateImageDTO } from './dto/update.image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @Body() folderId: { folderId: string },
    @Token() token: string,
  ): Promise<ImageDTO> {
    console.log('uploadFile', file);
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    // if (!folderId) {
    //   throw new BadRequestException('Folder ID is required!');
    // }
    // return this.imageService.createImage(file.buffer, folderId, token);
    return this.imageService.createImage(file.buffer, file.originalname, token);
  }

  @Get('upload')
  async getUploadPage(@Token() token: string, @Response() res) {
    res.render('upload', { token });
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
      tokenValue = res.req.cookies.token;
    }
    const images = await this.imageService.getImagesList(tokenValue);
    res.render('images_list', { images });
  }

  @Post(':id')
  async updateImage(@Param('id') id: number, @Body() body: UpdateImageDTO) {
    return this.imageService.updateImage(id, body);
  }

  @Get('update/:id')
  async getUpdateImagePage(@Param('id') id: number, @Response() res) {
    const image = await this.imageService.getImage(id);
    res.render('update_image', { image });
  }

  @Get(':id')
  @Render('image')
  async getImage(@Param('id') id: number) {
    const data = await this.imageService.getImage(id);
    return { image: data };
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: number) {
    return this.imageService.deleteImage(id);
  }
}
