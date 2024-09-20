import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { FolderService } from 'src/folder/folder.service';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';
import { Folder } from 'src/folder/entity/folder.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/entity/tag.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Folder, User, Tag])],
  controllers: [ImageController],
  providers: [
    ImageService,
    FolderService,
    CommonService,
    UserService,
    JwtService,
    TagService,
    Repository,
  ],
})
export class ImageModule {}
