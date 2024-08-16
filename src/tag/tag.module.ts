import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { Image } from 'src/image/entity/image.entity';
import { CommonService } from 'src/common/common.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Image])],
  controllers: [TagController],
  providers: [TagService, CommonService, JwtService],
})
export class TagModule {}
